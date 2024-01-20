import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { User } from "./users.model";
import { InjectModel } from "@nestjs/sequelize";
import { CreateUserDto } from "./dto/create-user.dto";
import { RolesService } from "../roles/roles.service";
import { AddRoleDto } from "./dto/add-role.dto";
import { BanUserDto } from "./dto/ban-user.dto";

@Injectable()
export class UsersService {

  constructor(@InjectModel(User) private userRepository: typeof User,
              private roleService: RolesService) {
  }

  async createUser(dto: CreateUserDto):Promise<User> {

    let role;
    try {
      role = await this.roleService.getRoleByValue("USER");
      if (!role) {
        throw new HttpException("Не существует роли при создании пользователя, добавьте пожалуйста роль", HttpStatus.NOT_FOUND);
      }
    } catch (e) {
      throw new HttpException("Не существует роли при создании пользователя, добавьте пожалуйста роль", HttpStatus.NOT_FOUND);
    }

    let user;
    try {
      user = await this.userRepository.create(dto);
    } catch (e) {
      if(e?.fields?.email){
        throw new HttpException(`Пользователь с емейлом ${e.fields.email} - уже существует`, HttpStatus.CONFLICT);
      }
      throw new HttpException(`Непредвиденная ошибка, пожалуйста обратитесь к разработчику `, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    await user.$set("roles", [role.id]);
    user.roles = [role];
    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email }, include: { all: true } });
    return user;
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    const role = await this.roleService.getRoleByValue(dto.value);
    if (role && user) {
      await user.$add("role", role.id);
      return dto;
    }
    throw new HttpException("Пользователь или роль не найдены", HttpStatus.NOT_FOUND);
  }

  async ban(dto: BanUserDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    if (!user) {
      throw new HttpException("Пользователь не найден", HttpStatus.NOT_FOUND);
    }
    user.isBanned = true;
    user.banReason = dto.banReason;
    await user.save();
    return user;
  }
}
