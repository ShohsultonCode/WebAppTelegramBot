import { Controller, Get, Param, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ImageService } from './image.service';


@ApiTags('images')
@Controller('images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}


  @Get(":filename")
  async getImages(@Param('filename') filename: string, @Res() res: Response) {
   try {
    return res.sendFile(filename, { root: './uploads' });
   } catch (error) {
    console.log("Images not found");
    
   }
  }
}
