import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { PaginationDto } from "./dto/pagination.dto";
export declare class BlogsController {
    private readonly blogsService;
    constructor(blogsService: BlogsService);
    create(createBlogDto: CreateBlogDto, image: any): unknown;
    findAll(paginationDto: PaginationDto): unknown;
    findOne(slug: string): unknown;
    update(slug: string, updateBlogDto: UpdateBlogDto): unknown;
    remove(slug: string): unknown;
}
