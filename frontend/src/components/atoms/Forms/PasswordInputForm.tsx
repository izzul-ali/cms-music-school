"use client"

import React, { useState } from "react"
import {
  InputAdornment,
  FormLabel,
  IconButton,
  OutlinedInput,
  OutlinedInputProps,
} from "@mui/material"
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined"
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined"
import { Control, Controller } from "react-hook-form"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import { twMerge } from "tailwind-merge"

interface Props extends OutlinedInputProps {
  name: string
  control: Control<any>
  label?: string
  placeholder?: string
  htmlFor?: string
  hideError?: boolean
  useAbsoluteError?: boolean
  isRequired?: boolean
  allowAutoComplete?: boolean
  showLockIcon?: boolean
  max?: number
}

/**
 * @returns Password Input Form with react-hook-form controller
 */
export default function PasswordInputForm({
  label,
  placeholder,
  htmlFor,
  control,
  name,
  hideError = false,
  isRequired,
  useAbsoluteError,
  max,
  allowAutoComplete,
  showLockIcon,
  ...props
}: Readonly<Props>) {
  const [showPassword, setShowPassword] = useState(false)

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword)
  }

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
            {label ? (
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
            ) : null}
            <OutlinedInput
              {...field}
              {...props}
              placeholder={placeholder}
              type={showPassword ? "text" : "password"}
              inputProps={{
                name: htmlFor,
                id: htmlFor,
                maxLength: max,
                autoComplete: allowAutoComplete ? "on" : "new-password",
                form: {
                  autoComplete: allowAutoComplete ? "on" : "off",
                },
              }}
              sx={{
                borderWidth: "1px",
                borderRadius: "8px",
                backgroundColor: "white",
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
                  padding: showLockIcon ? "10px 5px" : "10px 14px",
                  fontSize: 14,
                  color: "#404040",
                },
              }}
              startAdornment={
                showLockIcon ? (
                  <InputAdornment position="start">
                    <LockOutlinedIcon sx={{ color: "#9E9E9E", fontSize: 20 }} />
                  </InputAdornment>
                ) : undefined
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleTogglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? (
                      <VisibilityOutlinedIcon
                        sx={{ color: "#9E9E9E", fontSize: 20 }}
                      />
                    ) : (
                      <VisibilityOffOutlinedIcon
                        sx={{ color: "#9E9E9E", fontSize: 20 }}
                      />
                    )}
                  </IconButton>
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
