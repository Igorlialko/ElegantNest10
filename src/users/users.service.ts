import {Injectable} from '@nestjs/common';
import {User} from "./users.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateUserDto} from "./dto/create-user.dto";

@Injectable()
export class UsersService {

  constructor(@InjectModel(User) private userRepository: typeof User) {
  }

  async createUser(dto: CreateUserDto): Promise<any> {
    const user = await this.userRepository.create(dto)
    delete user.dataValues.createdAt
    delete user.dataValues.updatedAt
    return user.dataValues
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({
        attributes: {exclude: ['createdAt', 'updatedAt']}
      }
    )
    return users
  }
}
