import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { DatabaseModule } from 'src/database/database.module';
import { CategoryModule } from 'src/main/category/category.module';
import { ImageModule } from 'src/main/image/image.module';
import { ProductsModule } from 'src/main/products/products.module';
import { UsersModule } from 'src/main/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './upload',
      }),
    }),
    UsersModule,
    ImageModule,
    CategoryModule,
    ProductsModule
  ],
  providers: [],
  controllers: []
})
export class SharedModule {}
