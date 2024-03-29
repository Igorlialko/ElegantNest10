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
exports.BlogsController = void 0;
const common_1 = require("@nestjs/common");
const blogs_service_1 = require("./blogs.service");
const swagger_1 = require("@nestjs/swagger");
const slug_dto_1 = require("./dto/slug.dto");
const api_paginated_response_decorator_1 = require("../utils/pagination/api-paginated-response.decorator");
const blog_model_1 = require("./dto/blog.model");
const pagination_dto_1 = require("../utils/pagination/pagination.dto");
const platform_express_1 = require("@nestjs/platform-express");
const create_blog_dto_1 = require("./dto/create-blog.dto");
const update_blog_dto_1 = require("./dto/update-blog.dto");
let BlogsController = class BlogsController {
    constructor(blogsService) {
        this.blogsService = blogsService;
    }
    async findAll(paginationDto) {
        return this.blogsService.findAll(paginationDto);
    }
    findOne(params) {
        return this.blogsService.findOne(params.slug);
    }
    create(createBlogDto, image) {
        return this.blogsService.create(createBlogDto, image);
    }
    update(slug, updateBlogDto) {
        return this.blogsService.update(slug, updateBlogDto);
    }
    remove(slug) {
        return this.blogsService.remove(slug);
    }
};
exports.BlogsController = BlogsController;
__decorate([
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        type: typeof common_1.HttpException,
        description: 'Page and limit must be greater than 0'
    }),
    (0, swagger_1.ApiOperation)({ summary: 'Get blogs ' }),
    (0, api_paginated_response_decorator_1.ApiPaginatedResponse)(blog_model_1.Blog),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], BlogsController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get one blogs from slug  ' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: blog_model_1.Blog }),
    (0, common_1.Get)('/:slug'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [slug_dto_1.SlugDto]),
    __metadata("design:returntype", void 0)
], BlogsController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)("ADMIN"),
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_blog_dto_1.CreateBlogDto, Object]),
    __metadata("design:returntype", void 0)
], BlogsController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)("ADMIN"),
    (0, common_1.Patch)(':slug'),
    __param(0, (0, common_1.Param)('slug')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_blog_dto_1.UpdateBlogDto]),
    __metadata("design:returntype", void 0)
], BlogsController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)("ADMIN"),
    (0, common_1.Delete)(':slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BlogsController.prototype, "remove", null);
exports.BlogsController = BlogsController = __decorate([
    (0, swagger_1.ApiTags)('Blogs'),
    (0, common_1.Controller)('blogs'),
    __metadata("design:paramtypes", [blogs_service_1.BlogsService])
], BlogsController);
//# sourceMappingURL=blogs.controller.js.map