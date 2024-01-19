import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { PaginationDto } from "./dto/pagination.dto";
import { Blog } from "./model/blog.model";
import { SlugDto } from "./dto/slug.dto";
export declare class BlogsController {
    private readonly blogsService;
    constructor(blogsService: BlogsService);
    create(createBlogDto: CreateBlogDto, image: any): Promise<any>;
    findAll(paginationDto: PaginationDto): Promise<Blog[]>;
    findOne(params: SlugDto): Promise<any>;
    removeAll(): Promise<string>;
}
