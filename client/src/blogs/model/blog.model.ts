import {Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";

interface BlogCreationAttrs {
  title: string;
  content: string;
  slug: string;
  date?: string;
  image: string;
  authorName?: string
}

@Table({tableName: 'blogs'})
export class Blog extends Model<Blog, BlogCreationAttrs> {
  @ApiProperty({example: '1', description: 'Unique id'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ApiProperty({example: 'Blog for bathroom'})
  @Column({type: DataType.STRING, allowNull: false})
  title: string;

  @ApiProperty({example: `${DataType.NOW}`, description:'Example date format'})
  @Column({type: DataType.DATE, allowNull: false, defaultValue: DataType.NOW})
  date: string;

  @ApiProperty({example: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusantium aliquam aperiam autem cumque dolorem ', description:'Any text content'})
  @Column({type: DataType.STRING, allowNull: false})
  content: string;

  @ApiProperty({example: 'blog-for-bathroom', description: 'Unique slug for routing created from title'})
  @Column({type: DataType.STRING, unique: true})
  slug: string;

  @ApiProperty({example: 'https://example.com/static/image.png', description: 'Url for image'})
  @Column({type: DataType.STRING})
  image: string;

  @ApiProperty({example: 'Henrik Annemark', description: 'Autor for blog'})
  @Column({type: DataType.STRING, allowNull: false, defaultValue: 'Henrik Annemark'})
  authorName: string;

}

