import { IsString, IsNotEmpty, IsMongoId, IsOptional } from 'class-validator';

export class UpdateProductDto {
  @IsNotEmpty()
  product_id: string;

  @IsOptional()
  product_name: string;

  @IsOptional()
  product_description: string;

  @IsOptional()
  product_category: string;

  @IsOptional()
  product_price: string;

  @IsOptional()
  product_image: string;
}
