import NextAuth, { DefaultSession } from "next-auth"
import { IUser } from "@/interfaces/user.interface"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: IUser & DefaultSession["user"]
  }

  interface JWT {
    user: IUser & DefaultSession["user"]
  }
}
