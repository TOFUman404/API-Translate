import { Controller, Delete, Get, HttpCode, Param, Patch, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { HistoryService } from './history.service';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@ApiTags('history')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get('all')
  async getHistory(@Req() req: any) {
    return await this.historyService.getHistory(req.user.username);
  }

  @Delete('all')
  async deleteAllHistory(@Req() req: any) {
    const result = await this.historyService.deleteHistoryByUser(
      req.user.username,
    );
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

  @HttpCode(200)
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
