import { NextApiRequest, NextApiResponse } from "next";
import { getAllTodos, createTodo } from "../../../controllers/todoController";
import authMiddleware from "../../../middlewares/authMiddleware";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await authMiddleware(req, res); // Ensures user is authenticated

    if (req.method === "GET") {
        await getAllTodos(req, res);
    } else if (req.method === "POST") {
        await createTodo(req, res);
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}
