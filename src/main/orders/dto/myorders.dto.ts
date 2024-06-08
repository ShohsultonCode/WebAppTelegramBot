import { IsString, IsNotEmpty, IsMongoId, IsOptional } from 'class-validator';

export class MyOrderDto {
  @IsString()
  @IsNotEmpty()
  order_telegram_id: string;
}
