import { withAuth } from "next-auth/middleware"
import { NextRequest, NextResponse } from "next/server"
import { ACCESS_TOKEN } from "./interfaces/auth"

/**
 * Middleware with next-auth
 * Ensure user identity and check session cookies before granting access to specific pages or API routes.
 */
export default withAuth(
  async function middleware(req: NextRequest) {
    const cookieAUth = req.cookies.get(ACCESS_TOKEN)
    const response = NextResponse.next()

    const isNotPrivatePage = req.nextUrl.pathname.startsWith("/login")

    if (!cookieAUth?.value) {
      if (isNotPrivatePage) {
        return response
      }

      const targetPath = req.nextUrl.pathname
      const searchParams = req.nextUrl.searchParams

      const redirectUrl = new URL(`/login`, req.url)

      redirectUrl.searchParams.set("redirect", targetPath)

      for (const [key, value] of searchParams.entries()) {
        redirectUrl.searchParams.append(key, value)
      }

      return NextResponse.redirect(redirectUrl)
    }

    if (req.nextUrl.pathname.startsWith("/login")) {
      const previousUrl = req.headers.get("referer")

      if (previousUrl) {
        return NextResponse.redirect(previousUrl)
      }

      return NextResponse.redirect(new URL("/", req.url))
    }

    return response
  },
  {
    callbacks: {
      authorized: () => {
        return true
      },
    },
  }
)

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|img|icons|svg).*)"],
}
