import { Module } from '@nestjs/common';
import { ProductLocationService } from './productLocation.service';
import { ProductLocationResolver } from './productLocation.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductLocation } from './entities/productLocation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductLocation]), // Repository를 등록
  ],
  providers: [ProductLocationResolver, ProductLocationService],
})
export class ProductLocationModule {}
