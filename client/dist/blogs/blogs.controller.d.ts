import { BlogsService } from './blogs.service';
import { SlugDto } from "./dto/slug.dto";
import { Blog } from "@/src/blogs/dto/blog.model";
import { PaginationDto } from "@/src/utils/pagination/pagination.dto";
import { CreateBlogDto } from "@/src/blogs/dto/create-blog.dto";
import { UpdateBlogDto } from "@/src/blogs/dto/update-blog.dto";
export declare class BlogsController {
    private readonly blogsService;
    constructor(blogsService: BlogsService);
    findAll(paginationDto: PaginationDto): Promise<import("@/src/utils/pagination/pagination.dto").PaginatedDto<Blog>>;
    findOne(params: SlugDto): Promise<any>;
    create(createBlogDto: CreateBlogDto, image: any): Promise<any>;
    update(slug: string, updateBlogDto: UpdateBlogDto): Promise<Blog>;
    remove(slug: string): Promise<string>;
}
