import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { cookies } from "next/headers"
import { login, logout } from "./api"
import { isAxiosError } from "axios"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/interfaces/auth.interface"
import { apiGetCurrentLoginUser } from "../user/action"
import { IUser } from "@/interfaces/user.interface"

// next auth configuration
export const authOptions: NextAuthOptions = {
  providers: [
    // credential provider is used to create custom login with email and password
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await login({
            email: credentials!.email,
            password: credentials!.password,
          })

          if (!res?.data) throw new Error(res.message ?? "Failed to login")

          const data = res.data
          let user: Record<string, any> = {}

          // store refresh token and access token in cookie for 7 days with the following options
          if (data && data.access_token && data.refresh_token) {
            cookies().set({
              name: ACCESS_TOKEN,
              value: data.access_token,
              maxAge: 2 * 24 * 60 * 60, // 2 day
              httpOnly: true,
              secure: true,
              sameSite: "lax",
            })
            cookies().set({
              name: REFRESH_TOKEN,
              value: data.refresh_token,
              maxAge: 2 * 24 * 60 * 60, // 2 day
              httpOnly: true,
              secure: true,
              sameSite: "lax",
            })

            user = await apiGetCurrentLoginUser(data.access_token)
          }

          // Actually we can save all user data returned from the login response, then we can use it in the session, but Directus doesn't seem to provide that response.
          return {
            id: "",
            email: credentials?.email,
            ...user,
          }
        } catch (error) {
          if (isAxiosError(error)) {
            throw new Error(error.response?.data?.message ?? "Failed to login")
          }

          const err = error as {
            errors: { message: string; extensions: any }[]
          }

          throw new Error(err?.errors?.[0]?.message ?? "Failed to login")
        }
      },
    }),
  ],
  events: {
    // remove necessary cokies after calling logout api
    async signOut() {
      const deleteCookie = () => {
        cookies().delete(ACCESS_TOKEN)
        cookies().delete(REFRESH_TOKEN)
      }

      try {
        const token = await cookies().get(REFRESH_TOKEN)?.value

        await logout({
          refresh_token: token,
          mode: "json",
        })

        deleteCookie()
      } catch (error) {
        deleteCookie()

        if (isAxiosError(error)) {
          throw new Error(error.response?.data ?? "Failed to logout")
        }
        throw error
      }
    },
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user
      }
      return token
    },
    async session({ session, token }) {
      if (token?.user) {
        const userData = token.user as IUser

        session.user = userData
      }

      return session
    },
  },
  pages: {
    signIn: "/login",
  },
  cookies: {
    sessionToken: {
      name: "next-auth.session-token",
      options: {
        httpOnly: true,
        secure: true,
        path: "/",
        sameSite: "lax",
      },
    },
    callbackUrl: {
      name: "next-auth.callback-url",
      options: {
        httpOnly: true,
        secure: true,
        path: "/",
        sameSite: "lax",
      },
    },
    csrfToken: {
      name: "next-auth.csrf-token",
      options: {
        httpOnly: true,
        secure: true,
        path: "/",
        sameSite: "lax",
      },
    },
  },
  secret: process.env.NEXTAUTH_SECRET ?? "empty",
}
