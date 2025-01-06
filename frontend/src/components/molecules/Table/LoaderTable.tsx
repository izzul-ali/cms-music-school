import React from "react"
import { ClipLoader } from "react-spinners"
import { twMerge } from "tailwind-merge"

interface Props {
  position?: "fixed" | "absolute"
  className?: string
  text?: string
  loading: boolean
}

/**
 * Table Loading component
 */
export default function LoaderTable({
  position = "fixed",
  text,
  className,
  loading,
}: Readonly<Props>) {
  return (
    <div
      className={twMerge(
        "left-0 right-0 top-0 bottom-0 bg-gray-300/50 z-10",
        position,
        className
      )}
    >
      <div className="flex flex-col items-center justify-center h-full">
        <ClipLoader
          color="#FFFFFF"
          loading={loading}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
          className="block"
        />
        <span className="animate-bounce text-4xl text-white font-bold mt-10">
          {text}
        </span>
      </div>
    </div>
  )
}
