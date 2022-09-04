import { UserService } from './../user/user.service';
import { Todo } from './entities/todo.entity';
import { TodoRespository } from './repo/todo.repository';
import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoRespository)
    private todoRepository: TodoRespository,
    private userService: UserService,
  ) {}

  async create(createTodoDto: CreateTodoDto, userId: number) {
    let todo: Todo = new Todo();
    todo.title = createTodoDto.title;
    todo.date = new Date().toLocaleString();
    todo.completed = false;
    todo.user = await this.userService.findUserById(userId);

    return this.todoRepository.save(todo);
  }

  findAllTodosByUserNotCompleted(userId: number) {
    return this.todoRepository.find({
      relations: ['user'],
      where: { user: { id: userId }, completed: false },
    });
  }

  findAllTodosByUserCompleted(userId: number) {
    return this.todoRepository.find({
      relations: ['user'],
      where: { user: { id: userId }, completed: true },
    });
  }

  update(todoId: number) {
    return this.todoRepository.update(todoId, { completed: true });
  }

  remove(todoId: number) {
    return this.todoRepository.delete(todoId);
  }
}
