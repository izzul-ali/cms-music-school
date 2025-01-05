"use client"

import React from "react"
import { InputAdornment, TextField } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import { debounce } from "lodash"
import { useSearchParams } from "next/navigation"

interface Props {
  label?: string
  placeholder?: string
  disable?: boolean
  callback?: (txt?: string) => void
  value?: string
  fullWidth?: boolean
  customWidth?: string | number
}

function InputSearch({
  callback,
  value,
  customWidth,
  fullWidth,
  label = "",
  placeholder = "",
  disable = false,
}: Readonly<Props>) {
  const searchParams = useSearchParams()

  return (
    <TextField
      disabled={disable}
      onChange={debounce((e) => {
        if (callback) callback(e.target.value)
      }, 1000)}
      value={value}
      label={label}
      id="outlined-start-adornment"
      placeholder={placeholder}
      defaultValue={searchParams.get("search") ?? ""}
      sx={{
        width: fullWidth ? "100%" : customWidth ?? 320,
        "& .MuiInputBase-root": {
          paddingLeft: "12px",
          borderRadius: 2,
        },
        "& .MuiInputBase-input": {
          fontSize: 14,
          fontWeight: 500,
          padding: "10px 14px",
          paddingLeft: "0",
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon sx={{ color: "#404040", fontSize: 20 }} />
          </InputAdornment>
        ),
      }}
    />
  )
}

export default InputSearch
