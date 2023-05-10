import { IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { IHistoryId, IHistoryUsername } from '../interface/history.interface';
import { ApiProperty } from '@nestjs/swagger';

// export class HistoryIdDto implements IHistoryId {
//   @ApiProperty({
//     type: Number,
//     required: true,
//   })
//   @IsNumber()
//   id: number;
// }

export class HistoryUsernameDto implements IHistoryUsername {
  @ApiProperty({
    description: 'The username to get history',
  })
  @IsString()
  @Type(() => String)
  username: string;
}
