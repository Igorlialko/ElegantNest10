import { IsOptional } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class PaginationDto {
  @ApiProperty({example: '1', description: 'Page for pagination'})
  @IsOptional()
  readonly page: number ;

  @ApiProperty({example: '10', description: 'Limit for pagination'})
  @IsOptional()
  readonly limit: number ;
}