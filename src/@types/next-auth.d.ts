import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    avatar_url?: string | null;
  }

  interface Session {
    user: User;
  }
}
