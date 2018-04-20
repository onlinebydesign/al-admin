// Copied from: https://github.com/nestjs/nest/issues/232
import {Catch, ExceptionFilter} from "@nestjs/common";
import {HttpException} from "@nestjs/core";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    public catch(err, res) {
      let message;
      let status;
       if (err instanceof HttpException) {
           status = err.getStatus();
           message = err.getResponse;
       } else {
           status = 500;
           message = 'Internal error';
       }

       return res.status(status).json({message, status});
    }
}