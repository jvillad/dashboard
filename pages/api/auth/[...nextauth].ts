import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
export const adminIds = [`${process.env.ADMIN}`];

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session, user, token }: any) {
      if (adminIds.includes(session.user?.email as string)) return session;
      else return false;
    },
  },
};

export default NextAuth(authOptions);
