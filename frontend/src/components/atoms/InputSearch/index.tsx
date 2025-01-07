"use client"

import React, { useCallback, useState } from "react"
import { InputAdornment, TextField } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import { debounce } from "lodash"
import CloseIcon from "@mui/icons-material/Close"

interface Props {
  label?: string
  placeholder?: string
  disable?: boolean
  callback?: (txt?: string) => void
  value?: string
  fullWidth?: boolean
}

/**
 * Input search with debound
 * @example
 * <InputSearch
     disable={isLoading}
     placeholder="Search"
     callback={onSearch}
   />
 */
function InputSearch({
  callback,
  value,
  fullWidth,
  label = "",
  placeholder = "",
  disable = false,
}: Readonly<Props>) {
  const [localValue, setLocalValue] = useState<string>()

  const onSetValue = (v?: string) => {
    if (callback) callback(v)
    setLocalValue(v)
  }

  const onChangeWithDebounce = useCallback(
    debounce((e) => {
      if (callback) callback(e.target.value)
    }, 1000),
    []
  )

  return (
    <TextField
      disabled={disable}
      onChange={(e) => {
        setLocalValue(e.target.value)
        onChangeWithDebounce(e)
      }}
      value={value ?? localValue}
      defaultValue={localValue}
      label={label}
      id="outlined-start-adornment"
      placeholder={placeholder}
      sx={{
        width: fullWidth ? "100%" : 320,
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
            {localValue ? (
              <CloseIcon
                onClick={() => onSetValue("")}
                sx={{ color: "#404040", fontSize: 20, cursor: "pointer" }}
              />
            ) : (
              <SearchIcon sx={{ color: "#404040", fontSize: 20 }} />
            )}
          </InputAdornment>
        ),
      }}
    />
  )
}

export default InputSearch
