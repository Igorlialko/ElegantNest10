"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesService = void 0;
const common_1 = require("@nestjs/common");
const path = require("path");
const fs = require("fs");
const uuid = require("uuid");
let FilesService = class FilesService {
    async createImage({ image, directoryPath, fileName }) {
        try {
            console.log("image", image);
            const arrDot = image.originalname?.split('.');
            const imageName = `${fileName || uuid.v4()}.${arrDot?.[arrDot.length - 1] || 'jpg'}`;
            const filePath = path.resolve(__dirname, '..', 'static', directoryPath);
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, { recursive: true });
            }
            await fs.promises.writeFile(path.join(filePath, imageName), image.buffer);
            return imageName;
        }
        catch (e) {
            throw new common_1.HttpException('Произошла ошибка при записи файла', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async removeFile({ directoryPath, fileName }) {
        try {
            const filePath = path.resolve(__dirname, '..', 'static', directoryPath);
            await fs.promises.rm(path.join(filePath, fileName));
        }
        catch (e) {
        }
    }
};
exports.FilesService = FilesService;
exports.FilesService = FilesService = __decorate([
    (0, common_1.Injectable)()
], FilesService);
//# sourceMappingURL=files.service.js.map