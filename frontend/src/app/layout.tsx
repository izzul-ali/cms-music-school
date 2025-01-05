import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { CssBaseline } from "@mui/material"
import ContainerProvider from "@/components/organisms/Provider"
import { twMerge } from "tailwind-merge"

import "../assets/styles/globals.scss"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Music School | CMS",
  description: "Music School Management System",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={twMerge("antialiased", inter.className)}>
        <CssBaseline />
        <ContainerProvider>{children}</ContainerProvider>
      </body>
    </html>
  )
}
