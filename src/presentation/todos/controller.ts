import { Request, Response } from "express";

const todo = [
  { id: 1, task: "Learn TypeScript", createAt: new Date() },
  { id: 2, task: "Learn Node.js", createAt: null },
  { id: 3, task: "Learn Express", createAt: new Date() },
];

export class TodosController {
  constructor() {}
  public getTodos = (req: Request, res: Response) => {
    return res.json(todo);
  };

  public getTodoById = (req: Request, res: Response) => {
    const { id } = req.params;
    const foundTodo = todo.find((t) => t.id === Number(id));
    if (!foundTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    return res.status(200).json(foundTodo);
  };
  public createTodo = (req: Request, res: Response) => {
    const body = req.body;
    return res.status(201).json(body);
  };
}
