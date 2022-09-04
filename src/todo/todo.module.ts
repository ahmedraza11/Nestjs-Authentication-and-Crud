import { UserModule } from './../user/user.module';
import { TodoRespository } from './repo/todo.repository';
import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TodoRespository]), UserModule],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
