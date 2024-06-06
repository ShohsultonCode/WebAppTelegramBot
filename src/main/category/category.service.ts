import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from 'src/common/entity/user.entity';
import { checkId } from 'src/utils/check.id';
import { CreateCategoryDto } from './dto/category.create.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';


@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Categories') private readonly Categories: Model<Category>,
  ) { }

  async createCategory(req: any, body: CreateCategoryDto): Promise<object> {
    const { category_name } = body

    const categoryCheck = await this.Categories.findOne({
      category_name: category_name.trim(),
    });

    if (categoryCheck) {
      throw new BadRequestException(
        'This Category name is already created, Please change name !',
      );
    }


    const categoryTemplate = {
      category_name: category_name.trim(),
    };

    const newCategory = await this.Categories.create(categoryTemplate);

    const category = await this.Categories.findById(newCategory.id)

    return { message: 'Success', statusCode: 200 };
  }

  async findAllCategories(): Promise<Object> {
    const viewForAdminCategories = await this.Categories.find().exec()
    return { message: "Success", statusCode: 200, data: viewForAdminCategories }
  }

  async findOne(id: string): Promise<Object> {
    await checkId(id)
    const category = await this.Categories.findById(id)
    if (!category) {
      throw new NotFoundException("Not found")
    }
    return { message: "Success", statusCode: 200, data: category }
  }


  async update(
    body: UpdateCategoryDto,
    req: any,
  ): Promise<Object> {
    const { category_name, category_id } = body;

    await checkId(category_id);

    const findCategory = await this.Categories.findById(category_id);
    if (!findCategory) {
      throw new NotFoundException("Category not found");
    }

    if (category_name) {
      const checkNameOfCategory = await this.Categories.findOne({
        category_name: category_name.trim().toLowerCase(),
      });

      if (checkNameOfCategory && checkNameOfCategory._id.toString() !== category_id) {
        throw new BadRequestException(
          'This category name is already created, please change the name!',
        );
      }
    }

    const categoryTemplate = {
      category_name: category_name || findCategory.category_name,
    };

    const updatedCategory = await this.Categories.findByIdAndUpdate(category_id, categoryTemplate, { new: true });

    if (!updatedCategory) {
      throw new NotFoundException("Failed to update category");
    }

    return { message: "Successfully updated", statusCode: 200 };
  }

  async remove(id: string): Promise<Object> {
    await checkId(id);
    const findCategoryImg = await this.Categories.findById(id)
    if (findCategoryImg) {
      const deleteCategory = await this.Categories.findByIdAndDelete(id);
      return { message: "Success", statusCode: 200 };
    }
    throw new NotFoundException("Category not found")
  }
}
