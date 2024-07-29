import { Injectable } from '@nestjs/common';
import { NotificationRepository } from './notification.repository';
import { NotificationChannelEnum } from 'src/enums';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';

@Injectable()
export class NotificationService {
  public constructor(
    public readonly notificationRepository: NotificationRepository,
    @InjectQueue('notifications') private notificationQueue: Queue,
  ) {}
  public async send(
    recipient: string,
    method: NotificationChannelEnum,
    message: string,
    flightId?: number,
  ): Promise<void> {
    const notificationData = this.notificationRepository.create({
      recipient,
      method,
      message,
      flightId,
    });
    await this.notificationRepository.insert(notificationData);
    method === NotificationChannelEnum.EMAIL &&
      this.notificationQueue.add('sendEmail', {
        recipient,
        subject: 'Account Registration',
        message,
      });
    method === NotificationChannelEnum.SMS &&
      this.notificationQueue.add('sendSMS', {
        recipient,
        message,
      });
  }
}
