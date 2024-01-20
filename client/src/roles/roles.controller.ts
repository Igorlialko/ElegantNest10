import {Body, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import {RolesService} from "./roles.service";
import {CreateRoleDto, GetRoleDto} from "./dto/create-role.dto";
import { ApiTags} from "@nestjs/swagger";
import {Roles} from "@/src/auth/roles-auth.decorator";

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
    constructor(private roleService: RolesService) {}

    // @Post()
    // create(@Body() dto: CreateRoleDto) {
    //     return this.roleService.createRole(dto);
    // }
    //
    // @Get('/:value')
    // getByValue(@Param() param: GetRoleDto) {
    //     return this.roleService.getRoleByValue(param.value);
    // }
}
