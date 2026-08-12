import { TodoDatasource } from "../../domain/datasources/todo.datasource";
import { CreateTodoDto } from "../../domain/dtos/todos/create-todo.dto";
import { TodoEntity } from "../../domain/entities/todo.entity";

export class TodoDataSourceImp implements TodoDatasource {
  create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    throw new Error("Method not implemented.");
  }
  getAll(): Promise<TodoEntity[]> {
    throw new Error("Method not implemented.");
  }
  findById(id: number): Promise<TodoEntity | null> {
    throw new Error("Method not implemented.");
  }
  updateById(updateTodoDto: CreateTodoDto): Promise<TodoEntity | null> {
    throw new Error("Method not implemented.");
  }
  deleteById(id: number): Promise<TodoEntity> {
    throw new Error("Method not implemented.");
  }
}
