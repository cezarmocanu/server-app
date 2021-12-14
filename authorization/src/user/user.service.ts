import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUserDTO } from 'src/authorization/dto/register.dto';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { LoginUserDTO } from 'src/authorization/dto/login.dto copy';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  async fromRegisterUserDTO(dto: RegisterUserDTO): Promise<User> {
    const hash: string = await bcrypt.hash(dto.password, 10);
    return this.usersRepo.create({
      email: dto.email,
      password: hash,
      firstName: dto.firstName,
      lastName: dto.lastName,
    });
  }

  async checkUserLoginPassword(
    dto: LoginUserDTO,
    user: User,
  ): Promise<boolean> {
    return await bcrypt.compare(dto.password, user.password);
  }

  async findUserByEmail(email: String): Promise<User | null> {
    return await this.usersRepo.findOne({
      where: { email },
    });
  }

  async saveUser(user: User): Promise<User | null> {
    const existingUser: User | null = await this.findUserByEmail(user.email);
    if (existingUser) {
      return null;
    }

    return await this.usersRepo.save(user);
  }
}
