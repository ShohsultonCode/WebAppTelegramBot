import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, Product, User } from 'src/common/entity/user.entity';
import { checkId } from 'src/utils/check.id';
import { MyOrderDto } from './dto/myorders.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel('Users') private readonly Users: Model<User>,
    @InjectModel('Products') private readonly Products: Model<Product>,
    @InjectModel('Orders') private readonly Orders: Model<Order>,
  ) { }
  async create(createOrderDto: CreateOrderDto[]): Promise<Object> {
    const results = [];

    for (const dto of createOrderDto) {
      const { order_telegram_id, order_product_id, order_count } = dto;

      // Check if product exists
      const findProduct = await this.Products.findById(order_product_id);
      if (!findProduct) {
        throw new NotFoundException(`Product with ID ${order_product_id} not found`);
      }

      // Check if user exists, if not create a new one
      let checkUser = await this.Users.findOne({ user_telegram_id: order_telegram_id });
      if (!checkUser) {
        const createUser = new this.Users({ user_telegram_id: order_telegram_id });
        checkUser = await createUser.save();
      }

      // Create order
      const createOrder = await this.Orders.create({
        order_user_id: checkUser.id,
        order_product_id: order_product_id,
        order_amount_price: findProduct.product_price,
        order_count: order_count
      });

      await createOrder.save()
      results.push({ product_id: order_product_id, message: 'Order created successfully' });
    }

    return { message: 'Success', statusCode: 200, data: results };
  }


  async findAll(): Promise<Object> {
    const findAllOrders = await this.Orders.find().populate("order_user_id").populate("order_product_id").exec()
    return findAllOrders;
  }

  async findMyOrders(body: MyOrderDto): Promise<Object> {

    const findUser = await this.Users.findOne({ user_telegram_id: body.order_telegram_id })

    if (!findUser) {
      throw new NotFoundException("Order not found, You do not have fucking orders")
    }
    const findAllOrders = await this.Orders.find({ order_user_id: findUser._id }).populate("order_user_id").populate("order_product_id").exec()
    return findAllOrders;
  }

  async findOne(id: string): Promise<Object> {
    await checkId(id)
    const findOne = await this.Orders.findById(id).populate("order_user_id").populate("order_product_id");
    if (!findOne) {
      throw new NotFoundException("Order not found")
    }
    return findOne;
  }
}
