import React from "react"
import { Autocomplete, Checkbox, FormLabel, TextField } from "@mui/material"
import { Control, Controller } from "react-hook-form"
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank"
import CheckBoxIcon from "@mui/icons-material/CheckBox"
import { get } from "lodash"
import { twMerge } from "tailwind-merge"

export interface IOptions {
  value: string
  label: string
  disable?: boolean
}

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
const checkedIcon = <CheckBoxIcon fontSize="small" />

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
  type?: "checkbox" | "basic"
  disableCloseOnSelect?: boolean
  limitTags?: number
  loading?: boolean
}

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
  type = "basic",
  disableCloseOnSelect,
  limitTags,
  optional,
  className,
  loading,
}: Readonly<Props>) {
  const widthStyle = maxLength ? `w-[${maxLength}px]` : "w-full"

  return (
    <div
      className={twMerge(
        `flex flex-col gap-[6px] pb-[10px] relative ${widthStyle}`,
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
                renderOption={(props, option, { selected }) => {
                  return (
                    <li {...props} key={option.key}>
                      {type === "checkbox" && (
                        <Checkbox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                      )}
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
