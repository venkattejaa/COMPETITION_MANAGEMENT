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
          where: { email: credentials.email as string }
        });
        
        if (user) {
          return user;
        }
        
        // Auto-create user for development/demo if they don't exist
        const newUser = await prisma.user.create({
          data: {
            email: credentials.email as string,
            name: (credentials.email as string).split('@')[0],
            role: "TEAM_LEADER",
          }
        });
        
        return newUser;
      }
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
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
    async session({ session, token }) {
      if (token && session.user) {
        // Fetch fresh user data from DB using token ID to ensure session is up to date
        const dbUser = await prisma.user.findUnique({
          where: { id: token.id as string },
          include: { team: true },
        });

        if (dbUser) {
          session.user.id = dbUser.id;
          session.user.role = dbUser.role;
          session.user.teamId = dbUser.teamId;
          session.user.isTeamLeader = dbUser.isTeamLeader;
          session.user.xp = dbUser.xp;
          session.user.level = dbUser.level;
        }
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
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
  
  interface JWT {
    id: string;
    role: "COORDINATOR" | "TEAM_LEADER" | "MEMBER";
  }
}