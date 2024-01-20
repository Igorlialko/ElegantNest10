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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blog = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const swagger_1 = require("@nestjs/swagger");
let Blog = class Blog extends sequelize_typescript_1.Model {
};
exports.Blog = Blog;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'Unique id' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true }),
    __metadata("design:type", Number)
], Blog.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Blog for bathroom' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false }),
    __metadata("design:type", String)
], Blog.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: `${sequelize_typescript_1.DataType.NOW}`, description: 'Example date format' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATE, allowNull: false, defaultValue: sequelize_typescript_1.DataType.NOW }),
    __metadata("design:type", String)
], Blog.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusantium aliquam aperiam autem cumque dolorem ', description: 'Any text content' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false }),
    __metadata("design:type", String)
], Blog.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'blog-for-bathroom', description: 'Unique slug for routing created from title' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, unique: true }),
    __metadata("design:type", String)
], Blog.prototype, "slug", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://example.com/static/image.png', description: 'Url for image' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Blog.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Henrik Annemark', description: 'Autor for blog' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false, defaultValue: 'Henrik Annemark' }),
    __metadata("design:type", String)
], Blog.prototype, "authorName", void 0);
exports.Blog = Blog = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'blogs' })
], Blog);
//# sourceMappingURL=blog.model.js.map