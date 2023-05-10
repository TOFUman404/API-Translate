import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { IUser } from '../interface/auth.interface';

export class AuthDto implements IUser {
  @ApiProperty({
    description: 'Username',
    type: String,
    required: true,
    default: 'tester',
  })
  @IsString()
  @Type(() => String)
  username: string;
  @ApiProperty({
    description: 'Password',
    type: String,
    required: true,
    default: '123456',
  })
  @IsString()
  @Type(() => String)
  password: string;
}
