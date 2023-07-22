import { hashPassword } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method == "POST") {
    const { email, password }: { email: string; password: string } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !password ||
      password.trim().length < 7
    ) {
      res.status(422).json({ message: "Invalid input - password < 7" });
      return;
    }

    const client = await connectDB();

    const db = client.db();

    const existingUser = await db.collection("users").findOne({ email: email });

    if (existingUser) {
      res.status(422).json({ message: "User already exists!" });
      client.close();
      return;
    }

    const hashedPassword = await hashPassword(password);

    const result = await db
      .collection("users")
      .insertOne({ email, password: hashedPassword });

    res.status(201).json({ message: "Created user!" });
    client.close();
  }
}
