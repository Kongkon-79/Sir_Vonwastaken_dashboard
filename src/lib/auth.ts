import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5001/api/v1";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter your email and password");
        }

        try {
          const loginUrl = `${API_BASE_URL.replace(/\/$/, "")}/auth/login`;
          const res = await fetch(
            loginUrl,
            {
              method: "POST",
              headers: {
                accept: "*/*",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          );

          const response = await res.json();

          if (!res.ok || !response?.success) {
            throw new Error(response?.message || "INVALID_CREDENTIALS");
          }

          const { user, accessToken } = response.data || {};

          if (!user || !accessToken) {
            throw new Error("Authentication response is missing user data");
          }

          const normalizedRole = String(user.role).toLowerCase();

          if (normalizedRole !== "admin") {
            throw new Error("ADMIN_ONLY");
          }

          return {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: normalizedRole,
            profileImage: user.profileImage,
            accessToken,
          };
        } catch (error) {
          console.error("Authentication error:", error);
          const errorMessage =
            error instanceof Error
              ? error.message
              : "Authentication failed. Please try again.";
          throw new Error(errorMessage);
        }
      },
    }),
  ],



  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        token.id = user.id;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.email = user.email;
        token.role = user.role;
        token.profileImage = user.profileImage;
        token.accessToken = user.accessToken;
      }
      return token;
    },

    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, token }: { session: any; token: JWT }) {
      session.user = {
        id: token.id,
        firstName: token.firstName,
        lastName: token.lastName,
        email: token.email,
        role: token.role,
        profileImage: token.profileImage,
        accessToken: token.accessToken,
      };
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};

