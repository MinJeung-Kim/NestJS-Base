import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductLocationService } from '../productLocation/productLocation.service';
import { ProductLocation } from '../productLocation/entities/productLocation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductLocation])],
  providers: [ProductsResolver, ProductsService, ProductLocationService],
})
export class ProductsModule {}
