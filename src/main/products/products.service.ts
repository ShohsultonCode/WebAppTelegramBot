import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import UploadedFileInter, { Category, Product } from 'src/common/entity/user.entity';
import { checkId } from 'src/utils/check.id';
import { ImageService } from '../image/image.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Categories') private readonly Categories: Model<Category>,
    @InjectModel('Products') private readonly Products: Model<Product>,
    private readonly imageService: ImageService,
  ) { }

  
  async create(body: CreateProductDto, file:UploadedFileInter):Promise<Object> {
    const {product_name, product_description, product_category, product_price} = body;

    await checkId(product_category)

    const findCategory = await this.Categories.findById(product_category);

    if (!findCategory) {
      throw new BadRequestException("Category id of product is wrong");
    }
    const findProduct = await this.Products.findOne({
      product_image:product_name.trim()
    });

    if (findProduct) {
      throw new BadRequestException("Product already exists.");
    }

    
    if (!file || !file.filename) {
      throw new BadRequestException('Please sesnd Catgory Image !');
    }


    const productTemplate = {
      product_name:product_name.trim(),
      product_description:product_description.trim(),
      product_category:product_category,
      product_price:Number(product_price),
      product_image:file.filename
    }
    

    const createProduct = await this.Products.create(productTemplate);
    return { message: 'Success', statusCode: 200 };
  }

  async findAllCategories(): Promise<Object> {
    const data = await this.Products.find().populate("product_category").exec()
    return { message: "Success", statusCode: 200, data: data }
  }

  async findOne(id: string): Promise<Object> {
    await checkId(id)
    const product = await this.Products.findById(id)
    if (!product) {
      throw new NotFoundException("Not found")
    }
    return { message: "Success", statusCode: 200, data: product }
  }


  async update(
    body: UpdateProductDto,
    id: string,
    file: UploadedFileInter,
  ): Promise<Object> {
    
    const {product_name, product_description, product_category, product_price} = body;

    
    if (!id) {
      throw new NotFoundException("Send fucking id of product");
    }
    if (product_category) {
      const findCategory = await this.Categories.findById(product_category);   
      if (!findCategory ) {
        throw new NotFoundException("Category not found");
      }
    }

  
    const findProduct = await this.Products.findById(id);
    
    if (!findProduct ) {
      throw new NotFoundException("Product not found");
    }
    if (file && file.filename) {
      const imageNameToDelete = findProduct.product_image;
      await this.imageService.deleteImage(imageNameToDelete);
      findProduct.product_image = file.filename;
    }

    if (product_name) {
      const checkNameOfProduct = await this.Products.findOne({
        product_name: product_name.trim(),
      });


      if (checkNameOfProduct && checkNameOfProduct._id.toString() !== id) {
        throw new BadRequestException(
          'This product name is already created, please change the name!',
        );
      }
    
    
    }
    const productTemplate = {
      product_name: product_name || findProduct.product_name,
      product_description: product_description || findProduct.product_description,
      product_image: findProduct.product_image,
      product_category:product_category || findProduct.product_category
    };

    const updatedproduct = await this.Products.findByIdAndUpdate(id, productTemplate, { new: true });

    if (!updatedproduct) {
      throw new NotFoundException("Failed to update product");
    }

    return { message: "Successfully updated", statusCode: 200 };

  }

  async remove(id: string): Promise<Object> {
    await checkId(id);
    const findProduct = await this.Products.findById(id)
    if (findProduct && findProduct.product_image) {
      const deleteImage = await this.imageService.deleteImage(findProduct.product_image)
      const deleteCategory = await this.Products.findByIdAndDelete(id);
      return { message: "Success", statusCode: 200 };
    }
    throw new NotFoundException("Product not found")
  }
}
