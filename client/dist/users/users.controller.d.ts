import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
import { AddRoleDto } from "./dto/add-role.dto";
import { BanUserDto } from "./dto/ban-user.dto";
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    create(userDto: CreateUserDto): unknown;
    getAll(): unknown;
    addRole(dto: AddRoleDto): unknown;
    ban(dto: BanUserDto): unknown;
}
