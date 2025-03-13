import { PrismaClient } from "@prisma/client";
import NextAuth, { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/signin",
  },
  trustHost: true,
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const { email, password } = credentials satisfies unknown as {
          email: string;
          password: string;
        };

        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (!user || !user.password) {
          throw new Error("Invalid email or password");
        }

        const match = await bcrypt.compare(password as string, user.password);

        if (match) {
          return user as unknown as User;
        }

        throw new Error("Invalid email or password");
      },
    }),
  ],
});
