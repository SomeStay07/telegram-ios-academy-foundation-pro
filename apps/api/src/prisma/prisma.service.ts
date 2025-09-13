import { Injectable, INestApplication, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    try {
      await this.$connect();
    } catch (error) {
      if (process.env.NODE_ENV === 'test') {
        console.warn('Database connection failed in test mode, continuing without DB:', (error as Error).message);
        return;
      }
      throw error;
    }
  }
  
  async onModuleDestroy() { 
    await this.$disconnect(); 
  }
  
  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit' as never, async () => { 
      await app.close(); 
    });
  }
}