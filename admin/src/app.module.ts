import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {UsersModule} from './users/users.module';
import {ConfigModule} from "@nestjs/config";
import {User} from "./users/users.model";
import {RolesModule} from './roles/roles.module';
import {Role} from "./roles/roles.model";
import {UserRoles} from "./roles/user-roles.model";
import {AuthModule} from './auth/auth.module';
import {PostsModule} from './posts/posts.module';
import {Post} from "./posts/posts.model";
import {FilesModule} from './files/files.module';
import {ServeStaticModule} from "@nestjs/serve-static";
import {BlogsModule} from './blogs/blogs.module';
import * as path from 'path';
import {Blog} from "./blogs/model/blog.model";

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
      serveRoot: '/static'
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRESS_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRESS_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Role, UserRoles, Post, Blog],
      autoLoadModels: true,
      ssl: true, // Enable SSL
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false, // Use this option if you encounter issues with self-signed certificates
        },
      },
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    PostsModule,
    FilesModule,
    BlogsModule,
  ]
})
export class AppModule {
}
