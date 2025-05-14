import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDTO) {
    const newUser = this.userRepository.create(createUserDto);

    return await this.userRepository.save(newUser);
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: string) {
    try {
      return await this.userRepository.findOne({ where: { id } });
    } catch (Err) {
      throw new NotFoundException('Usuário não encontrado');
    }
  }

  async findOneByUsername(username: string) {
    const user = await this.userRepository.findOne({ where: { username } });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    return user;
  }

  async updateRtHash(userId: string, hash: string) {
    const user = await this.findOne(userId);

    if (user) {
      user.hashedRt = hash;
    }

    return await this.userRepository.save(user!);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
