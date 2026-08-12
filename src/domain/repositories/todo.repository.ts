import { CreateTodoDto } from "../dtos/todos/create-todo.dto";
import { TodoEntity } from "../entities/todo.entity";

export abstract class TodoRepository {
  abstract create(createTodoDto: CreateTodoDto): Promise<TodoEntity>;
  abstract getAll(): Promise<TodoEntity[]>;
  abstract findById(id: number): Promise<TodoEntity | null>;
  abstract updateById(updateTodoDto: CreateTodoDto): Promise<TodoEntity | null>;
  abstract deleteById(id: number): Promise<TodoEntity>;
}
