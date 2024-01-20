import {
  Body,
  Controller,
  Delete,
  Get, HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import {BlogsService} from './blogs.service';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {SlugDto} from "./dto/slug.dto";
import {ApiPaginatedResponse} from "../utils/pagination/api-paginated-response.decorator";
import {Blog} from "@/src/blogs/dto/blog.model";
import {PaginationDto} from "@/src/utils/pagination/pagination.dto";
import {FileInterceptor} from "@nestjs/platform-express";
import {CreateBlogDto} from "@/src/blogs/dto/create-blog.dto";
import {UpdateBlogDto} from "@/src/blogs/dto/update-blog.dto";

@ApiTags('Blogs')
@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {
  }

//public
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: typeof HttpException,
    description:'Page and limit must be greater than 0'
  })
  @ApiOperation({summary: 'Get blogs '})
  @ApiPaginatedResponse(Blog)
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

//admin
  @ApiBearerAuth("ADMIN")
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(@Body() createBlogDto: CreateBlogDto, @UploadedFile() image) {
    return this.blogsService.create(createBlogDto, image);
  }

  @ApiBearerAuth("ADMIN")
  @Patch(':slug')
  update(@Param('slug') slug: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogsService.update(slug, updateBlogDto);
  }

  @ApiBearerAuth("ADMIN")
  @Delete(':slug')
  remove(@Param('slug') slug: string) {
    return this.blogsService.remove(slug);
  }

}

