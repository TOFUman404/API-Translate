import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { IHistoryUsername } from "../history/interface/history.interface";

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

  async getUserID(username: IHistoryUsername) {
    return await this.prisma.users
      .findUnique({
        where: {
          username: username.toString(),
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
