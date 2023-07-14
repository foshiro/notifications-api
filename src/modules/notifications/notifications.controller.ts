import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateNotificationInputDto } from './dto/create-notification.dto';
import { Notification } from './schemas/notification.schema';
import { NotificationsService } from './services/notifications.service';

@Controller('/notification')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  sendNotification(@Body() notification: CreateNotificationInputDto) {
    return this.notificationsService.createNotification(notification);
  }

  @Get()
  async findAll(): Promise<Notification[]> {
    return this.notificationsService.findAll();
  }
}
