"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const users_model_1 = require("./users.model");
const sequelize_1 = require("@nestjs/sequelize");
const roles_service_1 = require("../roles/roles.service");
let UsersService = class UsersService {
    constructor(userRepository, roleService) {
        this.userRepository = userRepository;
        this.roleService = roleService;
    }
    async createUser(dto) {
        let role;
        try {
            role = await this.roleService.getRoleByValue("USER");
            if (!role) {
                throw new common_1.HttpException("Не существует роли при создании пользователя, добавьте пожалуйста роль", common_1.HttpStatus.NOT_FOUND);
            }
        }
        catch (e) {
            throw new common_1.HttpException("Не существует роли при создании пользователя, добавьте пожалуйста роль", common_1.HttpStatus.NOT_FOUND);
        }
        let user;
        try {
            user = await this.userRepository.create(dto);
        }
        catch (e) {
            if (e?.fields?.email) {
                throw new common_1.HttpException(`Пользователь с емейлом ${e.fields.email} - уже существует`, common_1.HttpStatus.CONFLICT);
            }
            throw new common_1.HttpException(`Непредвиденная ошибка, пожалуйста обратитесь к разработчику `, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        await user.$set("roles", [role.id]);
        user.roles = [role];
        return user;
    }
    async getAllUsers() {
        const users = await this.userRepository.findAll({ include: { all: true } });
        return users;
    }
    async getUserByEmail(email) {
        const user = await this.userRepository.findOne({ where: { email }, include: { all: true } });
        return user;
    }
    async addRole(dto) {
        const user = await this.userRepository.findByPk(dto.userId);
        const role = await this.roleService.getRoleByValue(dto.value);
        if (role && user) {
            await user.$add("role", role.id);
            return dto;
        }
        throw new common_1.HttpException("Пользователь или роль не найдены", common_1.HttpStatus.NOT_FOUND);
    }
    async ban(dto) {
        const user = await this.userRepository.findByPk(dto.userId);
        if (!user) {
            throw new common_1.HttpException("Пользователь не найден", common_1.HttpStatus.NOT_FOUND);
        }
        user.isBanned = true;
        user.banReason = dto.banReason;
        await user.save();
        return user;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(users_model_1.User)),
    __metadata("design:paramtypes", [Object, roles_service_1.RolesService])
], UsersService);
//# sourceMappingURL=users.service.js.map