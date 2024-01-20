import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateBlogDto} from './dto/create-blog.dto';
import {UpdateBlogDto} from './dto/update-blog.dto';
import {InjectModel} from "@nestjs/sequelize";
import {FilesService} from "../files/files.service";
import {PaginatedDto, PaginationDto} from "../utils/pagination/pagination.dto";
import {getOffsetFromPageAndLimit} from "../utils/pagination/pagination";
import {Blog} from "@/src/blogs/dto/blog.model";

@Injectable()
export class BlogsService {

  constructor(@InjectModel(Blog) private blogRepository: typeof Blog, private fileService: FilesService) {
  }

  async findAll(paginationDto: PaginationDto): Promise<PaginatedDto<Blog>> {

    const {page = 1, limit = 10} = paginationDto;
    paginationDto = {page, limit}; // for add default params
    const fields = ['page', 'limit'];
    fields.forEach((field) => { //validation query params
      const fieldName = `${field.slice(0, 1).toUpperCase()}${field.slice(1)}`
      if (Number(paginationDto[field]) < 1) {
        throw new HttpException(`${fieldName} must be greater than 0`, HttpStatus.BAD_REQUEST);
      }
    })

    const data = await this.blogRepository.findAndCountAll({
      offset: getOffsetFromPageAndLimit({page, limit}),
      limit,
      attributes: {exclude: ['createdAt', 'updatedAt']}
    })
    return {
      total: data.count, limit, page, results: data.rows,
    }
  }

  async findOne(slug: string) {
    let blog
    try {
      blog = await this.blogRepository.findOne({where: {slug}, attributes: {exclude: ['createdAt', 'updatedAt']}})
    } catch (e) {
      throw new HttpException(`Blog with slug : ${slug}, not found`, HttpStatus.NOT_FOUND);
    }
    return blog
  }


  async create(createBlogDto: CreateBlogDto, image: any) {
    const directoryPath = 'blogs'
    //validation image size

    if (image.size > 200 * 1024) {
      throw new HttpException('The image size must be less than 200 kb', HttpStatus.BAD_REQUEST)
    }
    //validation mimetype
    if (!['image/png', 'image/jpeg'].includes(image.mimetype)) {
      throw new HttpException('Image format must be png or jpg', HttpStatus.BAD_REQUEST)
    }

    const fileName: string = await this.fileService.createImage({
      image, directoryPath
    });
    let blog;
    try {
      blog = await this.blogRepository.create({
        ...createBlogDto,
        image: `${process.env.SERVER_STATIC_URL}/${directoryPath}/${fileName}`
      })
    } catch (e) {
      if (e?.original?.code === '22007') {
        await this.fileService.removeFile({fileName, directoryPath})
        throw new HttpException('Invalid date format', HttpStatus.CONFLICT);
      }
      if (e?.original?.code === '23505') {
        if (e?.fields?.slug) {
          await this.fileService.removeFile({fileName, directoryPath})
          throw new HttpException('Duplicate slug', HttpStatus.CONFLICT);
        }
      }
      await this.fileService.removeFile({fileName, directoryPath})
      throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return blog
  }


  async update(slug: string, updateBlogDto: UpdateBlogDto) {
    const blogToUpdate = await this.blogRepository.findOne({where: {slug}});
    if (!blogToUpdate) {
      throw new HttpException(`Blog with slug: ${slug} not found`, HttpStatus.NOT_FOUND);
    }
    try {
      Object.assign(blogToUpdate, updateBlogDto);
      // Save the updated blog entry
      await blogToUpdate.save()

      return blogToUpdate
    } catch (e) {
      throw new HttpException(`Error updating blog with slug: ${slug}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(slug: string) {
    const blogToRemove = await this.blogRepository.findOne({where: {slug}});
    if (!blogToRemove) {
      throw new HttpException(`Blog with slug: ${slug} not found`, HttpStatus.NOT_FOUND);
    }

    try {
      await blogToRemove.destroy()
      return `Blog with slug: ${slug} removed successfully`;
    } catch (e) {
      throw new HttpException(`Error removing blog with slug: ${slug}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
