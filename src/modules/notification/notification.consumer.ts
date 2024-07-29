import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { NotificationService } from './notification.service';
import axios from 'axios';
import { createTransport } from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Processor('notifications')
export class NotificationConsumer extends WorkerHost {
  public constructor(
    public readonly NotificationService: NotificationService,
    public readonly configService: ConfigService,
  ) {
    super();
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async process(job: Job<any, any, string>): Promise<void> {
    switch (job.name) {
      case 'sendSMS':
        await this.sendSMS(job.data.recipient, job.data.message);
        return;
      case 'sendEmail':
        await this.sendEmail(
          job.data.recipient,
          job.data.subject,
          job.data.message,
        );
        return;
    }
  }

  public async sendSMS(recipient: string, message: string): Promise<void> {
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

  public async sendEmail(
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
        user: this.configService.get<string>('nodemailer.user'),
        pass: this.configService.get<string>('nodemailer.pass'),
      },
    });
    const mailOptions = {
      from: this.configService.get<string>('nodemailer.user'),
      to: recipient,
      subject,
      text: message,
    };
    await transporter.sendMail(mailOptions);
  }
}
