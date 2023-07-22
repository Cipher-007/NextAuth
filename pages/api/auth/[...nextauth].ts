import { verifyPassword } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "User",
      credentials: {
        email: { label: "Email", type: "email " },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const client = await connectDB();

        const usersCollections = client.db().collection("users");
        const user = await usersCollections.findOne({
          email: credentials?.email,
        });

        if (!user) {
          client.close();
          throw new Error("No user found!");
        }

        const isValid = await verifyPassword(
          credentials!.password,
          user.password,
        );

        if (!isValid) {
          client.close();
          throw new Error("Couldn't log you in");
        }
        client.close();

        return {
          id: "s",
          email: user.email,
        };
      },
    }),
  ],
};

export default NextAuth(authOptions);
