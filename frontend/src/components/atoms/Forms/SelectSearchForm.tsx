import React from "react"
import { Autocomplete, FormLabel, TextField } from "@mui/material"
import { Control, Controller } from "react-hook-form"
import { get } from "lodash"
import { twMerge } from "tailwind-merge"

export interface IOptions {
  value: string
  label: string
  disable?: boolean
}

interface Props {
  label?: string
  data?: IOptions[]
  htmlFor?: string
  control?: Control<any>
  name: string
  defaultValue?: string | any[]
  placeholder?: string
  isDisabled?: boolean
  className?: string
  optional?: string
  isRequired?: boolean
  onSelect?: (v: IOptions) => void
  multiple?: boolean
  maxLength?: number
  disableCloseOnSelect?: boolean
  limitTags?: number
  loading?: boolean
}

/**
 * Dropdown select with search and react-hook-form controller
 */
export default function SelectSearchForm({
  label,
  data = [],
  name,
  htmlFor,
  control,
  isDisabled,
  placeholder,
  isRequired,
  onSelect,
  multiple,
  maxLength,
  disableCloseOnSelect,
  limitTags,
  optional,
  className,
  loading,
}: Readonly<Props>) {
  return (
    <div
      className={twMerge(
        "flex flex-col gap-[6px] pb-[10px] relative",
        maxLength ? `w-[${maxLength}px]` : "w-full",
        className
      )}
    >
      <Controller
        control={control}
        name={name}
        render={({ field, formState: { errors } }) => {
          let val = field.value
          if (multiple) {
            val = field.value?.map((item: string) => {
              const find = data?.find((dat) => dat.value === item)
              return find
            })
          } else {
            val = data?.find((it) => it.value === field.value)
          }

          return (
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
                {optional && (
                  <span className="text-sm font-normal text-[#9E9E9E]">
                    {" "}
                    ({optional})
                  </span>
                )}
              </FormLabel>

              <Autocomplete
                loading={loading}
                multiple={multiple}
                {...field}
                disabled={isDisabled}
                options={data}
                isOptionEqualToValue={(option, value) =>
                  option.value === value.value
                }
                value={val ?? field.value}
                disableClearable
                onChange={(event: any, newValue) => {
                  if (multiple) {
                    const val = newValue?.map((item: IOptions) => item.value)
                    field.onChange(val)
                  } else {
                    field.onChange(newValue?.value)
                  }
                  if (onSelect) onSelect(newValue)
                }}
                ListboxProps={{ sx: { maxHeight: "200px", fontSize: "14px" } }}
                sx={{
                  width: "100%",

                  "& .MuiInputBase-root": {
                    backgroundColor: isDisabled ? "#F3F3F3" : undefined,
                    padding: "3px 10px",
                    borderRadius: "8px",
                  },
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    borderColor: errors?.[name] ? "#F53D3D" : undefined,
                  },
                  "& .MuiPopper-root": {
                    height: "100px",
                  },
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder={placeholder}
                    sx={{
                      "& .MuiInputBase-input": {
                        fontSize: 14,
                        fontWeight: 500,
                        "::placeholder": {
                          fontSize: 14,
                        },
                      },
                    }}
                  />
                )}
                limitTags={limitTags}
                disableCloseOnSelect={disableCloseOnSelect}
                renderOption={(props, option) => {
                  return (
                    <li {...props} key={option.key}>
                      {option.label}
                    </li>
                  )
                }}
              />

              {(errors?.[name]?.message || get(errors, name)?.message) && (
                <span className="text-xs text-error block absolute -bottom-2">
                  {errors?.[name]?.message?.toString() ??
                    get(errors, name)?.message?.toString()}
                </span>
              )}
            </>
          )
        }}
      />
    </div>
  )
}
