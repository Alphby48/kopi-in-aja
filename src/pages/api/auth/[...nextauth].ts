/* eslint-disable @typescript-eslint/no-explicit-any */
import { login } from "@/lib/firebase/service.login";
import { loginWithGoogle } from "@/lib/firebase/service.login.google";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 1,
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const user: any = await login({ email });

        if (user) {
          if (user.password === password) {
            return user;
          } else {
            return null;
          }
        } else {
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  callbacks: {
    async jwt({ token, account, user }: any) {
      if (account?.provider === "credentials") {
        token.email = user?.email;
        token.fullname = user?.fullname;
        token.role = user?.role;
      }

      if (account?.provider === "google") {
        const dataLogin = {
          email: user?.email,
          fullname: user?.name,
          role: "member",
          type: "google",
          image: user?.image,
        };
        await loginWithGoogle(dataLogin, (call: any) => {
          if (call.status) {
            token.email = call.data.email;
            token.fullname = call.data.fullname;
            token.role = call.data.role;
            token.image = call.data.image;
          }
        });
      }

      return token;
    },
    async session({ session, token }: any) {
      if ("email" in token) {
        session.user.email = token.email;
      }
      if ("fullname" in token) {
        session.user.fullname = token.fullname;
      }
      if ("role" in token) {
        session.user.role = token.role;
      }
      if ("image" in token) {
        session.user.image = token.image;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};

export default NextAuth(authOptions);
