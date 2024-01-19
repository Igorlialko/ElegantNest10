import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import * as path from 'path'
import * as fs from 'fs';
import * as uuid from 'uuid';

@Injectable()
export class FilesService {

  async createImage(
    {
      image,
      directoryPath,
      fileName
    }: {
      image,
      directoryPath?: string,
      fileName?: string
    }
  ): Promise<string> {

    try {
      console.log("image",image)

      const arrDot = image.originalname?.split('.')

      const imageName = `${fileName || uuid.v4()}.${arrDot?.[arrDot.length - 1] || 'jpg'}`
      const filePath = path.resolve(__dirname, '..', 'static', directoryPath)
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, {recursive: true})
      }
      await fs.promises.writeFile(path.join(filePath, imageName), image.buffer)
      return imageName;
    } catch (e) {
      throw new HttpException('Произошла ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async removeFile({
                     directoryPath,
                     fileName
                   }: {
    directoryPath?: string,
    fileName: string
  }) {
    try {
      const filePath = path.resolve(__dirname, '..', 'static', directoryPath)
      await fs.promises.rm(path.join(filePath, fileName))
    } catch (e) {
      //todo: log this message
    }

  }

}
