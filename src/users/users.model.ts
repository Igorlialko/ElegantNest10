import {Column, Model, DataType, Table, BelongsToMany} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Role} from "../roles/roles.model";
import {UserRoles} from "../roles/user-roles.model";

interface UserCreationAttrs {
  email: string
  password: string
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({example: 1, description: "Unique identifier"})
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  })
  id: number;

  @ApiProperty({example: 'example@gmail.com', description: "Email address"})
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false
  })
  email: string

  @ApiProperty({example: 'cxjh2341', description: "Password"})
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  password: string

  @ApiProperty({example: true, description: "Banned user or not"})
  @Column({
    type: DataType.BOOLEAN, defaultValue: false
  })
  banned: boolean

  @ApiProperty({example: 'For hooliganism, bad boy', description: "reason for ban"})
  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  banReason: string;

  @BelongsToMany(()=>Role,()=>UserRoles)
  roles:Role[]
}