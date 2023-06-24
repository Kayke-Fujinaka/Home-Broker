import { Body, Controller, Post } from '@nestjs/common';
import { InitTransactionDto, InputExecuteTransactionDto } from './order.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  initTransaction(@Body() body: InitTransactionDto) {
    return this.ordersService.initTransaction(body);
  }

  @Post('execute')
  executeTransactionRest(@Body() body: InputExecuteTransactionDto) {
    return this.ordersService.executeTransaction(body);
  }
}
