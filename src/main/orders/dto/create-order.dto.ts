import { IsString, IsNotEmpty, IsMongoId, IsOptional, IsNumber, IsArray } from 'class-validator';

export class CreateOrderDto {
  @IsArray()
  @IsNotEmpty()
  order_product_id: string


  @IsString()
  @IsNotEmpty()
  order_telegram_id: string;


  @IsNumber()
  @IsNotEmpty()
  order_count: number;

}
