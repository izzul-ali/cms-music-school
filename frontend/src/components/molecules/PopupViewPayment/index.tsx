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
import { IPayment } from "@/interfaces/payment.interface"
import dayjs from "dayjs"
import CustomDialog from "@/components/atoms/CustomDialog"

interface Props {
  isOpen: boolean
  onClose: () => void
  selectedData?: IPayment
}

export default function PopupViewPayment({
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
        Payment Detail
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
              {renderFieldInfo("Payment ID", selectedData?.payment_id ?? "-")}
              {renderFieldInfo("Package", selectedData?.package?.name ?? "-")}
              {renderFieldInfo(
                "Created By",
                selectedData?.user_created?.first_name +
                  " " +
                  selectedData?.user_created?.last_name
              )}
            </div>

            <div className="w-fit md:ml-10">
              {renderFieldInfo("Rate", selectedData?.rate?.toString() ?? "-")}
              {renderFieldInfo(
                "Payment Date",
                selectedData?.payment_date
                  ? dayjs(selectedData?.payment_date).format(
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
