import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({example: 'example@gmail.com', description: "Email address"})

  readonly email: string
  @ApiProperty({example: 'cxjh2341', description: "Password"})

  readonly password: string
}