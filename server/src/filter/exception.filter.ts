// Copied from: https://github.com/nestjs/nest/issues/232
import {Catch, ExceptionFilter, HttpException} from "@nestjs/common";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    public catch(err, host) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
    
      let message;
      let status;
       if (err instanceof HttpException) {
           status = err.getStatus();
           message = err.getResponse;
       } else {
           status = 500;
           message = 'Internal error';
       }

       return response.status(status).json({message, status});
    }
}