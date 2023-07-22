import { hashPassword, verifyPassword } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "PATCH") {
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ message: "Not Authenticated!" });
    return;
  }

  const userEmail = session.user?.email;

  const oldPassword = req.body.oldPassword as string;
  const newPassword = req.body.newPassword as string;

  const client = await connectDB();
  const usersCollection = client.db().collection("users");

  const user = await usersCollection.findOne({ email: userEmail });

  if (!user) {
    res.status(404).json({ message: "User not found." });
    client.close();
    return;
  }

  const oldhashedPassword = user.password;

  const passwordsAreEqual = await verifyPassword(
    oldPassword,
    oldhashedPassword,
  );

  if (!passwordsAreEqual) {
    res.status(403).json({ message: "Invalid Password." });
    client.close();
    return;
  }

  const newHashedPassword = await hashPassword(newPassword);

  const result = await usersCollection.updateOne(
    { email: userEmail },
    { $set: { password: newHashedPassword } },
  );

  client.close();
  res.status(200).json({ message: "Password Updated!" });
}
