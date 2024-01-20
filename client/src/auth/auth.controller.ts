import {Body, Controller, Get, Post, Req, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiForbiddenResponse, ApiOperation, ApiResponse, ApiTags, getSchemaPath} from "@nestjs/swagger";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {AuthService} from "./auth.service";
import {User} from "@/src/users/users.model";
import {JwtAuthGuard} from "@/src/auth/jwt-auth.guard";
import {Request} from 'express';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {
  }

  @ApiOperation({summary: 'Sign in'})
  @Post('/login')
  login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto)
  }

  @ApiOperation({summary: 'Sign up'})
  @ApiResponse({
    status: 200,
    schema: {
      properties: {
        token: {
          type: 'string',
          example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhhbmFuZHJlaTAxQGdtYWlsLmNvbSIsInN1YiI6IjYyOTA5NmUzMTk0MmFmN2Q2YmFkYTkyNCIsImlzX2FjdGl2ZSI6InRydWUiLCJpYXQiOjE2NTQyNzYzMDgsImV4cCI6MTY1Njg2ODMwOH0.MUXgJhHvmPqbLNbnN9Wj-ipIrDOViLHpOQTCcUCah1A',
        },
        user: {$ref: getSchemaPath(User)}
      },
    },
  })
  @Post('/registration')
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto)
  }

  @ApiOperation({summary: 'get me users'})
  @ApiResponse({
    status: 200,
    schema: {
      properties: {
        token: {
          type: 'string',
          example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhhbmFuZHJlaTAxQGdtYWlsLmNvbSIsInN1YiI6IjYyOTA5NmUzMTk0MmFmN2Q2YmFkYTkyNCIsImlzX2FjdGl2ZSI6InRydWUiLCJpYXQiOjE2NTQyNzYzMDgsImV4cCI6MTY1Njg2ODMwOH0.MUXgJhHvmPqbLNbnN9Wj-ipIrDOViLHpOQTCcUCah1A',
        },
        user: {$ref: getSchemaPath(User)}
      },
    },
  })
  @ApiBearerAuth()
  @ApiForbiddenResponse({status: 403,})
  @UseGuards(JwtAuthGuard)
  @Get('/me')
  getProfile(@Req() req: Request) {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1]
    return this.authService.getProfile(token);
  }
}
