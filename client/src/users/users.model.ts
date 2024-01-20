import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Role} from "../roles/roles.model";
import {UserRoles} from "../roles/user-roles.model";

interface UserCreationAttrs {
  email: string;
  password: string;
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({example: '1', description: 'Unique id'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ApiProperty({example: 'user@gmail.com', description: 'email address'})
  @Column({type: DataType.STRING, unique: true, allowNull: false})
  email: string;

  @Column({type: DataType.STRING, allowNull: false})
  password?: string;

  @ApiProperty({example: 'true', description: 'trigger for ban'})
  @Column({type: DataType.BOOLEAN, defaultValue: false})
  isBanned: boolean;

  @ApiProperty({example: 'For hooliganism', description: 'Blocking reason'})
  @Column({type: DataType.STRING, allowNull: true})
  banReason: string;

  @ApiProperty({example: 'Vasia', description: 'User Name '})
  @Column({type: DataType.STRING, allowNull: true})
  firstName: string;

  @ApiProperty({example: 'Pupkin', description: 'Last Name  '})
  @Column({type: DataType.STRING, allowNull: true})
  lastName: string;

  @ApiProperty({
    example: 'dragon228',
    description: 'This will be how your name will be displayed in the account section and in reviews'
  })
  @Column({type: DataType.STRING, allowNull: true})
  displayName: string;

  @ApiProperty({example: 'https://example.com/static/image.png', description: 'Url for image'})
  @Column({type: DataType.STRING, allowNull: true})
  image: string;

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];

}
