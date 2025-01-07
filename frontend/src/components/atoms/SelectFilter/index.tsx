"use client"

import React, { useMemo, useRef, useState } from "react"
import { Select, MenuItem, OutlinedInput } from "@mui/material"
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined"
import { twMerge } from "tailwind-merge"

interface Data {
  value: string
  label: string
  disabled?: boolean
}

interface Props {
  label?: string
  data: Data[]
  htmlFor: string
  placeholder?: string
  maxWidth: number
  minWidth?: number
  paperMaxWidth?: number
  defaultValue?: string
  callback?: (text: any) => void
  values?: string
  smallRadius?: boolean
  multiple?: boolean
}

/**
 * Reusable filter component
 * @example
 *  <SelectFilter
      data={[{label: "Label", value: "Value"}]}
      label="Sort by : "
      htmlFor="params-sort-by"
      defaultValue={"Value"}
      maxWidth={185}
      callback={(v) => setParams((prev) => ({ ...prev, sort: v }))}
      values={"Value"}
    />
 */
export default function SelectFilter({
  label,
  data,
  htmlFor,
  placeholder = "",
  maxWidth,
  paperMaxWidth,
  minWidth,
  defaultValue = "",
  callback,
  values,
  smallRadius,
}: Readonly<Props>) {
  const [open, setOpen] = useState(false)
  const selectRef = useRef<HTMLDivElement>(null)

  const toggleOpen = () => {
    setOpen(!open)
  }

  const filterValues = useMemo(() => {
    if (!values) return []

    return values?.split(";").map((item) => item.trim())
  }, [values])

  return (
    <button
      className={twMerge(
        `flex justify-start outline-none hover:bg-[#EDF1FF] items-center max-w-[${maxWidth}px] gap-[6px] px-3 py-2 border cursor-pointer transition-all duration-300 hover:border-primary`,
        open ? "border-primary bg-[#EDF1FF]" : "border-[#EDEDED] bg-white",
        smallRadius ? "rounded-md pr-0" : "rounded-[50px]"
      )}
      onClick={toggleOpen}
    >
      <p className="text-xs text-opacity-70 text-black font-medium text-left whitespace-nowrap">
        {label}
      </p>
      <Select
        className="select-filter"
        defaultValue={defaultValue}
        displayEmpty
        open={open}
        multiple={false}
        IconComponent={KeyboardArrowDownOutlinedIcon}
        value={filterValues}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        onChange={(e) => {
          if (callback) {
            callback(e.target.value)
          }
        }}
        renderValue={(value: any) => {
          if (!value) {
            return placeholder
          }

          const parsedValue = typeof value === "object" ? value[0] : value
          const selectedItem = data.find((item) => item.value === parsedValue)
          return (
            <p className="text-xs text-neutral100 font-medium max-w-[250px] overflow-hidden text-ellipsis whitespace-nowrap">
              {selectedItem ? selectedItem.label : value}
            </p>
          )
        }}
        input={
          <OutlinedInput
            name={htmlFor}
            id={htmlFor}
            label={label}
            ref={selectRef}
          />
        }
        MenuProps={{
          autoFocus: false,
          sx: {
            mt: 1.5,
            "&& .Mui-selected": {
              backgroundColor: "#EDF1FF",
            },
          },
          PaperProps: {
            sx: {
              maxWidth: `${paperMaxWidth ?? 300}px`,
              minWidth: `${minWidth ?? 100}px`,
              borderRadius: "6px",
              maxHeight: "300px",
            },
          },
        }}
        sx={{
          "& .MuiSvgIcon-root": {
            fontSize: "20px",
            color: "#0A0A0A",
          },
          [`& #mui-component-select-${htmlFor}`]: {
            padding: "0 40px 0 0",
            fontSize: 12,
            fontWeight: 500,
            color: "#000000",
          },
          [`& .MuiOutlinedInput-notchedOutline`]: {
            border: "none",
          },
        }}
      >
        {data.map((e) => (
          <MenuItem
            key={e.value}
            value={e.value}
            disabled={e.disabled}
            sx={{
              color: "#404040",
              padding: "14px 16px",
              fontSize: "12px",
              ":hover": { backgroundColor: "#EDF1FF" },
            }}
          >
            <span className="max-w-[300px] overflow-hidden text-ellipsis">
              {e.label}
            </span>
          </MenuItem>
        ))}
      </Select>
    </button>
  )
}
