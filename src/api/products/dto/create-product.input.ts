import { InputType, Int, Field } from '@nestjs/graphql';
import { Min } from 'class-validator';
import { ProductLocationInput } from 'src/api/productLocation/dto/product-location.input';

@InputType()
export class CreateProductInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Min(0)
  @Field(() => Int)
  price: number;

  @Field(() => ProductLocationInput)
  productLocation: ProductLocationInput;
}
