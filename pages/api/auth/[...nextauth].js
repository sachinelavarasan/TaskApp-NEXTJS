import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import connectDB from "../lib/connectDB";
import userModel from "../../../models/userModel";
import bcrypt from "bcrypt";
import { validateAllOnces } from "../../../utils/common";

connectDB();

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",

      async authorize(credentials, req) {
        try {
          const { email, password } = credentials;

          validateAllOnces({ email, password });

          const user = await userModel.findOne({
            email,
          });

          if (!user) {
            throw new Error("Invalid Email or Password");
          }
          const isMatched = await bcrypt.compare(password, user.password);

          if (isMatched) {
            return user;
          } else {
            throw new Error("Invalid password");
          }
        } catch (error) {
          throw new Error(error);
        }
      },
    }),
  ],
  secret: "secret",
  database: process.env.MONGODB_URL,
  callbacks: {
    async session({ session, token }) {
      if (token && token.id) {
        session.user.id = token.id;
      }
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user && user._id) {
        token.id = user._id;
      }
      return token;
    },
  },
});
