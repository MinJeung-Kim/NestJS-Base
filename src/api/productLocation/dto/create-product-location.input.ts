import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateProductLocationInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
