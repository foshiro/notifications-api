import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersRepository } from 'src/modules/users/repositories/users.repository';
import { User, UserDocument } from 'src/modules/users/schemas/user.schema';

@Injectable()
export class UsersService {
  public readonly usersRepository: UsersRepository;
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {
    this.usersRepository = new UsersRepository(userModel);
  }

  async onModuleInit() {
    try {
      const res = await this.usersRepository.getAll();
      if (res.length === 0) {
        let user = await this.usersRepository.create({
          id: '1',
          email: 'john@test.com',
          name: 'John',
          phone: '123123',
          channels: ['sms', 'email'],
          subscribed: ['sports', 'finance', 'films'],
        });
        console.log(user);
        user = await this.usersRepository.create({
          id: '2',
          email: 'maria@test.com',
          name: 'Maria',
          phone: '99192',
          channels: ['email'],
          subscribed: ['sports', 'finance'],
        });
        console.log(user);
        user = await this.usersRepository.create({
          id: '3',
          email: 'bill@test.com',
          name: 'Bill',
          phone: '838833',
          channels: ['sms', 'email', 'push'],
          subscribed: ['films'],
        });
        console.log(user);
      }
    } catch (error) {
      throw error;
    }
  }
}
