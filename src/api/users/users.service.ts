import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findOneByEmail(email: string) {
    const user = await this.usersRepository.findOne({
      where: { email },
    });

    return user;
  }

  async create(createUserInput: CreateUserInput): Promise<User> {
    const { password, email } = createUserInput;
    const user = await this.findOneByEmail(email);

    if (user) {
      throw new ConflictException('이미 존재하는 이메일입니다.');
    }

    const hash = await bcrypt.hash(password, 10);

    return this.usersRepository.save({ ...createUserInput, password: hash });
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne({ id }: { id: string }) {
    const user = this.usersRepository.findOne({ where: { id } });
    return user;
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
