import axios from "axios";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Credentials } from "../../types/credentials";
import axiosInstance from "../axios.config";
import { AuthResponse, ErrorResponse } from "@/types/apiResponses";

export const authConfig: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Credentials) {
        if (!credentials) {
          throw new Error("Credentials not provided");
        }
        try {
          const res = await axiosInstance.post<AuthResponse>("/auth", {
            email: credentials!.email,
            password: credentials!.password,
          });
          if (res.data.ok) {
            const user = res.data;
            return {
              uid: user.uid,
              name: user.name,
              token: user.token,
            };
          } else {
            throw new Error(res.data.msg || "Login failed");
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            const axiosError = error.response?.data as ErrorResponse;
            throw new Error(axiosError.msg || "Login failed");
          }
          throw new Error("Login failed");
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.uid;
        token.name = user.name;
        token.token = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.name = token.name!;
      session.user.token = token.token as string;
      return session;
    },
  },
};

export default NextAuth(authConfig);
