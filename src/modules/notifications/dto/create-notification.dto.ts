import { IsNotEmpty } from 'class-validator';

export class CreateNotificationInputDto {
  @IsNotEmpty()
  message: string;
  @IsNotEmpty()
  category: string;
}

export class CreateNotificationDto extends CreateNotificationInputDto {
  channel: string;
  userName: string;
  userEmail: string;
}

export enum CategoryType {
  sports = 'sports',
  finance = 'finance',
  films = 'films',
}

export enum ChannelType {
  sms = 'sms',
  email = 'email',
  push = 'push',
}
