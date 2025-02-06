import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductLocationService } from './productLocation.service';
import { ProductLocation } from './entities/productLocation.entity';
import { UpdateProductLocationInput } from './dto/update-product-location.input';
import { ProductLocationInput } from './dto/product-location.input';

@Resolver(() => ProductLocation)
export class ProductLocationResolver {
  constructor(
    private readonly productLocationService: ProductLocationService,
  ) {}

  @Mutation(() => ProductLocation)
  createProductLocation(
    @Args('productLocationInput')
    productLocationInput: ProductLocationInput,
  ) {
    return this.productLocationService.create(productLocationInput);
  }

  @Query(() => [ProductLocation], { name: 'productLocation' })
  findAll() {
    return this.productLocationService.findAll();
  }

  @Query(() => ProductLocation, { name: 'productLocation' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.productLocationService.findOne(id);
  }

  @Mutation(() => ProductLocation)
  updateProductLocation(
    @Args('updateProductLocationInput')
    updateProductLocationInput: UpdateProductLocationInput,
  ) {
    return this.productLocationService.update(
      updateProductLocationInput.id,
      updateProductLocationInput,
    );
  }

  @Mutation(() => ProductLocation)
  removeProductLocation(@Args('id', { type: () => Int }) id: number) {
    return this.productLocationService.remove(id);
  }
}
