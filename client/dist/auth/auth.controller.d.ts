import { CreateUserDto } from "../users/dto/create-user.dto";
import { AuthService } from "./auth.service";
import { User } from "@/src/users/users.model";
import { Request } from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(userDto: CreateUserDto): Promise<import("./types").TUserWithToken<User>>;
    registration(userDto: CreateUserDto): Promise<import("./types").TUserWithToken<User>>;
    getProfile(req: Request): Promise<import("./types").TUserWithToken<User>>;
}
