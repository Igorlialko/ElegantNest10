import { BlogsService } from './blogs.service';
import { PaginationDto } from "./dto/pagination.dto";
import { Blog } from "./model/blog.model";
import { SlugDto } from "./dto/slug.dto";
export declare class BlogsController {
    private readonly blogsService;
    constructor(blogsService: BlogsService);
    findAll(paginationDto: PaginationDto): Promise<Blog[]>;
    findOne(params: SlugDto): Promise<any>;
}
