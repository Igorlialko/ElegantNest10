"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogsService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const blog_model_1 = require("./model/blog.model");
const files_service_1 = require("../files/files.service");
let BlogsService = class BlogsService {
    constructor(blogRepository, fileService) {
        this.blogRepository = blogRepository;
        this.fileService = fileService;
    }
    async create(createBlogDto, image) {
        const directoryPath = 'blogs';
        if (image.size > 200 * 1024) {
            throw new common_1.HttpException('The image size must be less than 200 kb', common_1.HttpStatus.BAD_REQUEST);
        }
        if (!['image/png', 'image/jpeg'].includes(image.mimetype)) {
            throw new common_1.HttpException('Image format must be png or jpg', common_1.HttpStatus.BAD_REQUEST);
        }
        const fileName = await this.fileService.createImage({
            image, directoryPath
        });
        let blog;
        try {
            blog = await this.blogRepository.create({
                ...createBlogDto,
                image: `${process.env.SERVER_STATIC_URL}/${directoryPath}/${fileName}`
            });
        }
        catch (e) {
            if (e?.original?.code === '22007') {
                await this.fileService.removeFile({ fileName, directoryPath });
                throw new common_1.HttpException('Invalid date format', common_1.HttpStatus.CONFLICT);
            }
            if (e?.original?.code === '23505') {
                if (e?.fields?.slug) {
                    await this.fileService.removeFile({ fileName, directoryPath });
                    throw new common_1.HttpException('Duplicate slug', common_1.HttpStatus.CONFLICT);
                }
            }
            await this.fileService.removeFile({ fileName, directoryPath });
            throw new common_1.HttpException('Server error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return blog;
    }
    async findAll(paginationDto) {
        const { page = 1, limit = 10 } = paginationDto;
        paginationDto = { page, limit };
        const fields = ['page', 'limit'];
        fields.forEach((field) => {
            const fieldName = `${field.slice(0, 1).toUpperCase()}${field.slice(1)}`;
            if (isNaN(paginationDto[field])) {
                throw new common_1.HttpException(`${fieldName} must be a number`, common_1.HttpStatus.BAD_REQUEST);
            }
            if (Number(paginationDto[field]) < 1) {
                throw new common_1.HttpException(`${fieldName} must be greater than 0`, common_1.HttpStatus.BAD_REQUEST);
            }
        });
        const offset = (page - 1) * limit;
        return await this.blogRepository.findAll({ offset, limit, attributes: { exclude: ['createdAt', 'updatedAt'] } });
    }
    async findOne(slug) {
        let blog;
        try {
            blog = await this.blogRepository.findOne({ where: { slug } });
        }
        catch (e) {
            throw new common_1.HttpException(`Blog with slug : ${slug}, not found`, common_1.HttpStatus.NOT_FOUND);
        }
        return blog;
    }
    async update(slug, updateBlogDto) {
        try {
            const blogToUpdate = await this.blogRepository.findOne({ where: { slug } });
            if (!blogToUpdate) {
                throw new common_1.HttpException(`Blog with slug: ${slug} not found`, common_1.HttpStatus.NOT_FOUND);
            }
            Object.assign(blogToUpdate, updateBlogDto);
            await blogToUpdate.save();
            return blogToUpdate;
        }
        catch (e) {
            throw new common_1.HttpException(`Error updating blog with slug: ${slug}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async remove(slug) {
        try {
            const blogToRemove = await this.blogRepository.findOne({ where: { slug } });
            if (!blogToRemove) {
                throw new common_1.HttpException(`Blog with slug: ${slug} not found`, common_1.HttpStatus.NOT_FOUND);
            }
            await blogToRemove.destroy();
            return `Blog with slug: ${slug} removed successfully`;
        }
        catch (e) {
            throw new common_1.HttpException(`Error removing blog with slug: ${slug}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.BlogsService = BlogsService;
exports.BlogsService = BlogsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(blog_model_1.Blog)),
    __metadata("design:paramtypes", [Object, files_service_1.FilesService])
], BlogsService);
//# sourceMappingURL=blogs.service.js.map