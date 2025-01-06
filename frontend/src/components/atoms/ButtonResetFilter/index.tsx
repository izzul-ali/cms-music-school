import React from "react"
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined"

interface Props {
  callback: () => void
}

export default function ButtonResetFilter(props: Readonly<Props>) {
  return (
    <button
      className="w-fit flex gap-2 items-center justify-center px-3 h-9 bg-[#FFEFF1] border border-[#FFDCDC] rounded-[50px]"
      onClick={props.callback}
    >
      <CloseOutlinedIcon sx={{ fontSize: "24px", color: "#D1293D" }} />
      <p className="text-[#D1293D] text-xs font-medium">Reset Filter</p>
    </button>
  )
}
