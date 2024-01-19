import {Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UploadedFile} from '@nestjs/common';
import {BlogsService} from './blogs.service';
import {CreateBlogDto} from './dto/create-blog.dto';
import {UpdateBlogDto} from './dto/update-blog.dto';
import {PaginationDto} from "./dto/pagination.dto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {FileInterceptor} from "@nestjs/platform-express";
import {Blog} from "./model/blog.model";
import {SlugDto} from "./dto/slug.dto";

@ApiTags('Blogs')
@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {
  }

  // @Post()
  // @UseInterceptors(FileInterceptor('image'))
  // create(@Body() createBlogDto: CreateBlogDto, @UploadedFile() image) {
  //   return this.blogsService.create(createBlogDto, image);
  // }

  @ApiOperation({summary: 'Get blogs '})
  @ApiResponse({status: 200, type: [Blog]})
  @Get()
  async findAll(@Query() paginationDto: PaginationDto) {
    return this.blogsService.findAll(paginationDto);
  }

  @ApiOperation({summary: 'Get one blogs from slug  '})
  @ApiResponse({status: 200, type: Blog})
  @Get('/:slug')
  findOne(@Param() params: SlugDto) {
    return this.blogsService.findOne(params.slug);
  }

  // @Patch(':slug')
  // update(@Param('slug') slug: string, @Body() updateBlogDto: UpdateBlogDto) {
  //   return this.blogsService.update(slug, updateBlogDto);
  // }
  //
  // @Delete(':slug')
  // remove(@Param('slug') slug: string) {
  //   return this.blogsService.remove(slug);
  // }
  //
  // @Delete()
  // removeAll() {
  //   return this.blogsService.removeAll();
  // }
}
