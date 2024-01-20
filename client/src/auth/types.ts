import {ApiProperty} from "@nestjs/swagger";

export class TUserWithToken <User>{
  user: User

  @ApiProperty({example: '1', description: 'Authorization token '})
  token: string
}