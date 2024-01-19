import { BlogsService } from './blogs.service';
import { PaginationDto } from "./dto/pagination.dto";
import { Blog } from "./model/blog.model";
export declare class BlogsController {
    private readonly blogsService;
    constructor(blogsService: BlogsService);
    findAll(paginationDto: PaginationDto): Promise<Blog[]>;
    findOne(slug: any): Promise<any>;
}
