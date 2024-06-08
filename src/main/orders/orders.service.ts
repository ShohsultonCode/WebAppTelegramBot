import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, User } from 'src/common/entity/user.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel('Users') private readonly Users: Model<User>,
    @InjectModel('Products') private readonly Products: Model<Product>,
  ) { }

  create(createOrderDto: CreateOrderDto) {
    const { order_product_id, order_user_id } = createOrderDto;

    // const createUser = await this.Users.create({
      
    // })
    return 'This action adds a new order';
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: string) {
    return `This action returns a #${id} order`;
  }
}
