import { NextApiRequest, NextApiResponse } from "next";
import { logoutUser } from "../../../controllers/authController";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        await logoutUser(req, res);
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}
