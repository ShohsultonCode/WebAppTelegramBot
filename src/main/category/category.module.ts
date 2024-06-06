import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Schemas } from 'src/config/constant';
import { ImageService } from '../image/image.service';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
  imports:[
    MongooseModule.forFeature(Schemas),

   ],
  controllers: [CategoryController],
  providers: [CategoryService, ImageService],
})
export class CategoryModule {}
