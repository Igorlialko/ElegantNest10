import { CreateUserDto } from "../users/dto/create-user.dto";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { User } from "../users/users.model";
import { TUserWithToken } from "@/src/auth/types";
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UsersService, jwtService: JwtService);
    login(userDto: CreateUserDto): Promise<TUserWithToken<User>>;
    registration(userDto: CreateUserDto): Promise<TUserWithToken<User>>;
    private generateToken;
    private validateUser;
    getProfile(token: string): Promise<TUserWithToken<User>>;
}
