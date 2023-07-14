import { Model } from 'mongoose';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import {
  Notification,
  NotificationDocument,
} from '../schemas/notification.schema';
import { CreateNotificationDto } from '../dto/create-notification.dto';

export class NotificationsRepository {
  private readonly logger = new Logger(NotificationsRepository.name);
  constructor(private model: Model<NotificationDocument>) {}

  async create(entity: CreateNotificationDto): Promise<Notification> {
    let result: NotificationDocument;
    try {
      result = await this.model.create(entity);
    } catch (err) {
      this.logger.error(`Failed to send notification. Error: ${err}`);
      throw new InternalServerErrorException(
        `Failed to send notification with body: ${entity}`,
      );
    }
    return result;
  }

  async findAll(): Promise<Notification[]> {
    try {
      return await this.model.find().exec();
    } catch (err) {
      this.logger.error(`Failed to get all notifications. Error: ${err}`);
      throw new InternalServerErrorException(`Failed to get all notifications`);
    }
  }
}
