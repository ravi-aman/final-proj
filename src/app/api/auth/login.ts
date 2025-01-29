import { NextApiRequest, NextApiResponse } from "next";
import { loginUser } from "../../../controllers/authController";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        await loginUser(req, res);
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}
