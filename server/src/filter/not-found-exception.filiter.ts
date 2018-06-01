import * as path from 'path';
import { ExceptionFilter, Catch, NotFoundException, HttpException } from '@nestjs/common';

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: NotFoundException, host) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    response.sendFile(path.join(__dirname, '../../../client/dist/index.html'));
  }
}
