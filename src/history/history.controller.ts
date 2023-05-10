import { Controller, Delete, Get, Param, Patch, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { HistoryService } from './history.service';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@ApiTags('history')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get()
  async getHistory(@Req() req) {
    return await this.historyService.getHistory(req.user.username);
  }

  @Delete()
  async deleteAllHistory(@Req() req) {
    const result = await this.historyService.deleteHistoryByUser(req.user.username);
    if (result) {
      return {
        message: `Delete all history successfully`,
      };
    }
  }

  @Delete(':id')
  async deleteHistoryById(@Param('id') id: number) {
    const result = await this.historyService.deleteHistoryById(id);
    if (result) {
      return {
        message: `Delete history successfully`,
      };
    }
  }

  @Patch('favorite/:id')
  async updateFavoriteById(@Param('id') id: number) {
    const result = await this.historyService.updateFavorite(id);
    if (result) {
      return {
        message: `Update favorite successfully`,
      };
    }
  }
}
