import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Auth {
  @Field(() => String)
  email: string;

  @Field(() => String)
  accessToken: string;
}
