import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto {
  @IsNotEmpty({ message: 'Category id is required' })
  @ApiProperty({
    example:"category id"
  })  
  @IsString()
  category_id:string


  @IsString()
  @ApiProperty({
    example:"Pizza"
  }) 
  @IsOptional()
  category_name: string;
}
