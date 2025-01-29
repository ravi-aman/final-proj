import { NextApiRequest, NextApiResponse } from "next";
import { getTodoById, updateTodo, deleteTodo } from "../../../controllers/todoController";
import authMiddleware from "../../../middlewares/authMiddleware";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await authMiddleware(req, res);

    const { id } = req.query;

    if (req.method === "GET") {
        await getTodoById(req, res, id as string);
    } else if (req.method === "PUT") {
        await updateTodo(req, res, id as string);
    } else if (req.method === "DELETE") {
        await deleteTodo(req, res, id as string);
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}
