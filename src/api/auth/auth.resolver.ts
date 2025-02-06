import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { LoginInput } from './dto/login.input';
import { IContext } from 'src/common/interfaces/context';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Auth)
  login(
    @Args('loginInput') loginInput: LoginInput,
    @Context() context: IContext,
  ): Promise<Auth> {
    return this.authService.login(loginInput, context);
  }
}
