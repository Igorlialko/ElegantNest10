import { Column, DataType, Model, Table} from "sequelize-typescript";

interface BlogCreationAttrs {
  title: string;
  content: string;
  slug: string;
  date?: string;
  image: string;
}

@Table({tableName: 'blogs'})
export class Blog extends Model<Blog, BlogCreationAttrs> {
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @Column({type: DataType.STRING, allowNull: false})
  title: string;

  @Column({type: DataType.DATE, allowNull: false, defaultValue: DataType.NOW})
  date: string;

  @Column({type: DataType.STRING, allowNull: false})
  content: string;

  @Column({type: DataType.STRING, unique: true})
  slug: string;

  @Column({type: DataType.STRING})
  image: string;

}
