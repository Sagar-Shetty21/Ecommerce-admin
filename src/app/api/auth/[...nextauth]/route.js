import NextAuth, { getServerSession } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "../../../../../lib/mongodb";

const adminEmails = ['5agarm5hetty05@gmail.com', 'sagarmshetty555@gmail.com']

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  pages: {
    signIn: '/login'
  },
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    session: ({session,token,user}) => {
      if(adminEmails.includes(session?.user?.email)) {
        return session;
      } else {
        return false;
      }
    }
  }
}

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}


export async function isAdminRequest(req, res) {
  const session = await getServerSession(authOptions)
  if(!adminEmails.includes(session?.user?.email)) {
    throw 'not an admin';
  }
}