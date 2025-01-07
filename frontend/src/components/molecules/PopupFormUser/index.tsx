"use client"

import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material"
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined"
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined"
import * as yup from "yup"
import CloseIcon from "@mui/icons-material/Close"
import { ICreateUser, IUpdateUser, IUser } from "@/interfaces/user.interface"
import PasswordInputForm from "@/components/atoms/Forms/PasswordInputForm"
import EmailInputForm from "@/components/atoms/Forms/EmailInputForm"
import TextInputForm from "@/components/atoms/Forms/TextInputForm"
import SelectSearchForm from "@/components/atoms/Forms/SelectSearchForm"
import { useCreateUser, useUpdateUser } from "@/services/user/mutation"
import { STATUS_USER } from "@/assets/data/global"
import { toast } from "react-toastify"
import { useGetRoles } from "@/services/role/query"
import CustomDialog from "@/components/atoms/CustomDialog"

// Validation schema
export const formUserSchema = yup.object({
  firstName: yup.string().required("Must fill!"),
  lastName: yup.string().required("Must fill!"),
  email: yup
    .string()
    .email("Email format is not correct")
    .required("Must fill!"),
  roleAccess: yup.string().required("Must fill!"),
  status: yup.string().required("Must fill!"),
  location: yup.string().optional(),
  password: yup
    .string()
    .required("Must fill!")
    .strict(true)
    .min(8, "Min 8 character"),
  confirmPassword: yup
    .string()
    .strict(true)
    .required("Must fill!")
    .oneOf(
      [yup.ref("password")],
      "Confirm password should be equal with password"
    ),
})

export type FormUserSchema = yup.InferType<typeof formUserSchema>

interface Props {
  isOpen: boolean
  onClose: () => void
  selectedData?: IUser
  process: "create" | "edit" | "view" | "delete"
  refresh: () => void
}

/**
 * Reusable popup component for creating, updating, and viewing user
 */
export default function PopupFormUser({
  isOpen,
  onClose,
  selectedData,
  process,
  refresh,
}: Readonly<Props>) {
  const { handleSubmit, watch, reset, control, setValue } =
    useForm<FormUserSchema>({
      resolver: yupResolver(formUserSchema),
      mode: "all",
    })

  // Get all role
  const roles = useGetRoles()

  const createUser = useCreateUser()
  const updateUser = useUpdateUser()

  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState("**************")

  const handleTogglePasswordVisibility = () => {
    if (!showPassword) {
      setPassword(selectedData?.password ?? "-")
    } else {
      setPassword("**************")
    }
    setShowPassword((prevShowPassword) => !prevShowPassword)
  }

  // Set user data into form
  useEffect(() => {
    if (selectedData && process === "edit") {
      setValue("firstName", selectedData.first_name!)
      setValue("lastName", selectedData?.last_name ?? "")
      setValue("location", selectedData?.location ?? "")
      setValue("status", selectedData.status!)
      setValue("roleAccess", selectedData!.role!.id!)
      setValue("email", selectedData.email!)
      setValue("password", selectedData.password!)
      setValue("confirmPassword", selectedData.password!)
    }
  }, [selectedData])

  // Close popup and reset form
  const closePopUp = () => {
    onClose()
    reset()
  }

  const onSubmitAction = () => {
    if (process == "create") {
      const create: ICreateUser = {
        email: watch("email"),
        password: watch("password"),
        role: watch("roleAccess"),
        first_name: watch("firstName"),
        last_name: watch("lastName"),
        location: watch("location"),
        status: watch("status"),
      }

      // Refresh api get list user then close the popup
      createUser.mutate(create, {
        onSuccess: () => {
          toast.success("Successfully added new user")
          refresh()
          onClose()
        },
      })
    } else {
      const edit: IUpdateUser = {
        id: selectedData?.id!,
        email: watch("email"),
        password: watch("password"),
        first_name: watch("firstName"),
        last_name: watch("lastName"),
        location: watch("location"),
        status: watch("status"),
      }

      // Refresh api get list user then close the popup
      updateUser.mutate(edit, {
        onSuccess: () => {
          toast.success("Successfully updated user")
          refresh()
          onClose()
        },
      })
    }
  }

  const renderFieldInfo = (title: string, value: string) => (
    <div className="col-span-2 mb-3">
      <label
        htmlFor="name"
        className="block mb-[6px] text-xs font-normal text-neutral70 "
      >
        {title}
      </label>
      <p className="text-sm text-neutral90 font-medium break-all">{value}</p>
    </div>
  )

  return (
    <CustomDialog
      onClose={closePopUp}
      open={isOpen}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        component: "form",
        onSubmit: handleSubmit(onSubmitAction),
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} className="text-lg">
        {process === "edit"
          ? "Update User"
          : process === "create"
          ? "Create User"
          : "User Detail"}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        {process == "view" ? (
          <div>
            <div className="grid gap-4 md:mb-2 grid-cols-1 md:grid-cols-2">
              <div className="">
                {renderFieldInfo(
                  "Full Name",
                  selectedData?.first_name + " " + selectedData?.last_name
                )}
                {renderFieldInfo("Role", selectedData?.role?.name ?? "-")}
                {renderFieldInfo("Email Address", selectedData?.email ?? "-")}
              </div>

              <div className="w-fit md:ml-10">
                <div className="col-span-2 mb-3">
                  <label
                    htmlFor="name"
                    className="block mb-[6px] text-xs font-normal text-neutral70 "
                  >
                    Password
                  </label>
                  <div className="flex items-center gap-1">
                    <p className="text-sm text-neutral90 font-medium">
                      {password}
                    </p>
                    <IconButton
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOutlinedIcon
                          sx={{ color: "#404040", fontSize: "20px" }}
                        />
                      ) : (
                        <VisibilityOffOutlinedIcon
                          sx={{ color: "#404040", fontSize: "20px" }}
                        />
                      )}
                    </IconButton>
                  </div>
                </div>

                {renderFieldInfo("Status", selectedData?.status ?? "-")}
                {renderFieldInfo(
                  "Last login",
                  selectedData?.last_access ?? "-"
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-between my-3">
            <div className="w-full sm:w-1/2 space-y-3">
              <TextInputForm
                isRequired
                name="firstName"
                placeholder="e.g. Jane Doe"
                control={control}
                htmlFor="firstName"
                label="First Name"
              />

              <EmailInputForm
                control={control}
                htmlFor="email"
                name="email"
                label="Email Address"
                placeholder="example@mail.com"
                max={50}
                isRequired
                useAbsoluteError
              />

              <TextInputForm
                isRequired
                name="location"
                placeholder="Location"
                control={control}
                htmlFor="location"
                label="Location"
              />

              <PasswordInputForm
                control={control}
                label="Password"
                name="password"
                htmlFor="password"
                placeholder="Enter password"
                useAbsoluteError
                isRequired
              />
            </div>

            <div className="w-full sm:w-1/2 space-y-3">
              <TextInputForm
                isRequired
                name="lastName"
                placeholder="e.g. Jane Doe"
                control={control}
                htmlFor="lastName"
                label="Last Name"
              />

              {/* do not allow to change roles when updating users, because directus does not provide it */}
              <SelectSearchForm
                data={
                  roles?.data
                    ?.filter((it) => it.name !== "Administrator")
                    .map((it) => ({
                      label: it.name!,
                      value: it.id!,
                    })) ?? []
                }
                control={control}
                htmlFor="role"
                label="Role"
                defaultValue={watch("roleAccess")}
                placeholder="- Choose -"
                name="roleAccess"
                isDisabled={process === "edit" || roles.isLoading}
                isRequired
              />

              <SelectSearchForm
                data={STATUS_USER}
                control={control}
                htmlFor="status"
                label="Status"
                defaultValue={watch("status")}
                placeholder="- Choose -"
                name="status"
                isRequired
              />

              <PasswordInputForm
                control={control}
                label="Confirm Password"
                name="confirmPassword"
                htmlFor="confirmPassword"
                placeholder="Re-type password"
                isRequired
                useAbsoluteError
              />
            </div>
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <div className="flex w-full gap-4 p-0.5">
          {process === "view" ? (
            <Button
              onClick={() => closePopUp()}
              type="button"
              variant="contained"
              color="secondary"
              className="flex-1 w-full"
            >
              Close
            </Button>
          ) : (
            <>
              <Button
                onClick={() => closePopUp()}
                type="button"
                variant="contained"
                color="secondary"
                className="flex-1 w-full"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="flex-1 w-full"
              >
                {process == "create" ? "Submit" : "Save Changes"}
              </Button>
            </>
          )}
        </div>
      </DialogActions>
    </CustomDialog>
  )
}
