import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import UploadedFileInter from 'src/common/entity/user.entity';
import { fileUploadInterceptor } from 'src/common/utils/file.catch';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('create')
  @UseInterceptors(fileUploadInterceptor('product_image'))
  create(@Body() createProductDto: CreateProductDto,  @UploadedFile() file: UploadedFileInter) {
    return this.productsService.create(createProductDto, file);
  }

  @Get()
  findAll() {
    return this.productsService.findAllCategories();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Put('')
  @UseInterceptors(fileUploadInterceptor('product_image'))
  update(@Body() updateProductDto: UpdateProductDto, @UploadedFile() file: UploadedFileInter, req: any, ) {
    
    return this.productsService.update(updateProductDto, req, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
