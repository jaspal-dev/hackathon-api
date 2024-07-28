import { Injectable } from '@nestjs/common';
import { NotificationRepository } from './notification.repository';
import { NotificationChannelEnum } from 'src/enums';
import { createTransport } from 'nodemailer';
import axios from 'axios';

@Injectable()
export class NotificationService {
  public constructor(
    public readonly notificationRepository: NotificationRepository,
  ) {}
  public async send(
    recipient: string,
    method: NotificationChannelEnum,
    message: string,
    flightId?: string,
  ): Promise<void> {
    const notificationData = this.notificationRepository.create({
      recipient,
      method,
      message,
      flightId,
    });
    await this.notificationRepository.insert(notificationData);
    method === NotificationChannelEnum.EMAIL &&
      (await this.sendEmail(recipient, 'Account Registration', message));
    method === NotificationChannelEnum.SMS &&
      (await this.sendSMS(recipient, message));
  }

  private async sendEmail(
    recipient: string,
    subject: string,
    message: string,
  ): Promise<void> {
    const transporter = createTransport({
      service: 'Gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'jasi7003@gmail.com',
        pass: 'tyht redq qyxu nvki',
      },
    });
    const mailOptions = {
      from: 'jasi7003@gmail.com',
      to: recipient,
      subject,
      text: message,
    };
    await transporter.sendMail(mailOptions);
  }

  private async sendSMS(recipient: string, message: string): Promise<void> {
    await axios.post(
      'https://www.fast2sms.com/dev/bulkV2',
      {
        route: 'q',
        message: message,
        flash: 0,
        numbers: recipient,
      },
      {
        headers: {
          authorization:
            'oqht6HylUBgCjxnLJ9pOFKSMXuV5weAQiksGdmRz0EZfT2v1c75vYgiJGlz8Et2IwQmyrHNxhSXB0eaM',
          'Content-Type': 'application/json',
        },
      },
    );
  }
}
