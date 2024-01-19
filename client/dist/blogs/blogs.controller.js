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
const pagination_dto_1 = require("./dto/pagination.dto");
const swagger_1 = require("@nestjs/swagger");
const blog_model_1 = require("./model/blog.model");
let BlogsController = class BlogsController {
    constructor(blogsService) {
        this.blogsService = blogsService;
    }
    async findAll(paginationDto) {
        return this.blogsService.findAll(paginationDto);
    }
    findOne(slug) {
        return this.blogsService.findOne(slug);
    }
};
exports.BlogsController = BlogsController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get blogs ' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [blog_model_1.Blog] }),
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
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BlogsController.prototype, "findOne", null);
exports.BlogsController = BlogsController = __decorate([
    (0, swagger_1.ApiTags)('Blogs'),
    (0, common_1.Controller)('blogs'),
    __metadata("design:paramtypes", [blogs_service_1.BlogsService])
], BlogsController);
//# sourceMappingURL=blogs.controller.js.map