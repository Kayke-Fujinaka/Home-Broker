import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma/prisma.service';

@Injectable()
export class WalletsService {
  constructor(private prismaService: PrismaService) {}

  create(input: { id: string }) {
    return this.prismaService.wallet.create({
      data: {
        id: input.id,
      },
    });
  }
}
