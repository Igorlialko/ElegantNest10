import { AuthService } from './auth.service';
declare const BasicAuthStrategy_base: new (...args: any[]) => any;
export declare class BasicAuthStrategy extends BasicAuthStrategy_base {
    private readonly authService;
    constructor(authService: AuthService);
    validate(username: string, password: string): Promise<any>;
}
export {};
