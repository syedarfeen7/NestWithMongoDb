import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = 500;
    let message = 'Internal Server Error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();

      const errorResponse = exception.getResponse();
      message =
        typeof errorResponse === 'object' && errorResponse !== null
          ? (errorResponse as any).message || 'Bad Request'
          : exception.message;
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    response.status(status).json({
      success: false,
      statusCode: status,
      message,
    });
  }
}
