import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
    } else if (exception instanceof Error) {
      message = exception.message;
      
      // Specific handling for database/Prisma errors in test mode
      if (process.env.NODE_ENV === 'test' && this.isDatabaseError(exception)) {
        status = HttpStatus.SERVICE_UNAVAILABLE;
        message = 'Database service temporarily unavailable during testing';
        console.warn('Database operation failed in test mode:', exception.message);
      }
    }
    
    // Ensure we always return a proper HTTP response instead of crashing
    try {
      response.status(status).json({
        success: false,
        data: null,
        error: message,
        statusCode: status,
        timestamp: new Date().toISOString(),
      });
    } catch (responseError) {
      // If even response sending fails, log and try to end the response
      console.error('Failed to send error response:', responseError);
      if (!response.headersSent) {
        response.status(500).end('Internal server error');
      }
    }
  }
  
  private isDatabaseError(error: Error): boolean {
    const errorMessage = error.message.toLowerCase();
    const errorName = error.constructor.name.toLowerCase();
    
    return (
      errorMessage.includes('prisma') ||
      errorMessage.includes('database') ||
      errorMessage.includes('connection') ||
      errorMessage.includes('postgres') ||
      errorName.includes('prisma') ||
      errorName.includes('database') ||
      // Check for specific Prisma error patterns
      errorMessage.includes('can\'t reach database server') ||
      errorMessage.includes('connection refused') ||
      errorMessage.includes('connection timeout')
    );
  }
}