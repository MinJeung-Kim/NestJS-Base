import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductLocationService } from '../productLocation/productLocation.service';
import { ProductLocation } from '../productLocation/entities/productLocation.entity';
import { Tag } from '../tags/entities/tag.entity';
import { TagsService } from '../tags/tags.service';
import { ProductSubscriber } from './entities/product.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductLocation, Tag])],
  providers: [
    ProductSubscriber,
    ProductsResolver,
    ProductsService,
    ProductLocationService,
    TagsService,
  ],
})
export class ProductsModule {}
