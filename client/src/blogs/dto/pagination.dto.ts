import { IsOptional } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  readonly page: number ;

  @IsOptional()
  readonly limit: number ;
}