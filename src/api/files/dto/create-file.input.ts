import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateFileInput {
  @Field(() => String)
  url: string;
}
