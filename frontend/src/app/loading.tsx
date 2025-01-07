"use client"

import { HashLoader } from "react-spinners"

export default function Loading() {
  return (
    <div className="flex flex-1 justify-center items-center min-h-screen">
      <HashLoader size={70} color="#22356F" />
    </div>
  )
}
