import {Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UploadedFile} from '@nestjs/common';
import {BlogsService} from './blogs.service';
import {CreateBlogDto} from './dto/create-blog.dto';
import {UpdateBlogDto} from './dto/update-blog.dto';
import {PaginationDto} from "./dto/pagination.dto";
import {ApiTags} from "@nestjs/swagger";
import {FileInterceptor} from "@nestjs/platform-express";

@ApiTags('Blogs')
@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(@Body() createBlogDto: CreateBlogDto, @UploadedFile() image) {
    return this.blogsService.create(createBlogDto, image);
  }

  @Get()
  async findAll(@Query() paginationDto: PaginationDto) {
    return this.blogsService.findAll(paginationDto);
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.blogsService.findOne(slug);
  }

  @Patch(':slug')
  update(@Param('slug') slug: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogsService.update(slug, updateBlogDto);
  }

  @Delete(':slug')
  remove(@Param('slug') slug: string) {
    return this.blogsService.remove(slug);
  }
}
