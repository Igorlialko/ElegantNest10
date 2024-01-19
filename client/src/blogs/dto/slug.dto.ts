import {ApiProperty} from "@nestjs/swagger";

export class SlugDto {
  @ApiProperty({example: 'blog-for-bathroom', description: 'Unique slug for blog'})
  readonly slug: string ;
}