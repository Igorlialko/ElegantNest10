import {Module} from '@nestjs/common';
import {BlogsService} from './blogs.service';
import {BlogsController} from './blogs.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Blog} from "./model/blog.model";
import {FilesModule} from "../files/files.module";

@Module({
  controllers: [BlogsController],
  providers: [BlogsService],
  imports: [
    SequelizeModule.forFeature([Blog]),
    FilesModule
  ]
})
export class BlogsModule {
}
