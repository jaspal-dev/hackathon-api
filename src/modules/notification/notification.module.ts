import { Module } from '@nestjs/common';
import { NotificationRepository } from './notification.repository';
import { NotificationService } from './notification.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './notification.entity';
import { NotificationConsumer } from './notification.consumer';
import { BullModule } from '@nestjs/bullmq';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Notification]),
    BullModule.registerQueue({
      name: 'notifications',
    }),
    ConfigModule,
  ],
  providers: [
    NotificationRepository,
    NotificationService,
    NotificationConsumer,
  ],
  exports: [NotificationService, NotificationConsumer, BullModule],
})
export class NotificationModule {}
