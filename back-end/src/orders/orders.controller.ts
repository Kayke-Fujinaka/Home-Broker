import { Body, Controller, Post } from '@nestjs/common';
import { InitTransactionDto } from './order.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  initTransactionDto(@Body() body: InitTransactionDto) {
    return this.ordersService.initTransaction(body);
  }
}
