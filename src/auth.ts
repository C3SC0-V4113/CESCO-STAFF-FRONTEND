import NextAuth, { type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import API from "./app/api/api.services";
import { object, string } from "zod";
import { JWT } from "next-auth/jwt";
import { redirect } from "next/navigation";

declare module "next-auth/jwt" {
  interface JWT {
    uid?: string;
    name: String;
    token: string;
  }
}

declare module "next-auth" {
  interface User {
    uid: string;
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
    };
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      authorize: async (credentials) => {
        const signInSchema = object({
          email: string({ required_error: "Email is required" })
            .min(1, "Email is required")
            .email("Invalid email"),
          password: string({ required_error: "Password is required" })
            .min(1, "Password is required")
            .min(8, "Password must be more than 8 characters")
            .max(32, "Password must be less than 32 characters"),
        });

        try {
          const parsedCredentials = signInSchema.safeParse(credentials);

          if (!parsedCredentials.success) {
            console.log("Invalid credentials");
            return null;
          }

          const { email, password } = parsedCredentials.data;

          const user = await API.auth.login(email, password);
          console.log("USUARIO");
          console.log(user);

          if (!user) {
            // No user found, so this is their first attempt to login
            // meaning this is also the place you could do registration
            return null;
          }

          return {
            id: user.uid,
            name: user.name,
            token: user.token,
          } as any;
        } catch (error) {
          if (error) {
            // Return `null` to indicate that the credentials are invalid
            return null;
          }
        }
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        (token.uid = user.id), (token.name = user.name as string);
        token.token = user.token;
      }
      console.log("HOLA TOKEN");
      console.log(token);
      return token;
    },
    async session({ session, token }) {
      session.user = {
        uid: token.uid as string,
        name: token.name as string,
        token: token.token as string,
      } as any;
      console.log("Hola Sesión");
      console.log(session);

      return session;
    },

    authorized({ request: { nextUrl }, auth }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }
      return true;
    },
  },
});
