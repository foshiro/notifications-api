import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  CategoryType,
  ChannelType,
} from 'src/modules/notifications/dto/create-notification.dto';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  phone: string;

  @Prop({ type: Array, enum: CategoryType })
  subscribed: string[];

  @Prop({ type: Array, enum: ChannelType })
  channels: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
