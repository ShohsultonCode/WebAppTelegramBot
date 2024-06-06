import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString() 
  @ApiProperty({
    example:"Programming"
  })  
  @MinLength(3)
  @MaxLength(50)
  category_name: string;
}
