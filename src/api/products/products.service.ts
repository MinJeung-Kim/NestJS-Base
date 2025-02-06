import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductLocationService } from '../productLocation/productLocation.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    private readonly productLocationService: ProductLocationService,
  ) {}

  async create(createProductInput: CreateProductInput): Promise<Product> {
    // 상품과 상품거래 위치를 같이 등록하는 로직을 추가

    const { productLocation, ...productRest } = createProductInput;

    const result = await this.productLocationService.create(productLocation);

    // 상품 저장과 위지 저장
    const product = this.productsRepository.save({
      ...productRest,
      productLocation: result,
    });

    return product;
  }

  findAll(): Promise<Product[]> {
    return this.productsRepository.find({ relations: ['productLocation'] });
  }

  async findOne(id: string): Promise<Product | null> {
    const product = await this.productsRepository.findOne({
      where: { id },
      relations: ['productLocation'],
    });

    if (!product) {
      throw new NotFoundException('존재하지 않는 ID 입니다!');
    }

    return product;
  }

  async update(
    id: string,
    updateProductInput: UpdateProductInput,
  ): Promise<Product> {
    const product = await this.findOne(id);

    if (product) {
      this.checkSoldOut(product);
    }

    const result = this.productsRepository.save({
      ...product,
      ...updateProductInput,
    });

    return result;
  }

  checkSoldOut(product: Product): void {
    if (product.isSoldOut) {
      throw new UnprocessableEntityException('이미 판매된 상품입니다!');
    }
  }

  async remove(id: string): Promise<boolean> {
    // 1. 실제 삭제
    // const product = await this.productsRepository.delete(id);
    // return product.affected ? true : false;

    // 2. 소프트 삭제 (isDeleted) - 조회 시, isDeleted가 true인 데이터는 조회되지 않도록 처리
    // const product = await this.productsRepository.update(id, { isDeleted: true });

    // 3. 소프트 삭제 (deletedAt) - 조회 시, deletedAt이 null인 데이터만 조회되도록 처리
    // null이면 삭제 안된거 null이 아니면 삭제된거
    // const product = await this.productsRepository.update(id, {
    //   deletedAt: new Date(),
    // });

    // 4. 소프트 삭제 TypeORM 제공 기능 (softRemove) - 조회 시, isDeleted가 true인 데이터는 조회되지 않도록 알아서 처리
    // 장점 : 여러 id를 한번에 삭제 가능 - softRemove([id1, id2, id3])
    // 단점 : id로만 삭제 가능 - softRemove({ id, name }) 이런식으로 조건을 걸 수 없음
    // const remove = await this.productsRepository.softRemove({ id });

    // 5. 소프트 삭제 TypeORM 제공 기능 (softDelete) - 조회 시, deletedAt이 null인 데이터만 조회되도록 알아서 처리
    // 장점 : 다른 컬럼으로도 삭제 가능
    // 단점 : 여러 id를 한번에 삭제 불가능
    const dele = await this.productsRepository.softDelete({ id });
    return dele.affected ? true : false;
  }
}
