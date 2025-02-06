import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateProductLocationInput } from './dto/update-product-location.input';
import { ProductLocation } from './entities/productLocation.entity';
import { ProductLocationInput } from './dto/product-location.input';

@Injectable()
export class ProductLocationService {
  constructor(
    @InjectRepository(ProductLocation)
    private readonly productLocationRepository: Repository<ProductLocation>,
  ) {}

  create(productLocation: ProductLocationInput): Promise<ProductLocation> {
    const result = this.productLocationRepository.save(productLocation);
    return result;
  }

  findAll() {
    return `This action returns all ProductLocation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ProductLocation`;
  }

  update(id: number, updateProductLocationInput: UpdateProductLocationInput) {
    return `This action updates a #${id} ProductLocation`;
  }

  remove(id: number) {
    return `This action removes a #${id} ProductLocation`;
  }
}
