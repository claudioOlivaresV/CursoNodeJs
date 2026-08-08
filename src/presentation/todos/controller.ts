import { Request, Response } from "express";
import { prisma } from "../../data/postges";
import { CreateTodoDto } from "../../domain/dtos/todos/create-todo.dto";
import { UpdateTodoDto } from "../../domain/dtos/todos/update-todo.dto";

export class TodosController {
  constructor() {}
  public getTodos = async (req: Request, res: Response) => {
    try {
      const todos = await prisma.todo.findMany();
      return res.json(todos);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  public getTodoById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const todoId = Number(id);

    if (isNaN(todoId)) {
      return res.status(400).json({
        error: "El id debe ser un número",
      });
    }

    try {
      const foundTodo = await prisma.todo.findFirst({
        where: {
          id: todoId,
        },
      });
      if (!foundTodo) {
        return res.status(404).json({ message: "Todo not found" });
      }
      return res.status(200).json(foundTodo);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);
    if (error) {
      return res.status(400).json({ error });
    }
    try {
      const todo = await prisma.todo.create({
        data: createTodoDto!,
      });
      return res.status(201).json(todo);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  public updateTodo = async (req: Request, res: Response) => {
    const { id } = req.params;

    const [error, updateTodoDto] = UpdateTodoDto.create({
      id,
      ...req.body,
    });

    if (error) {
      return res.status(400).json({ error });
    }
    try {
      const foundTodo = await prisma.todo.findFirst({
        where: {
          id: updateTodoDto!.id,
        },
      });
      if (!foundTodo) {
        return res.status(404).json({ message: "Todo not found" });
      }

      const updateTodo = await prisma.todo.update({
        where: {
          id: updateTodoDto!.id,
        },
        data: {
          text: updateTodoDto!.text,
          completedAt: updateTodoDto!.completedAt
            ? new Date(updateTodoDto!.completedAt)
            : null,
        },
      });
      return res.status(200).json(updateTodo);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  public deleteTodo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const todoId = Number(id);

    if (isNaN(todoId)) {
      return res.status(400).json({
        error: "El id debe ser un número",
      });
    }
    try {
      const foundTodo = await prisma.todo.findFirst({
        where: {
          id: todoId,
        },
      });
      if (!foundTodo) {
        return res.status(404).json({ message: "Todo not found" });
      }
      const deleted = await prisma.todo.delete({
        where: {
          id: todoId,
        },
      });
      return res.status(200).json(deleted);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
}
