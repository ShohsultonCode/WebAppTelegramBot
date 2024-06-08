import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Schemas } from 'src/config/constant';

@Module({
  imports:[
    MongooseModule.forFeature(Schemas),
   ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
