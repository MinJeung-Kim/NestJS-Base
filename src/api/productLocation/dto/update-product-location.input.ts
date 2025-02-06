import { CreateProductLocationInput } from './create-product-location.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateProductLocationInput extends PartialType(
  CreateProductLocationInput,
) {
  @Field(() => Int)
  id: number;
}
