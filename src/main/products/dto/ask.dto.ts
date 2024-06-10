import { IsArray, IsNotEmpty } from 'class-validator';

export class AskProductDto {
  @IsArray()
  @IsNotEmpty()
  product_ids: string[]; // Define the type of the array elements, for example, string
}
