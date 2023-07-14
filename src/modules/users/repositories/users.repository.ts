import { Model } from 'mongoose';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { User, UserDocument } from '../schemas/user.schema';

export class UsersRepository {
  private readonly logger = new Logger(UsersRepository.name);
  constructor(private model: Model<UserDocument>) {}

  async getAll(): Promise<User[]> {
    try {
      return this.model.find().exec();
    } catch (err) {
      this.logger.error(`Failed to get all users. Error: ${err}`);
      throw new InternalServerErrorException(`Failed to get all users.`);
    }
  }

  async create(entity: User): Promise<User> {
    let result: User;
    try {
      result = await this.model.create(entity);
    } catch (err) {
      this.logger.error(`Failed to create user. Error: ${err}`);
      throw new InternalServerErrorException(
        `Failed to create user with body: ${entity}`,
      );
    }
    return result;
  }
}
