import { IsString, IsNotEmpty, IsMongoId, IsOptional } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  order_product_id: string;


  @IsString()
  @IsNotEmpty()
  order_telegram_id: string;
}
