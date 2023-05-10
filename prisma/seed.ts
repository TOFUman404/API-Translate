import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();
async function main() {
  const saltOrRounds = 10;
  const password = '123456';
  const hash = await bcrypt.hash(password, saltOrRounds);
  const user = await prisma.users.upsert({
    where: { username: 'tester' },
    create: {
      username: 'tester',
      password: hash,
      name: 'tester',
    },
    update: {
      password: hash,
      updatedAt: new Date(),
    },
  });
  console.log({ user });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
