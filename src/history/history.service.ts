import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UsersService } from '../users/users.service';
import * as dayjs from 'dayjs';
import { HistoryUsernameDto } from './dto/history.dto';

@Injectable()
export class HistoryService {
  constructor(
    private prisma: PrismaService,
    private userService: UsersService,
  ) {}

  async createHistory(user: HistoryUsernameDto, data: any) {
    const userID = await this.userService.getUserID(user);
    return await this.prisma.translateHistorys.create({
      data: {
        userID: userID,
        text: data.text,
        current: data.current,
        target: data.target,
      },
    });
  }

  async getHistory(username: HistoryUsernameDto) {
    const userID = await this.userService.getUserID(username);
    return await this.prisma.translateHistorys
      .findMany({
        select: {
          id: true,
          text: true,
          current: true,
          target: true,
          isFavorite: true,
          createdAt: true,
        },
        where: {
          userID: userID,
        },
        orderBy: {
          createdAt: 'desc',
        },
      })
      .then((history) => {
        return history.map((item) => {
          return {
            ...item,
            createdAt: dayjs(item.createdAt).format('DD-MM-YYYY HH:mm'),
          };
        });
      });
  }

  async deleteHistoryById(id: number) {
    return await this.prisma.translateHistorys.delete({
      where: {
        id: +id,
      },
    });
  }

  async deleteHistoryByUser(username: HistoryUsernameDto) {
    const userID = await this.userService.getUserID(username);
    return await this.prisma.translateHistorys.deleteMany({
      where: {
        userID: userID,
      },
    });
  }

  async updateFavorite(id: number) {
    const favorite = await this.prisma.translateHistorys
      .findUnique({
        where: {
          id: +id,
        },
        select: {
          isFavorite: true,
        },
      })
      .then((favorite) => {
        return favorite.isFavorite;
      });

    return await this.prisma.translateHistorys.update({
      where: {
        id: +id,
      },
      data: {
        isFavorite: !favorite,
      },
    });
  }
}
