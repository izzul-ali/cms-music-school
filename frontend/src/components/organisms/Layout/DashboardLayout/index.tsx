"use client"

import { useState } from "react"
import Sidebar from "@/components/molecules/Sidebar"
import Header from "@/components/molecules/Header"

/**
 * Layout for all dashboard pages
 */
export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false)

  return (
    <section className="bg-neutral20 h-screen w-screen flex">
      <Sidebar isOpenDrawer={isOpenDrawer} setIsOpenDrawer={setIsOpenDrawer} />
      <div className="flex-1 relative w-full h-screen flex flex-col overflow-y-hidden p-0 md:px-4">
        <Header setIsOpenDrawer={setIsOpenDrawer} />
        <div className="mt-4 px-3 md:p-0 pb-4 flex-1 h-full overflow-auto hide-scrollbar">
          {children}
        </div>
      </div>
    </section>
  )
}
