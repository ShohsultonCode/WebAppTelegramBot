import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/category.create.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

//ss
@ApiTags('categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }


  @Post("create")
  async createCategory(@Body() body: CreateCategoryDto, @Req() req: any): Promise<Object> {
    return this.categoryService.createCategory(req, body);
  }
  //ssss


  @Get("all")
  async findAll(): Promise<Object> {
    return await this.categoryService.findAllCategories();
  }

  @Get('/:id')
  async findOne(@Param('id') id: string): Promise<Object> {
    return this.categoryService.findOne(id);
  }

  @Put('')
  update(@Body() body: UpdateCategoryDto, @Req() req: any):Promise<Object> {
    return this.categoryService.update(body, req);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Object> {
    return this.categoryService.remove(id);
  }
}
