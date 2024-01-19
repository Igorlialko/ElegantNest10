import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from "./model/blog.model";
import { PaginationDto } from "./dto/pagination.dto";
import { FilesService } from "../files/files.service";
export declare class BlogsService {
    private blogRepository;
    private fileService;
    constructor(blogRepository: typeof Blog, fileService: FilesService);
    create(createBlogDto: CreateBlogDto, image: any): Promise<any>;
    findAll(paginationDto: PaginationDto): Promise<Blog[]>;
    findOne(slug: string): Promise<any>;
    update(slug: string, updateBlogDto: UpdateBlogDto): Promise<Blog>;
    remove(slug: string): Promise<string>;
    removeAll(): Promise<string>;
}
