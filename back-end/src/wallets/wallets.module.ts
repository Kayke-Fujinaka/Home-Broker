import { Module } from '@nestjs/common';
import { WalletAssetsController } from './wallet-assets/wallet-assets.controller';
import { WalletAssetsService } from './wallet-assets/wallet-assets.service';
import { WalletsController } from './wallets.controller';
import { WalletsService } from './wallets.service';

@Module({
  controllers: [WalletsController, WalletAssetsController],
  providers: [WalletsService, WalletAssetsService],
})
export class WalletsModule {}
