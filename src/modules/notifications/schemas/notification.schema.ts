import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type NotificationDocument = HydratedDocument<Notification>;

@Schema()
export class Notification {
  @Prop({ required: true })
  message: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  channel: string;

  @Prop({ required: true })
  userName: string;

  @Prop({ required: true })
  userEmail: string;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
