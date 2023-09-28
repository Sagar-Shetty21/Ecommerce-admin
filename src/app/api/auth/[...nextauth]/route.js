import NextAuth, { getServerSession } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "../../../../../lib/mongodb";
import { mongooseConnect } from "../../../../../lib/mongoose";
import { Admins } from "../../../../../models/Admins";

let adminEmails = []
const getAdminEmails = async() => {
  await mongooseConnect();
  const admins = await Admins.find({}, 'gmail');
  adminEmails = admins.map(admin => admin.gmail);
}

getAdminEmails();

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