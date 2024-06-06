import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Schemas } from 'src/config/constant';
@Module({
  imports: [
    ConfigModule.forRoot(), // If you want to use the config module
    MongooseModule.forRootAsync({
      imports: [ConfigModule], // If you want to use the config module
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('DATABASE_CONNECTION'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature(Schemas), // Import your Mongoose schema
  ],
})
export class DatabaseModule {}
