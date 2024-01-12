import {IsOptional, IsString} from "class-validator";

export class CreateBlogDto {

  @IsString({message: 'Must be a string'})
  readonly title: string;

  @IsString({message: 'Must be a string'})
  readonly content: string;

  @IsString({message: 'Must be a string'})
  @IsOptional()
  readonly date?: string;

  @IsString({message: 'Must be a string'})
  readonly slug: string;
}
