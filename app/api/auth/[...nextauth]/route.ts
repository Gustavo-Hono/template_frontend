import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await axios.post("http://localhost:3000/auth/login", {
            email: credentials?.email,
            password: credentials?.password,
          });

          const user = res.data;

          if (user && user.access_token) {
            // NextAuth needs an object with at least an ID
            return {
              id: user.access_token, // or some decoded id
              email: credentials?.email,
              backendToken: user.access_token,
            } as any;
          }
          return null;
        } catch (e) {
          console.error("Login failed:", e);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.backendToken = user.backendToken;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      session.backendToken = token.backendToken;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };