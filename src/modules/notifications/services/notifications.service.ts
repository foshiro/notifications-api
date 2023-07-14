import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersRepository } from 'src/modules/users/repositories/users.repository';
import { User, UserDocument } from 'src/modules/users/schemas/user.schema';
import {
  CreateNotificationDto,
  CreateNotificationInputDto,
} from '../dto/create-notification.dto';
import { NotificationsRepository } from '../repositories/notifications.repository';
import {
  Notification,
  NotificationDocument,
} from '../schemas/notification.schema';

@Injectable()
export class NotificationsService {
  public readonly notificationsRepository: NotificationsRepository;
  public readonly usersRepository: UsersRepository;
  constructor(
    @InjectModel(Notification.name)
    private readonly notificationModel: Model<NotificationDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {
    this.notificationsRepository = new NotificationsRepository(
      notificationModel,
    );
    this.usersRepository = new UsersRepository(userModel);
  }

  async createNotification(
    createNotificationDto: CreateNotificationInputDto,
  ): Promise<void> {
    const users = await this.usersRepository.getAll();
    for (const user of users) {
      for (const channel of user.channels) {
        if (user.subscribed.includes(createNotificationDto.category)) {
          await this.notificationsRepository.create(
            this.getNotificationDTO(createNotificationDto, user, channel),
          );
        }
      }
    }
  }

  async findAll(): Promise<Notification[]> {
    return this.notificationsRepository.findAll();
  }

  private getNotificationDTO(
    dto: CreateNotificationInputDto,
    user: User,
    channel: string,
  ): CreateNotificationDto {
    return {
      message: dto.message,
      category: dto.category,
      channel: channel,
      userName: user.name,
      userEmail: user.email,
    };
  }
}
