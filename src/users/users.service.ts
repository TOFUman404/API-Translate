import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(username: string) {
    return await this.prisma.users.findUnique({
      where: {
        username: username,
      },
    });
  }

  async getUserID(username: string) {
    return await this.prisma.users
      .findUnique({
        where: {
          username: username,
        },
        select: {
          id: true,
        },
      })
      .then((user) => {
        return user.id;
      });
  }
}
