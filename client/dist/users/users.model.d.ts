import { Model } from "sequelize-typescript";
import { Role } from "../roles/roles.model";
interface UserCreationAttrs {
    email: string;
    password: string;
}
export declare class User extends Model<User, UserCreationAttrs> {
    id: number;
    email: string;
    password?: string;
    isBanned: boolean;
    banReason: string;
    firstName: string;
    lastName: string;
    displayName: string;
    image: string;
    roles: Role[];
}
export {};
