import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email) return null;
        
        const user = await prisma.user.findUnique({
          where: { email: (credentials.email as string).toLowerCase() }
        });
        
        if (user) {
          return user;
        }
        
        // Auto-create user for development/demo if they don't exist
        const newUser = await prisma.user.create({
          data: {
            email: (credentials.email as string).toLowerCase(),
            name: (credentials.email as string).split('@')[0],
            role: "TEAM_LEADER",
          }
        });
        
        return newUser;
      }
    })
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email! },
        });

        if (!existingUser) {
          await prisma.user.create({
            data: {
              email: user.email!,
              name: user.name || "Unknown",
              avatar: user.image,
              role: "MEMBER",
            },
          });
        }
      }
      return true;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
        token.teamId = (user as any).teamId;
        token.isTeamLeader = (user as any).isTeamLeader;
        token.xp = (user as any).xp;
        token.level = (user as any).level;
      }
      
      if (trigger === "update" && session) {
        return { ...token, ...session };
      }
      
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as any;
        session.user.teamId = token.teamId as string | null;
        session.user.isTeamLeader = token.isTeamLeader as boolean;
        session.user.xp = (token.xp as number) || 0;
        session.user.level = (token.level as number) || 1;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET || "eyrc-command-center-super-secret-key-2026-production-token",
});

export type { Session } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: "COORDINATOR" | "TEAM_LEADER" | "MEMBER";
      teamId?: string | null;
      isTeamLeader?: boolean;
      xp?: number;
      level?: number;
    };
  }

  interface User {
    role: "COORDINATOR" | "TEAM_LEADER" | "MEMBER";
    teamId?: string | null;
    isTeamLeader?: boolean;
    xp?: number;
    level?: number;
  }
}