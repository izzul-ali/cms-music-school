import React from "react"
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined"

interface Props {
  callback: () => void
}

/**
 * A reusable button component designed to reset filters in a table or list.
 * It displays a button with a "Reset Filter" label and a close icon.
 * The component accepts a `callback` function that gets executed when the button is clicked.
 */
export default function ButtonResetFilter({ callback }: Readonly<Props>) {
  return (
    <button
      className="w-fit flex gap-2 items-center justify-center px-3 h-9 bg-[#FFEFF1] border border-[#FFDCDC] rounded-[50px]"
      onClick={callback}
    >
      <CloseOutlinedIcon sx={{ fontSize: "24px", color: "#D1293D" }} />
      <p className="text-[#D1293D] text-xs font-medium">Reset Filter</p>
    </button>
  )
}
