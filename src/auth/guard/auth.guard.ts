import { Constants } from './../../utils/constants';
import { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();

    if (Constants.BY_PASS_URLS.includes(request.url)) return true;

    return super.canActivate(context);
  }
}
