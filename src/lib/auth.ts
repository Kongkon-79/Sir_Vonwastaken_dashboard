import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";


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
        rememberMe: { label: "Remember me", type: "checkbox" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter your email and password");
        }

        try {
    

          const loginUrl = `${process.env.NEXT_PUBLIC_API_URL}/users/login`;
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

          if (!res.ok || !response?.status) {
            throw new Error(response?.message || "INVALID_CREDENTIALS");
          }

          // The backend returns user and token at the top level. Keep the
          // nested fallback for compatibility with older API deployments.
          const { user, token } = response.data || response;

          if (!user || !token) {
            throw new Error("Authentication response is missing user data");
          }

          const normalizedRole = String(user.role).toLowerCase();

          if (normalizedRole !== "admin") {
            throw new Error("ADMIN_ONLY");
          }

          return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: normalizedRole,
            // profileImage: user.profileImage,
            token,
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
        // token.profileImage = user.profileImage;
        token.token = user.token;
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
        // profileImage: token.profileImage,
        token: token.token,
      };
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};
