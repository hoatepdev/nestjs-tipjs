import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  BadRequestException,
  Body,
  Query,
  Get,
  Res,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as fs from 'fs';
import { Response } from 'express';

@Controller('upload')
export class UploadController {
  // Single file upload
  @Post('single')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|pdf|doc|docx)$/)) {
          return callback(
            new BadRequestException(
              'Only image and document files are allowed!',
            ),
            false,
          );
        }
        callback(null, true);
      },
      limits: {
        fileSize: 1024 * 1024 * 5, // 5MB
      },
    }),
  )
  uploadSingleFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    console.log('⭐ file', file.path);

    return {
      message: 'File uploaded successfully',
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
    };
  }

  // Multiple files upload
  @Post('multiple')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  uploadMultipleFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files uploaded');
    }

    return {
      message: 'Files uploaded successfully',
      files: files.map((file) => ({
        filename: file.filename,
        originalName: file.originalname,
        size: file.size,
      })),
    };
  }

  @Post('large')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      dest: 'uploads',
    }),
  )
  uploadLargeFiles(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body: { name: string },
  ) {
    // 1. get file name
    const fileName = body.name.replace(/(-\d+)$/, '') || body.name;
    const nameDir = 'uploads/chunk-' + fileName;

    // 2. make folder name
    if (!fs.existsSync(nameDir)) {
      fs.mkdirSync(nameDir);
    }

    // 3. copy file chunk to folder
    fs.cpSync(files[0].path, nameDir + '/' + body.name);

    // 4. remove file chunk
    fs.rmSync(files[0].path);
  }

  // /upload/merge?file=chunk-69087-pexels-hsapir-1054666.jpg
  @Get('merge')
  // merge file
  mergeFile(
    @Query('file') fileName: string,
    @Res()
    res: Response,
  ) {
    const nameDir = 'uploads/' + fileName;
    const files = fs.readdirSync(nameDir);

    let startPos = 0,
      countFile = 0;
    files.map((file): any => {
      const filePath = nameDir + '/' + file;
      const streamFile = fs.createReadStream(filePath);
      streamFile
        .pipe(
          fs.createWriteStream('uploads/merge/' + fileName, {
            start: startPos,
          }),
        )
        .on('finish', () => {
          countFile++;
          if (files.length === countFile) {
            fs.rm(
              nameDir,
              {
                recursive: true,
              },
              () => {},
            );
            countFile = 0;
          }
        });

      startPos += fs.statSync(filePath).size;
    });
    return res.json({
      link: `http://localhost:3000/uploads/merge/${fileName}`,
      fileName,
    });
  }
}
