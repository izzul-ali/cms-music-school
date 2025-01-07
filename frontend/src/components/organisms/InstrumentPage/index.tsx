"use client"

import React, { useMemo, useState } from "react"
import Table from "@/components/molecules/Table"
import { createColumnHelper } from "@tanstack/react-table"
import { IconButton } from "@mui/material"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined"
import ModeOutlinedIcon from "@mui/icons-material/ModeOutlined"
import dayjs from "dayjs"
import { IGlobalParams } from "@/interfaces/global.interface"
import SelectFilter from "@/components/atoms/SelectFilter"
import ButtonResetFilter from "@/components/atoms/ButtonResetFilter"
import { FILTER_SORT_INSTRUMENT } from "@/assets/data/filter"
import { toast } from "react-toastify"
import {
  useGetInstruments,
  useGetTotalInstruments,
} from "@/services/instrument/query"
import { IInstrument } from "@/interfaces/instrument.interface"
import { useDeleteInstrument } from "@/services/instrument/mutation"
import PopupFormInstrument from "@/components/molecules/PopupFormInstrument"
import { generatePaginationData } from "@/utils/helpers/pagination"

type TPopupType = "create" | "view" | "edit" | "delete"

/**
 * Helper function to create column definitions for the table.
 *
 * `columnHelper` is an instance of the `createColumnHelper` function,
 * which simplifies the creation of strongly-typed table columns for `IInstrument` data.
 * It helps to define column metadata such as accessor keys, headers, and cell renderers
 * in a type-safe manner.
 */
const columnHelper = createColumnHelper<IInstrument>()

// Default filter
const defaultParams: IGlobalParams = {
  limit: 10,
  page: 1,
  sort: [FILTER_SORT_INSTRUMENT[0].value], // default name ascending
}

export default function InstrumentPage() {
  const [typePopUp, setTypePopUp] = useState<TPopupType>("create")
  const [selectedInstrument, setSelectedInstrument] = useState<
    IInstrument | undefined
  >()
  const [isOpenPopupFormInstrument, setisOpenPopupFormInstrument] =
    useState<boolean>(false)

  // Usually we can use filters that are stored in the URL query params so that the filter does not change when the web page is refreshed.
  // This time I stored it in the state to make it simpler.
  const [params, setParams] = useState<IGlobalParams>(defaultParams)

  // Get list & total instruments
  const instruments = useGetInstruments(params)
  const totalInstruments = useGetTotalInstruments({
    ...params,
    ...defaultParams,
  })
  const deleteInstrument = useDeleteInstrument()

  // refresh instrument data after performing an action
  const onRefreshData = () => {
    instruments.refetch()
    totalInstruments.refetch()
  }

  // Handle delete instrument
  const onDeleteInstrument = (id: number) => {
    deleteInstrument.mutate(id, {
      onSuccess: () => {
        toast.success("Successfully deleted instrument")
        onRefreshData()
      },
    })
  }

  // Open popup for view detail, update or create instrument
  const openPopUp = (typePopUp: TPopupType, data?: IInstrument) => {
    if (typePopUp !== "create") {
      setSelectedInstrument(data)
    }

    setTypePopUp(typePopUp)
    setisOpenPopupFormInstrument(true)
  }

  // Reset filter
  const onResetFilter = () => {
    setParams(() => ({
      limit: params.limit,
      offset: params.offset,
      search: params.search,
      page: params.page,
      sort: defaultParams.sort,
    }))
  }

  const closePopUp = () => {
    setTypePopUp("create")
    setisOpenPopupFormInstrument(false)
    setSelectedInstrument(undefined)
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
      columnHelper.accessor("name", {
        cell: (info) => (
          <span className="block whitespace-nowrap overflow-hidden w-[200px] text-ellipsis">
            {info.getValue()}
          </span>
        ),
        size: 300,
        header: "Full Name",
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
      columnHelper.accessor("date_updated", {
        cell: (info) => (
          <span className="block whitespace-nowrap">
            {info.getValue()
              ? dayjs(info.getValue()).format("DD/MM/YYYY - HH:mm")
              : "-"}
          </span>
        ),
        header: "Updated At",
      }),
      columnHelper.display({
        id: "action",
        size: 10,
        header: "Action",
        cell: (data) => (
          <div className="flex gap-1 items-center w-fit">
            <IconButton onClick={() => openPopUp("view", data.row.original)}>
              <VisibilityOutlinedIcon className="text-[20px] cursor-pointer" />
            </IconButton>

            <IconButton onClick={() => openPopUp("edit", data.row.original)}>
              <ModeOutlinedIcon className="text-[20px] cursor-pointer" />
            </IconButton>

            {/* It should display a confirmation popup to delete and the API call will be made when the user agrees, but for now I made it delete immediately */}
            <IconButton
              disabled={deleteInstrument.isPending}
              onClick={() => onDeleteInstrument(data.row.original.id!)}
            >
              <DeleteOutlineIcon className="text-[20px] cursor-pointer text-red-500" />
            </IconButton>
          </div>
        ),
      }),
    ],
    [instruments?.data]
  )

  return (
    <section className="flex flex-1 flex-col gap-4 px-1 pb-10">
      <div className="flex flex-wrap justify-between gap-2">
        <SelectFilter
          data={FILTER_SORT_INSTRUMENT}
          label="Sort by : "
          htmlFor="params-sort-by"
          defaultValue={FILTER_SORT_INSTRUMENT[0].value}
          maxWidth={185}
          callback={(v) => setParams((prev) => ({ ...prev, sort: [v] }))}
          values={params?.sort?.[0] ?? FILTER_SORT_INSTRUMENT[0].value}
        />

        {params?.sort?.[0] !== defaultParams?.sort?.[0] && (
          <ButtonResetFilter callback={() => onResetFilter()} />
        )}
      </div>

      <Table
        columns={columns}
        data={instruments?.data ?? []}
        isLoading={instruments.isLoading || instruments.isFetching}
        textNew="+ New Instrument"
        handleBtnAdd={() => openPopUp("create")}
        paginationData={generatePaginationData(
          params.page,
          params.limit,
          totalInstruments.data
        )}
        onSearch={(v) => setParams((prev) => ({ ...prev, page: 1, search: v }))}
        setPages={(value) => setParams((prev) => ({ ...prev, page: value }))}
        adjustColumnSize
      />

      {isOpenPopupFormInstrument && (
        <PopupFormInstrument
          isOpen={isOpenPopupFormInstrument}
          selectedData={selectedInstrument}
          onClose={closePopUp}
          process={typePopUp}
          refresh={() => onRefreshData()}
        />
      )}
    </section>
  )
}
