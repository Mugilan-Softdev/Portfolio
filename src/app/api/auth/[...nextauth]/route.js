import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import userModel from "@/server/models/userModel";
import dbConnect from "@/server/config/dbConnect";

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error("Missing Google OAuth credentials");
}

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error("Missing NEXTAUTH_SECRET");
}

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google") {
        try {
          await dbConnect();

          // Check if user exists
          const existingUser = await userModel.findOne({ email: user.email });

          if (!existingUser) {
            // Check total users before creating new user
            const totalUsers = await userModel.countDocuments();

            // Create new user
            const newUser = await userModel.create({
              name: user.name,
              email: user.email,
              image: user.image,
              googleId: user.id,
              role: totalUsers === 0 ? "admin" : "user",
            });

            if (!newUser) {
              console.error("Failed to create new user");
              return "/auth/error?error=Database";
            }
          }

          return true;
        } catch (error) {
          console.error("Error in signIn callback:", error);
          // Check if it's a connection error
          if (error.message.includes("connect")) {
            return "/auth/error?error=DatabaseConnection";
          }
          return "/auth/error?error=Database";
        }
      }
      return true;
    },
    async session({ session, token }) {
      try {
        await dbConnect();
        // Add user role to session
        const user = await userModel.findOne({ email: session.user.email });
        if (!user) {
          console.error("User not found in database:", session.user.email);
          return null;
        }
        session.user.role = user.role || "user";
        session.user.id = user._id.toString();
        return session;
      } catch (error) {
        console.error("Error in session callback:", error);
        return null;
      }
    },
    async jwt({ token, user, account }) {
      if (account && user) {
        token.accessToken = account.access_token;
        token.id = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
export { authOptions };
