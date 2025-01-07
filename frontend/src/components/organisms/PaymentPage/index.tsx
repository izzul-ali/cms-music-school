"use client"

import React, { useMemo, useState } from "react"
import Table from "@/components/molecules/Table"
import { createColumnHelper } from "@tanstack/react-table"
import { IconButton } from "@mui/material"
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined"
import dayjs from "dayjs"
import { IGlobalParams } from "@/interfaces/global.interface"
import SelectFilter from "@/components/atoms/SelectFilter"
import ButtonResetFilter from "@/components/atoms/ButtonResetFilter"
import { FILTER_SORT_PAYMENT_DATE } from "@/assets/data/filter"
import {
  useGetPayments,
  useGetTotalPaymentRows,
} from "@/services/payment/query"
import { IPayment } from "@/interfaces/payment.interface"
import { useGetUniquePackages } from "@/services/package/query"
import PopupViewPayment from "@/components/molecules/PopupViewPayment"
import { generatePaginationData } from "@/utils/helpers/pagination"

/**
 * Helper function to create column definitions for the table.
 *
 * `columnHelper` is an instance of the `createColumnHelper` function,
 * which simplifies the creation of strongly-typed table columns for `IInstrument` data.
 * It helps to define column metadata such as accessor keys, headers, and cell renderers
 * in a type-safe manner.
 */
const columnHelper = createColumnHelper<IPayment>()

// Default filter
const defaultParams: IGlobalParams = {
  limit: 10,
  page: 1,
  sort: [FILTER_SORT_PAYMENT_DATE[1].value], // default payment_date descending
}

export default function PaymentPage() {
  const [selectedPayment, setSelectedPayment] = useState<IPayment | undefined>()
  const [isOpenPopupViewPayment, setisOpenPopupViewPayment] =
    useState<boolean>(false)

  // Usually we can use filters that are stored in the URL query params so that the filter does not change when the web page is refreshed.
  // This time I stored it in the state to make it simpler.
  const [params, setParams] = useState<IGlobalParams>(defaultParams)

  // Get list & total payments
  const payments = useGetPayments(params)
  const totalPaymentRows = useGetTotalPaymentRows({
    ...params,
    ...defaultParams,
  })

  // Get unique packages
  const packages = useGetUniquePackages()

  // Open popup for view detail payment
  const openPopUp = (data?: IPayment) => {
    setSelectedPayment(data)
    setisOpenPopupViewPayment(true)
  }

  // Reset filter
  const onResetFilter = () => {
    setParams(() => ({
      limit: params.limit,
      offset: params.offset,
      search: params.search,
      page: params.page,
      sort: defaultParams.sort, // default descending
    }))
  }

  const closePopUp = () => {
    setisOpenPopupViewPayment(false)
    setSelectedPayment(undefined)
  }

  /**
   * Columns Configuration for Table
   *
   * The `columns` variable defines the structure and behavior of each column in the table.
   * It is created using the `useMemo` hook to optimize performance by memoizing the column definitions.
   */
  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        size: 5,
        cell: ({ row }) => (
          <span>
            {params?.page === 1
              ? row.index + 1
              : (params.page! - 1) * 10 + (row.index + 1)}
          </span>
        ),
        id: "id",
        header: "No",
      }),
      columnHelper.accessor("user_created", {
        cell: (info) => (
          <span className="block whitespace-nowrap overflow-hidden w-[200px] text-ellipsis">
            {info.getValue()?.first_name + " " + info.getValue()?.last_name}
          </span>
        ),
        size: 300,
        header: "Created By",
      }),

      columnHelper.accessor("currency", {
        cell: (info) => (
          <span className="block whitespace-nowrap overflow-hidden w-[200px] text-ellipsis">
            {info.getValue()}
          </span>
        ),
        size: 300,
        header: "Currency",
      }),
      columnHelper.accessor("package", {
        cell: (info) => (
          <span className="block whitespace-nowrap overflow-hidden w-[200px] text-ellipsis">
            {info.getValue()?.name}
          </span>
        ),
        size: 300,
        header: "Package",
      }),
      columnHelper.accessor("payment_date", {
        cell: (info) => (
          <span className="block whitespace-nowrap">
            {info.getValue()
              ? dayjs(info.getValue()).format("DD/MM/YYYY - HH:mm")
              : "-"}
          </span>
        ),
        header: "Payment Date",
      }),
      columnHelper.accessor("date_created", {
        cell: (info) => (
          <span className="block whitespace-nowrap">
            {info.getValue()
              ? dayjs(info.getValue()).format("DD/MM/YYYY - HH:mm")
              : "-"}
          </span>
        ),
        header: "Created At",
      }),
      columnHelper.display({
        id: "action",
        size: 10,
        header: "Action",
        cell: (data) => (
          <div className="flex gap-1 items-center w-fit">
            <IconButton onClick={() => openPopUp(data.row.original)}>
              <VisibilityOutlinedIcon className="text-[20px] cursor-pointer" />
            </IconButton>
          </div>
        ),
      }),
    ],
    [payments?.data]
  )

  return (
    <section className="flex flex-1 flex-col gap-4 px-1 pb-10">
      <div className="flex flex-wrap justify-between gap-2">
        <div className="flex gap-4">
          <SelectFilter
            data={[
              {
                value: "all",
                label: "All Package",
              },
              ...(packages?.data?.map((it) => ({
                label: it.name!,
                value: it.name!,
              })) ?? []),
            ]}
            label="Package: "
            htmlFor="package-filter"
            maxWidth={300}
            callback={(v) =>
              setParams((prev) => ({
                ...prev,
                page: 1,
                package: v === "all" ? undefined : v,
              }))
            }
            values={params?.package ?? "all"}
          />

          <SelectFilter
            data={FILTER_SORT_PAYMENT_DATE}
            label="Sort by : "
            htmlFor="params-sort-by"
            defaultValue={FILTER_SORT_PAYMENT_DATE[1].value}
            maxWidth={185}
            callback={(v) => setParams((prev) => ({ ...prev, sort: [v] }))}
            values={params?.sort?.[0] ?? FILTER_SORT_PAYMENT_DATE[1].value}
          />
        </div>

        {(params?.package?.[0] ||
          params?.sort?.[0] !== defaultParams?.sort?.[0]) && (
          <ButtonResetFilter callback={() => onResetFilter()} />
        )}
      </div>

      <Table
        columns={columns}
        data={payments?.data ?? []}
        isLoading={payments.isLoading || payments.isFetching}
        paginationData={generatePaginationData(
          params.page,
          params.limit,
          totalPaymentRows.data
        )}
        onSearch={(v) => setParams((prev) => ({ ...prev, page: 1, search: v }))}
        setPages={(value) => setParams((prev) => ({ ...prev, page: value }))}
        adjustColumnSize
      />

      {isOpenPopupViewPayment && (
        <PopupViewPayment
          isOpen={isOpenPopupViewPayment}
          selectedData={selectedPayment}
          onClose={closePopUp}
        />
      )}
    </section>
  )
}
