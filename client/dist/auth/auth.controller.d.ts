import { CreateUserDto } from "../users/dto/create-user.dto";
import { AuthService } from "./auth.service";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(userDto: CreateUserDto): unknown;
    registration(userDto: CreateUserDto): unknown;
}
