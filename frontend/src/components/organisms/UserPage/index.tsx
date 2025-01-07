"use client"

import React, { useMemo, useState } from "react"
import Table from "@/components/molecules/Table"
import { createColumnHelper } from "@tanstack/react-table"
import { IUser } from "@/interfaces/user.interface"
import { IconButton } from "@mui/material"
import { useGetTotalUsers, useGetUsers } from "@/services/user/query"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined"
import ModeOutlinedIcon from "@mui/icons-material/ModeOutlined"
import dayjs from "dayjs"
import { IGlobalParams } from "@/interfaces/global.interface"
import SelectFilter from "@/components/atoms/SelectFilter"
import ButtonResetFilter from "@/components/atoms/ButtonResetFilter"
import { FILTER_SORT_USER, FILTER_USER_STATUS } from "@/assets/data/filter"
import PopupFormUser from "@/components/molecules/PopupFormUser"
import { useDeleteUser } from "@/services/user/mutation"
import { toast } from "react-toastify"
import { useGetRoles } from "@/services/role/query"
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
const columnHelper = createColumnHelper<IUser>()

// Default filter
const defaultParams: IGlobalParams = {
  limit: 10,
  page: 1,
  sort: [FILTER_SORT_USER[0].value], // default first_name ascending
}

export default function UserPage() {
  const [typePopUp, setTypePopUp] = useState<TPopupType>("create")
  const [selectedUser, setSelectedUser] = useState<IUser | undefined>()
  const [isOpenPopupFormUser, setisOpenPopupFormUser] = useState<boolean>(false)

  // Usually we can use filters that are stored in the URL query params so that the filter does not change when the web page is refreshed.
  // This time I stored it in the state to make it simpler.
  const [params, setParams] = useState<IGlobalParams>(defaultParams)

  // Get all role
  const roles = useGetRoles()

  // Get list & total users
  const users = useGetUsers(params)
  const totalUsers = useGetTotalUsers({ ...params, ...defaultParams })
  const deleteUser = useDeleteUser()

  // refresh user data after performing an action
  const onRefreshData = () => {
    users.refetch()
    totalUsers.refetch()
  }

  // Handle delete user
  const onDeleteUser = (id: string) => {
    deleteUser.mutate(id, {
      onSuccess: () => {
        toast.success("Successfully deleted user")
        onRefreshData()
      },
    })
  }

  // Open popup for view detail, update or create user
  const openPopUp = (typePopUp: TPopupType, data?: IUser) => {
    if (typePopUp !== "create") {
      setSelectedUser(data)
    }

    setTypePopUp(typePopUp)
    setisOpenPopupFormUser(true)
  }

  // Reset filter
  const onResetFilter = () => {
    setParams(() => ({
      limit: params.limit,
      offset: params.offset,
      search: params.search,
      page: params.page,
      sort: [FILTER_SORT_USER[0].value],
    }))
  }

  const closePopUp = () => {
    setTypePopUp("create")
    setisOpenPopupFormUser(false)
    setSelectedUser(undefined)
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
      columnHelper.accessor("first_name", {
        cell: ({ row }) => (
          <span className="block whitespace-nowrap overflow-hidden w-[200px] text-ellipsis">
            {row.original.first_name + " " + row.original.last_name}
          </span>
        ),
        size: 300,
        header: "Full Name",
      }),
      columnHelper.accessor("email", {
        cell: (info) => (
          <span className="block whitespace-nowrap overflow-hidden w-[200px] text-ellipsis">
            {info.getValue()}
          </span>
        ),
        size: 300,
        header: "Email Address",
      }),
      columnHelper.accessor("role", {
        cell: (info) => (
          <span className="block whitespace-nowrap overflow-hidden w-[200px] text-ellipsis">
            {info.getValue()?.name ?? "-"}
          </span>
        ),
        header: "Role",
      }),
      columnHelper.accessor("status", {
        cell: (info) => (
          <span className="block whitespace-nowrap overflow-hidden w-[200px] text-ellipsis">
            {info.getValue()}
          </span>
        ),
        size: 300,
        header: "Status",
      }),
      columnHelper.accessor("last_access", {
        cell: (info) => (
          <span className="block whitespace-nowrap">
            {info.getValue()
              ? dayjs(info.getValue()).format("DD/MM/YYYY - HH:mm")
              : "-"}
          </span>
        ),
        header: "Last Login",
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
              disabled={deleteUser.isPending}
              onClick={() => onDeleteUser(data.row.original.id!)}
            >
              <DeleteOutlineIcon className="text-[20px] cursor-pointer text-red-500" />
            </IconButton>
          </div>
        ),
      }),
    ],
    [users?.data]
  )

  return (
    <section className="flex flex-1 flex-col gap-4 px-1 pb-10">
      <div className="flex flex-wrap justify-between gap-2">
        <div className="flex gap-4">
          {/* Filter by role */}
          <SelectFilter
            data={[
              {
                value: "all",
                label: "All Role",
              },
              ...(roles.data?.map((it) => ({
                label: it.name!,
                value: it.id!,
              })) ?? []),
            ]}
            label="Role: "
            htmlFor="role-filter"
            maxWidth={300}
            callback={(v) =>
              setParams((prev) => ({
                ...prev,
                page: 1,
                role: v === "all" ? undefined : v,
              }))
            }
            values={params?.role ?? "all"}
          />

          {/* Filter by status */}
          <SelectFilter
            data={FILTER_USER_STATUS}
            label="Status: "
            htmlFor="status-filter"
            maxWidth={300}
            callback={(v) =>
              setParams((prev) => ({
                ...prev,
                page: 1,
                status: v === "all" ? undefined : v,
              }))
            }
            values={params?.status ?? "all"}
          />

          <SelectFilter
            data={FILTER_SORT_USER}
            label="Sort by : "
            htmlFor="params-sort-by"
            defaultValue={FILTER_SORT_USER[0].value}
            maxWidth={185}
            callback={(v) => setParams((prev) => ({ ...prev, sort: [v] }))}
            values={params?.sort?.[0] ?? FILTER_SORT_USER[0].value}
          />
        </div>

        {(params?.sort?.[0] !== defaultParams?.sort?.[0] ||
          params?.status ||
          params?.role) && (
          <ButtonResetFilter callback={() => onResetFilter()} />
        )}
      </div>

      <Table
        columns={columns}
        data={users?.data ?? []}
        isLoading={users.isLoading || users.isFetching}
        textNew="+ New User"
        handleBtnAdd={() => openPopUp("create")}
        paginationData={generatePaginationData(
          params.page,
          params.limit,
          totalUsers.data
        )}
        onSearch={(v) => setParams((prev) => ({ ...prev, page: 1, search: v }))}
        setPages={(value) => setParams((prev) => ({ ...prev, page: value }))}
        adjustColumnSize
      />

      {isOpenPopupFormUser && (
        <PopupFormUser
          isOpen={isOpenPopupFormUser}
          selectedData={selectedUser}
          onClose={closePopUp}
          process={typePopUp}
          refresh={() => onRefreshData()}
        />
      )}
    </section>
  )
}
