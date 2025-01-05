import React from "react"
import DashboardLayout from "@/components/organisms/Layout/DashboardLayout"

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <DashboardLayout>{children}</DashboardLayout>
}
