import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  Req,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Request } from 'express';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

@Controller('todo')
@ApiTags('Todo')
@ApiSecurity('JWT_auth')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post(':userId')
  create(
    @Body(ValidationPipe) createTodoDto: CreateTodoDto,
    @Param('userId') userId: number,
  ) {
    return this.todoService.create(createTodoDto, userId);
  }

  @Get('findAllNotCompleted/:userId')
  findAllTodosByUserIdNotCompleted(
    @Param('userId') userId: number,
    @Req() req: Request,
  ) {
    return this.todoService.findAllTodosByUserNotCompleted(userId);
  }

  @Get('findAllCompleted/:userId')
  findAllTodosByUserIdCompleted(@Param('userId') userId: number) {
    return this.todoService.findAllTodosByUserCompleted(userId);
  }

  @Patch(':id')
  update(@Param('id') id: number) {
    return this.todoService.update(Number(id));
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.todoService.remove(Number(id));
  }
}
