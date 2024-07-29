import NextAuth, { type DefaultSession } from "next-auth";

declare module "next-auth/jwt" {
  interface JWT {
    uid?: string;
    name: String;
    token: string;
    role: string;
  }
}

declare module "next-auth" {
  interface User {
    uid: string;
    role: string;
    user: {
      email: string;
      password: string;
    } & DefaultSession["user"];
    token: string;
  }

  interface Session {
    user: {
      uid: string;
      name: string;
      token: string;
      role: string;
    };
  }
}
