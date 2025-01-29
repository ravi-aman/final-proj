import { NextApiRequest, NextApiResponse } from "next";
import Todo from "../models/todo";

export const getAllTodos = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const todos = await Todo.find({ userId: req.user.id });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
};

export const createTodo = async (req: NextApiRequest, res: NextApiResponse) => {
  const { title } = req.body;

  try {
    const todo = new Todo({
      title,
      userId: req.user.id,
      completed: false,
    });
    await todo.save();

    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ error: "Failed to create todo" });
  }
};

// Similar functions for getTodoById, updateTodo, and deleteTodo...
