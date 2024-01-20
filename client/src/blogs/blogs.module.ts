import {Module} from '@nestjs/common';
import {BlogsService} from './blogs.service';
import {BlogsController} from './blogs.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {FilesModule} from "../files/files.module";
import {Blog} from "@/src/blogs/dto/blog.model";

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
