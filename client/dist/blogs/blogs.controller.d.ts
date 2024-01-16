import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { PaginationDto } from "./dto/pagination.dto";
export declare class BlogsController {
    private readonly blogsService;
    constructor(blogsService: BlogsService);
    create(createBlogDto: CreateBlogDto, image: any): Promise<any>;
    findAll(paginationDto: PaginationDto): Promise<import("./model/blog.model").Blog[]>;
    findOne(slug: string): Promise<any>;
    update(slug: string, updateBlogDto: UpdateBlogDto): Promise<import("./model/blog.model").Blog>;
    remove(slug: string): Promise<string>;
}
