"use client"

import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material"
import * as yup from "yup"
import CloseIcon from "@mui/icons-material/Close"
import TextInputForm from "@/components/atoms/Forms/TextInputForm"
import { toast } from "react-toastify"
import {
  ICreateInstrument,
  IInstrument,
  IUpdateInstrument,
} from "@/interfaces/instrument.interface"
import dayjs from "dayjs"
import {
  useCreateInstrument,
  useUpdateInstrument,
} from "@/services/instrument/mutation"
import CustomDialog from "@/components/atoms/CustomDialog"

// Validation schema
export const formInstrumentSchema = yup.object({
  name: yup.string().required("Must fill!"),
})

export type FormInstrumentSchema = yup.InferType<typeof formInstrumentSchema>

interface Props {
  isOpen: boolean
  onClose: () => void
  selectedData?: IInstrument
  process: "create" | "edit" | "view" | "delete"
  refresh: () => void
}

/**
 * Reusable popup component for creating, updating, and viewing instrument
 */
export default function PopupFormInstrument({
  isOpen,
  onClose,
  selectedData,
  process,
  refresh,
}: Readonly<Props>) {
  const { handleSubmit, watch, reset, control, setValue } =
    useForm<FormInstrumentSchema>({
      resolver: yupResolver(formInstrumentSchema),
      mode: "all",
    })

  const createInstrument = useCreateInstrument()
  const updateInstrument = useUpdateInstrument()

  // Set instrument data into form
  useEffect(() => {
    if (selectedData && process === "edit") {
      setValue("name", selectedData.name)
    }
  }, [selectedData])

  const closePopUp = () => {
    onClose()
    reset()
  }

  const onSubmitAction = () => {
    if (process == "create") {
      const create: ICreateInstrument = {
        name: watch("name"),
      }

      // Refresh api get list instrument then close the popup
      createInstrument.mutate(create, {
        onSuccess: () => {
          toast.success("Successfully added new instrument")
          refresh()
          onClose()
        },
      })
    } else {
      const edit: IUpdateInstrument = {
        id: selectedData?.id!,
        name: watch("name"),
      }

      // Refresh api get list instrument then close the popup
      updateInstrument.mutate(edit, {
        onSuccess: () => {
          toast.success("Successfully updated instrument")
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
      maxWidth="xs"
      PaperProps={{
        component: "form",
        onSubmit: handleSubmit(onSubmitAction),
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} className="text-lg">
        {process === "edit"
          ? "Update Instrument"
          : process === "create"
          ? "Create Instrument"
          : "Instrument Detail"}
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
            <div className="space-y-4">
              {renderFieldInfo("Name", selectedData?.name ?? "-")}

              {renderFieldInfo(
                "Created At",
                selectedData?.date_created
                  ? dayjs(selectedData?.date_created).format(
                      "DD/MM/YYYY - HH:mm"
                    )
                  : "-"
              )}
              {renderFieldInfo(
                "Updated At",
                selectedData?.date_updated
                  ? dayjs(selectedData?.date_updated).format(
                      "DD/MM/YYYY - HH:mm"
                    )
                  : "-"
              )}
            </div>
          </div>
        ) : (
          <div className="w-full my-3">
            <TextInputForm
              isRequired
              name="name"
              placeholder="enter name"
              control={control}
              htmlFor="name"
              label="Name"
            />
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
