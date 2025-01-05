"use client"

import React from "react"
import {
  FormLabel,
  InputAdornment,
  OutlinedInput,
  OutlinedInputProps,
} from "@mui/material"
import MailOutlineIcon from "@mui/icons-material/MailOutline"
import { Control, Controller } from "react-hook-form"
import { twMerge } from "tailwind-merge"

interface Props extends OutlinedInputProps {
  label?: string
  placeholder?: string
  htmlFor?: string
  control: Control<any>
  name: string
  max?: number
  useAbsoluteError?: boolean
  isRequired?: boolean
  hideError?: boolean
  allowAutoComplete?: boolean
}

/**
 * @returns Email Input Form
 */
export default function EmailInputForm({
  label,
  placeholder,
  htmlFor,
  name,
  control,
  max,
  useAbsoluteError,
  isRequired,
  allowAutoComplete,
  hideError = false,
  ...props
}: Readonly<Props>) {
  return (
    <div
      className={twMerge(
        "flex flex-col w-full gap-[6px]",
        useAbsoluteError && "relative pb-[10px]"
      )}
    >
      <Controller
        defaultValue=""
        control={control}
        name={name}
        render={({ field, formState: { errors } }) => (
          <>
            <FormLabel
              htmlFor={htmlFor}
              sx={{ color: "#404040", fontSize: 14, fontWeight: 500 }}
            >
              {label}{" "}
              {isRequired && (
                <span className="text-danger text-lg absolute -translate-y-1">
                  *
                </span>
              )}
            </FormLabel>
            <OutlinedInput
              {...field}
              {...props}
              placeholder={placeholder}
              type="email"
              inputProps={{
                name: htmlFor,
                id: htmlFor,
                maxLength: max,
                form: {
                  autoComplete: allowAutoComplete ? "on" : "off",
                },
              }}
              sx={{
                borderWidth: "1px",
                backgroundColor: "white",
                borderRadius: "8px",
                transitionDuration: "0.2s",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: errors?.[name] ? "#F53D3D" : "#d2d6fc",
                },
                "&:hover > .MuiOutlinedInput-notchedOutline": {
                  borderColor: errors?.[name] ? "#F53D3D" : undefined,
                },
                "&:focus > .MuiOutlinedInput-notchedOutline": {
                  borderColor: errors?.[name] ? "#F53D3D" : undefined,
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  border: "1px solid #1e3a8a",
                  boxShadow: "0 0 0 4px #CDD9FF",
                },
                [`& #${htmlFor}`]: {
                  padding: "10px 14px 10px 0",
                  fontSize: 14,
                  color: "#404040",
                },
              }}
              startAdornment={
                <InputAdornment position="start">
                  <MailOutlineIcon sx={{ color: "#9E9E9E", fontSize: 20 }} />
                </InputAdornment>
              }
            />
            {errors?.[name]?.message &&
            (!hideError || errors?.[name]?.message === "Must fill!") ? (
              useAbsoluteError ? (
                <span className="text-xs text-error block absolute -bottom-2">
                  {errors?.[name]?.message?.toString()}
                </span>
              ) : (
                <span className="text-xs text-error">
                  {errors?.[name]?.message?.toString()}
                </span>
              )
            ) : (
              <></>
            )}
          </>
        )}
      />
    </div>
  )
}
