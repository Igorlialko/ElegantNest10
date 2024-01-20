import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { FilesService } from "../files/files.service";
import { PaginatedDto, PaginationDto } from "../utils/pagination/pagination.dto";
import { Blog } from "@/src/blogs/dto/blog.model";
export declare class BlogsService {
    private blogRepository;
    private fileService;
    constructor(blogRepository: typeof Blog, fileService: FilesService);
    findAll(paginationDto: PaginationDto): Promise<PaginatedDto<Blog>>;
    findOne(slug: string): Promise<any>;
    create(createBlogDto: CreateBlogDto, image: any): Promise<any>;
    update(slug: string, updateBlogDto: UpdateBlogDto): Promise<Blog>;
    remove(slug: string): Promise<string>;
}
