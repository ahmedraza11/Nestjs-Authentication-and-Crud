import { Constants } from './../utils/constants';
import { User } from './entities/user.entity';
import { UserRepository } from './repo/user.repository';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRespository: UserRepository,
  ) {}

  create(createUserDto: CreateUserDto) {
    const user: User = new User();
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    user.role = Constants.ROLES.NORMAL_ROLE;

    return this.userRespository.save(user);
  }

  findAll() {
    return this.userRespository.find();
  }

  findUserById(id: number) {
    return this.userRespository.findOneOrFail({ where: { id } });
  }

  findUserByEmail(email: string) {
    return this.userRespository.findOne({ where: { email } });
  }

  remove(id: number) {
    return this.userRespository.delete(id);
  }
}
