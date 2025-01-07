import React, { HTMLProps } from "react"
import { FormLabel, OutlinedInput } from "@mui/material"
import { Control, Controller } from "react-hook-form"
import { get } from "lodash"
import { twMerge } from "tailwind-merge"

interface Props extends HTMLProps<HTMLDivElement> {
  label?: string
  placeholder?: string
  disabled?: boolean
  htmlFor?: string
  type?: "text" | "number"
  control?: Control<any>
  name: string
  optional?: string
  customError?: string
  isRequired?: boolean
  onChangeInput?: (txt: string) => void
}

export default function TextInputForm({
  label,
  placeholder,
  htmlFor,
  control,
  name,
  disabled,
  type,
  min,
  max,
  maxLength,
  defaultValue,
  optional,
  customError,
  isRequired,
  onChangeInput,
}: Readonly<Props>) {
  return (
    <div
      className={twMerge(
        "flex flex-col gap-[6px] pb-[10px] relative",
        maxLength ? `w-[${maxLength}px]` : "w-full"
      )}
    >
      <Controller
        defaultValue={defaultValue}
        control={control}
        name={name}
        render={({ field, formState: { errors } }) => (
          <>
            <FormLabel
              htmlFor={htmlFor}
              sx={{
                color: "#404040",
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              {label}{" "}
              {isRequired && (
                <span className="text-danger text-lg absolute -translate-y-1">
                  *
                </span>
              )}
              {optional && (
                <span className="text-sm font-normal text-[#9E9E9E]">
                  {" "}
                  ({optional})
                </span>
              )}
            </FormLabel>
            <OutlinedInput
              {...field}
              disabled={disabled}
              placeholder={placeholder}
              type={type ?? "text"}
              onChange={(e) => {
                field.onChange(e.currentTarget.value)
                if (onChangeInput) onChangeInput(e.currentTarget.value)
              }}
              inputProps={{ name: htmlFor, id: htmlFor, min, max }}
              sx={{
                backgroundColor: disabled ? "#F3F3F3" : "transparent",
                borderWidth: "1px",
                borderRadius: "8px",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor:
                    errors?.[name] || customError ? "#F53D3D" : undefined,
                },
                "&:hover > .MuiOutlinedInput-notchedOutline": {
                  borderColor:
                    errors?.[name] || customError ? "#F53D3D" : undefined,
                },
                "&:focus > .MuiOutlinedInput-notchedOutline": {
                  borderColor:
                    errors?.[name] || customError ? "#F53D3D" : undefined,
                },
                [`& #${htmlFor}`]: {
                  padding: "10px 14px",
                  fontSize: 14,
                  color: "#404040",
                },
              }}
              // endAdornment={
              //   (errors?.[name] || customError) && (
              //     <InputAdornment position="end">
              //       <ErrorOutlineOutlinedIcon sx={{ color: '#F53D3D', fontSize: 20 }} />
              //     </InputAdornment>
              //   )
              // }
            />
            <span className="text-xs text-error block absolute -bottom-2.5 line-clamp-1 text-ellipsis max-w-full whitespace-nowrap overflow-hidden">
              {customError ??
                errors?.[name]?.message?.toString() ??
                get(errors, name)?.message?.toString()}
            </span>
          </>
        )}
      />
    </div>
  )
}
