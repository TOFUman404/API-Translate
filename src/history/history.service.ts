import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class HistoryService {
  constructor(private prisma: PrismaService) {}

  async createHistory(data: any) {
    return await this.prisma.translateHistorys.create({
      data: {
        userID: 1,
        text: data.text,
        current: data.currentLanguage,
        target: data.targetLanguage,
      },
    });
  }
}
