import { User } from "./users.model";
import { CreateUserDto } from "./dto/create-user.dto";
import { RolesService } from "../roles/roles.service";
import { AddRoleDto } from "./dto/add-role.dto";
import { BanUserDto } from "./dto/ban-user.dto";
export declare class UsersService {
    private userRepository;
    private roleService;
    constructor(userRepository: typeof User, roleService: RolesService);
    createUser(dto: CreateUserDto): unknown;
    getAllUsers(): unknown;
    getUserByEmail(email: string): unknown;
    addRole(dto: AddRoleDto): unknown;
    ban(dto: BanUserDto): unknown;
}
