import { Todo } from '../entities/todo.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Todo)
export class TodoRespository extends Repository<Todo> {}
