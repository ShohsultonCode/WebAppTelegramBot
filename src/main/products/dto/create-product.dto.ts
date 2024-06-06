import { IsString, IsNotEmpty, IsMongoId, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  product_name: string;

  @IsString()
  @IsNotEmpty()
  product_description: string;


  @IsMongoId()
  @IsNotEmpty()
  product_category: string;

  @IsString()
  @IsNotEmpty()
  product_price: string;

  @IsOptional()
  product_image: string;
}
