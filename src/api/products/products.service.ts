import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  create(createProductInput: CreateProductInput): Promise<Product> {
    const product = this.productsRepository.save(createProductInput);
    return product;
  }

  findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  async findOne(id: string): Promise<Product | null> {
    const product = await this.productsRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException('존재하지 않는 ID 입니다!');
    }

    return product;
  }

  async update(id: string, updateProductInput: UpdateProductInput) {
    const product = await this.productsRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException('존재하지 않는 ID 입니다!');
    }

    return this.productsRepository.update(id, updateProductInput);
  }

  remove(id: string) {
    return `This action removes a #${id} product`;
  }
}
