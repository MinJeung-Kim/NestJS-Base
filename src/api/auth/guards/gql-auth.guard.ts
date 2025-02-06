import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

// graphql에서 들어오는 토큰은 restAPI방식 처럼 변경해줘야함
export class GqlAuthAccessGuard extends AuthGuard('jwt-access') {
  getRequest(context: ExecutionContext) {
    const gqlCtx = GqlExecutionContext.create(context);
    return gqlCtx.getContext().req;
  }
}
