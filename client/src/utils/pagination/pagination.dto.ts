import {IsInt, IsOptional} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";
import {Type} from "class-transformer";

export class PaginationDto {
  @ApiProperty({example: '1', description: 'Page for pagination'})
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  readonly page: number ;

  @ApiProperty({example: '10', description: 'Limit for pagination'})
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  readonly limit: number ;
}

export class PaginatedDto<TData> {
  @ApiProperty({example: '1', description: 'total count'})
  total: number;

  @ApiProperty({example: '1', description: 'Limit for pagination'})
  limit: number;

  @ApiProperty({example: '1', description: 'Page for pagination'})
  page: number;

  results: TData[];
}
