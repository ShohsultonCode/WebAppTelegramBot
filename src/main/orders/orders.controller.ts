import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';
import { ApiTags } from '@nestjs/swagger';
import { MyOrderDto } from './dto/myorders.dto';


@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}



  @Get("my")
  findMyOrders(@Body() body:MyOrderDto) {
    return this.ordersService.findMyOrders(body);
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Post("create")
  async create(@Body() CreateOrderDto: CreateOrderDto):Promise<Object> {
    return this.ordersService.create(CreateOrderDto);
  }


}
