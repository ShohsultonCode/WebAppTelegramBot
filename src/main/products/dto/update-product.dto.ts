import { IsString, IsNotEmpty, IsMongoId } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  product_id: string;

  @IsString()
  product_name: string;

  @IsString()
  product_description: string;

  @IsMongoId()
  product_category: string;

  @IsString()
  product_price: string;

  @IsString()
  product_image: string;
}
