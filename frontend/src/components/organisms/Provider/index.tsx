"use client"

import { ToastContainer } from "react-toastify"
import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { ThemeProvider } from "@mui/material"
import { SessionProvider } from "next-auth/react"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { queryClient } from "@/utils/config/queryClient"
import { theme } from "@/utils/config/theme"

/**
 * Contains all the providers needed globally
 */
export default function ContainerProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <QueryClientProvider client={queryClient}>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover
          theme="colored"
        />
        <SessionProvider>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </SessionProvider>
        <ReactQueryDevtools position="bottom" buttonPosition="bottom-left" />
      </QueryClientProvider>
    </LocalizationProvider>
  )
}
