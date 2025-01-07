"use client"

import React from "react"
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import dayjs from "dayjs"
import { ILesson } from "@/interfaces/lesson.interface"
import CustomDialog from "@/components/atoms/CustomDialog"

interface Props {
  isOpen: boolean
  onClose: () => void
  selectedData?: ILesson
}

export default function PopupViewLesson({
  isOpen,
  onClose,
  selectedData,
}: Readonly<Props>) {
  const closePopUp = () => {
    onClose()
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
    <CustomDialog onClose={closePopUp} open={isOpen} fullWidth maxWidth="sm">
      <DialogTitle sx={{ m: 0, p: 2 }} className="text-lg">
        Lesson Detail
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
        <div>
          <div className="grid gap-4 md:mb-2 grid-cols-1 md:grid-cols-2">
            <div className="">
              {renderFieldInfo("ID", selectedData?.id?.toString() ?? "-")}
              {renderFieldInfo("Package", selectedData?.package?.name ?? "-")}
              {renderFieldInfo(
                "Created By",
                selectedData?.user_created?.first_name +
                  " " +
                  selectedData?.user_created?.last_name
              )}
              {renderFieldInfo("Remark", selectedData?.remarks ?? "-")}
            </div>

            <div className="w-fit md:ml-10">
              {renderFieldInfo("Status", selectedData?.status ?? "-")}
              {renderFieldInfo(
                "Started On",
                selectedData?.start_datetime
                  ? dayjs(selectedData?.start_datetime).format(
                      "DD/MM/YYYY - HH:mm"
                    )
                  : "-"
              )}
              {renderFieldInfo(
                "Created At",
                selectedData?.date_created
                  ? dayjs(selectedData?.date_created).format(
                      "DD/MM/YYYY - HH:mm"
                    )
                  : "-"
              )}
            </div>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => closePopUp()}
          type="button"
          variant="contained"
          color="secondary"
          className="flex-1 w-full"
        >
          Close
        </Button>
      </DialogActions>
    </CustomDialog>
  )
}
