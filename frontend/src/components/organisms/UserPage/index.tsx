"use client"

import React, { useMemo, useState } from "react"
import Table from "@/components/molecules/Table"
import { createColumnHelper } from "@tanstack/react-table"
import { IUser } from "@/interfaces/user.interface"
import { IconButton } from "@mui/material"
import { useGetTotalUsers, useGetUsers } from "@/services/user/query"
import { useRouter, useSearchParams } from "next/navigation"
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

type TPopupType = "create" | "view" | "edit" | "delete"

const columnHelper = createColumnHelper<IUser>()
const defaultParams: IGlobalParams = {
  limit: 10,
  page: 1,
  sort: [FILTER_SORT_USER[0].value],
}

export default function UserPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [typePopUp, setTypePopUp] = useState<TPopupType>("create")
  const [selectedUser, setSelectedUser] = useState<IUser | undefined>()
  const [isOpenPopupFormUser, setisOpenPopupFormUser] = useState<boolean>(false)

  // Usually we can use filters that are stored in the URL query params so that the filter does not change when the web page is refreshed.
  // This time I stored it in the state to make it simpler.
  const [params, setParams] = useState<IGlobalParams>(defaultParams)

  // Get list & total users
  const users = useGetUsers(params)
  const totalUsers = useGetTotalUsers()
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
        toast.success("Successfully delete user")
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
          <SelectFilter
            data={FILTER_USER_STATUS}
            label="Status: "
            htmlFor="status-filter"
            maxWidth={300}
            callback={(v) =>
              setParams((prev) => ({
                ...prev,
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

        {(params?.sort?.[0] !== defaultParams?.sort?.[0] || params?.status) && (
          <ButtonResetFilter callback={() => onResetFilter()} />
        )}
      </div>

      <Table
        columns={columns}
        data={users?.data ?? []}
        isLoading={users.isLoading || users.isFetching}
        textNew="+ New User"
        handleBtnAdd={() => openPopUp("create")}
        paginationData={{
          currentPage: params.page!,
          totalPage: Math.ceil((totalUsers?.data ?? 0) / params.limit!),
          totalRecords: totalUsers?.data ?? 0,
          prevPage: params.page! - 1,
          nextPage: params.page! + 1,
        }}
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
