import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { PrismaClientInitializationError, PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Catch(PrismaClientInitializationError, PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: PrismaClientInitializationError | PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    
    // In test mode, return service unavailable for database errors
    if (process.env.NODE_ENV === 'test') {
      console.warn('Database operation failed in test mode:', exception.message);
      
      response.status(HttpStatus.SERVICE_UNAVAILABLE).json({
        success: false,
        data: null,
        error: 'Database service temporarily unavailable during testing',
        statusCode: HttpStatus.SERVICE_UNAVAILABLE,
        timestamp: new Date().toISOString(),
      });
      return;
    }
    
    // In production, handle specific Prisma errors
    if (exception instanceof PrismaClientKnownRequestError) {
      switch (exception.code) {
        case 'P2002':
          response.status(HttpStatus.CONFLICT).json({
            success: false,
            data: null,
            error: 'A record with this data already exists',
            statusCode: HttpStatus.CONFLICT,
          });
          break;
        case 'P2025':
          response.status(HttpStatus.NOT_FOUND).json({
            success: false,
            data: null,
            error: 'Record not found',
            statusCode: HttpStatus.NOT_FOUND,
          });
          break;
        default:
          response.status(HttpStatus.BAD_REQUEST).json({
            success: false,
            data: null,
            error: 'Database operation failed',
            statusCode: HttpStatus.BAD_REQUEST,
          });
      }
    } else {
      // PrismaClientInitializationError
      response.status(HttpStatus.SERVICE_UNAVAILABLE).json({
        success: false,
        data: null,
        error: 'Database connection failed',
        statusCode: HttpStatus.SERVICE_UNAVAILABLE,
      });
    }
  }
}