import { Request, Response } from "express";

const todo = [
  { id: 1, text: "Learn TypeScript", createAt: new Date() },
  { id: 2, text: "Learn Node.js", createAt: null },
  { id: 3, text: "Learn Express", createAt: new Date() },
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
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Text is required" });
    }
    const newTodo = {
      id: todo.length + 1,
      text,
      createAt: null,
    };
    todo.push(newTodo);
    return res.status(201).json(newTodo);
  };

  public updateTodo = (req: Request, res: Response) => {
    const id = +req.params.id;
    const foundTodo = todo.find((t) => t.id === id);
    if (!foundTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ message: "Text is required" });
    }
    foundTodo.text = text;
    foundTodo.createAt = new Date();
    return res.status(200).json(foundTodo);
  };

  public deleteTodo = (req: Request, res: Response) => {
    const id = +req.params.id;
    const foundTodo = todo.find((t) => t.id === id);
    if (!foundTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    todo.splice(todo.indexOf(foundTodo), 1);
    return res.status(200).json(foundTodo);
  };
}
