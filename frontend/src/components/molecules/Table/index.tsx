"use client"

import React, { Fragment, ReactNode, useEffect, useMemo, useState } from "react"
import {
  Column,
  ExpandedState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getGroupedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import _ from "lodash"
import { Button, Pagination, PaginationItem, Stack } from "@mui/material"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import LoaderTable from "./LoaderTable"
import { useSearchParams } from "next/navigation"
import SearchIcon from "@mui/icons-material/Search"
// import { IPagination } from "@interfaces/api"
import Image from "next/image"
import InputSearch from "@/components/atoms/InputSearch"
import { twMerge } from "tailwind-merge"
import { IPagination } from "@/interfaces/global.interface"

interface Props {
  adjustColumnSize?: boolean
  data?: any[]
  columns: any
  textNew?: string
  title?: string
  isLoading?: boolean
  paginationData?: IPagination
  setPages?: (p: any) => void
  valueFilter?: string
  onSearch?: (text?: string) => void
  onChangeFilter?: (e: any) => void
  isHasSearch?: boolean
  isHasFilter?: boolean
  isDisabledPagination?: boolean
  isHasTitle?: boolean
  isHasActionButton?: boolean
  handleBtnAdd?: () => any
  handleBtnSubmit?: () => any
  handleBtnCancel?: () => any
  expandable?: ExpandedState
  subRowName?: string
  customLeftComponent?: ReactNode
  customRightComponent?: ReactNode
  multiplePage?: number
}

export default function Table({
  data = [],
  columns,
  textNew,
  onSearch,
  adjustColumnSize,
  isLoading = false,
  paginationData,
  setPages,
  isDisabledPagination = false,
  isHasSearch = true,
  handleBtnAdd,
  customLeftComponent,
  customRightComponent,
  multiplePage = 10,
}: Readonly<Props>) {
  const searchParams = useSearchParams()

  const [currentPage, setCurrentPage] = useState<number>(1)

  useEffect(() => {
    if (paginationData) {
      setCurrentPage(paginationData?.currentPage)
    }
  }, [paginationData])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getRowCanExpand: () => true,
    getExpandedRowModel: getExpandedRowModel(),
  })

  const headerCustom: any = useMemo(() => {
    if (table.getHeaderGroups().length > 1) {
      const tempColumns: Column<unknown, unknown>[] = []
      const columns = table.getAllColumns().map((column) => {
        if (column.columns.length > 0) {
          tempColumns.push(...column.columns)
          return column
        }
        return { ...column, rowSpan: 2 }
      })
      if (tempColumns.length > 0) {
        columns.push(...tempColumns)
      }

      const headers = [...table.getHeaderGroups()]

      const result = columns.map((column: any) => {
        let find = false
        let headerFind: any
        headers.forEach((header) => {
          if (find) {
            return
          }
          headerFind = header.headers.find(
            (head) => head.column.id === column.id
          )
          if (headerFind) {
            find = true
          }
        })

        return {
          ...headerFind,
          rowSpan: column?.rowSpan ?? headerFind?.rowSpan,
        }
      })

      const group = _.groupBy(result, "depth")

      return Object.keys(group).map((key, i) => ({
        id: String(i),
        depth: i,
        headers: group[key],
      }))
    }
    return table.getHeaderGroups()
  }, [table.getHeaderGroups()])

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPages!(value)
    setCurrentPage(value)
  }

  return (
    <div
      className={twMerge(
        "flex flex-col justify-between w-full",
        !isDisabledPagination ? "h-full mb-16" : "mb-5",
        isLoading && "min-h-[500px]"
      )}
    >
      <div className="rounded-md overflow-auto shadow-custom2">
        {customLeftComponent || isHasSearch || textNew ? (
          <div className="flex justify-between gap-3 p-6 overflow-auto bg-neutral10 rounded-t-xl flex-wrap">
            <div className="flex gap-6 justify-between items-center flex-1">
              {customLeftComponent}

              <div className="flex items-center gap-3 w-fit">
                {customLeftComponent && customRightComponent}
                {isHasSearch && (
                  <InputSearch
                    disable={isLoading}
                    placeholder="Search"
                    callback={onSearch}
                  />
                )}
              </div>
            </div>

            <div className="flex gap-3">
              {textNew && (
                <Button
                  onClick={() => handleBtnAdd && handleBtnAdd()}
                  type="button"
                  variant="contained"
                  color="primary"
                  className="whitespace-nowrap h-fit px-3 py-2"
                >
                  {textNew}
                </Button>
              )}
            </div>
          </div>
        ) : (
          <></>
        )}

        {isLoading && (
          <LoaderTable position="absolute" text="Loading..." loading />
        )}

        {data?.length > 0 && (
          <div className="overflow-x-auto">
            <table className="table w-full bg-neutral10 rounded-none">
              <thead>
                {headerCustom.map((headerGroup: any) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header: any) => {
                      return (
                        <th
                          key={header.id}
                          className={twMerge(
                            "text-neutral70 font-medium text-left text-xs border-b border-neutral40 bg-neutral20 w-fit p-3",
                            header.id === "action" ||
                              header.id === "action1" ||
                              header.id === "action2"
                              ? "action-column"
                              : "",
                            header.id === "id" ? "text-center" : "text-left"
                          )}
                          colSpan={header.colSpan}
                          rowSpan={header.rowSpan ?? 1}
                          style={{
                            border: "1px solid #E5E7EB",
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </th>
                      )
                    })}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <Fragment key={row.id}>
                    <tr
                      onClick={
                        row.getCanExpand()
                          ? row.getToggleExpandedHandler()
                          : () => {}
                      }
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className={twMerge(
                            "text-xs p-3",
                            cell.column.id === "action" ||
                              cell.column.id === "action1" ||
                              cell.column.id === "action2"
                              ? "action-column bg-white border-separate"
                              : "",
                            cell.column.id === "no" || cell.column.id === "id"
                              ? "text-center"
                              : "text-left"
                          )}
                          style={{
                            border: "1px solid #E5E7EB",
                            width: adjustColumnSize
                              ? cell.column.getSize()
                              : undefined,
                          }}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {data?.length == 0 && searchParams.get("search") && (
          <Stack alignItems="center" spacing={2} className="bg-neutral10">
            <div className="bg-[#F6E8B5] h-12 w-12 border-[8px] border-[#FFFDE5] rounded-[28px] flex items-center justify-center">
              <SearchIcon sx={{ color: "#B18602" }} />
            </div>
            <div className="flex flex-col items-center gap-3 pb-12 text-sm">
              <h2 className="text-neutral90 font-semibold">{`Sorry!, No result found for “${searchParams.get(
                "search"
              )}”`}</h2>
              <p className="text-neutral70">
                Maybe you can try again with another keyword
              </p>
            </div>
          </Stack>
        )}
        {data?.length == 0 && !searchParams.get("search") && (
          <Stack alignItems="center" spacing={2} className="bg-neutral10 p-6">
            <Image
              src="/images/not-found.png"
              alt="data not found"
              width={130}
              height={130}
            />
            <div className="flex flex-col items-center gap-2">
              <h2 className="text-neutral90 font-semibold text-xl">
                No data available
              </h2>
              <p className="text-neutral80 text-sm">
                No data to show at this time. Create new one.
              </p>
            </div>
          </Stack>
        )}
      </div>
      {!isDisabledPagination && data?.length != 0 && (
        <div className="shadow-custom1 py-3 px-6 flex justify-between items-center gap-3 flex-wrap z-1 absolute mt-4 bottom-0 bg-white right-0 left-0">
          <p className="text-sm">{`Showing ${
            (paginationData?.currentPage! - 1) * multiplePage + 1
          } to ${
            paginationData?.currentPage! * multiplePage <
            paginationData?.totalRecords!
              ? paginationData?.currentPage! * multiplePage
              : paginationData?.totalRecords!
          } from ${paginationData?.totalRecords} entries`}</p>
          <Pagination
            className="rounded-[6px]"
            count={paginationData?.totalPage}
            page={currentPage}
            boundaryCount={3}
            siblingCount={1}
            onChange={handleChange}
            shape="rounded"
            sx={{
              "& .MuiPaginationItem-page": {
                color: "#616161",
              },
              "& .MuiPaginationItem-root.Mui-selected": {
                backgroundColor: "#EDF1FF",
                color: "#22356F",
              },
              "& .MuiPaginationItem-root:hover": {
                backgroundColor: "#EDF1FF",
              },
            }}
            renderItem={(item) => (
              <PaginationItem
                className={twMerge(
                  "text-center m-0",
                  (item.type === "start-ellipsis" ||
                    item.type === "end-ellipsis") &&
                    "border-none"
                )}
                slots={{
                  previous: () => (
                    <div className="flex items-center">
                      <ChevronLeftIcon />
                      <p>Previous</p>
                    </div>
                  ),
                  next: () => (
                    <div className="flex items-center">
                      <p>Next</p>
                      <ChevronRightIcon />
                    </div>
                  ),
                }}
                {...item}
              />
            )}
          />
        </div>
      )}
    </div>
  )
}
