import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { IGlobalParams } from "@/interfaces/global.interface"
import { apiGetAllUser, apiGetTotalUsers } from "./action"

/**
 * Fetches all users from the API.
 * @param params
 * @param enable
 * @returns list of user
 */
export function useGetUsers(params?: IGlobalParams, enable?: boolean) {
  return useQuery({
    queryKey: ["get-users", params],
    queryFn: async () => {
      const data = await apiGetAllUser(params)

      if (data?.errors) {
        throw data.errors
      }

      return data
    },
    enabled: enable ?? true,
    placeholderData: keepPreviousData,
  })
}

/**
 * Create a separate api request to get the total users,
 * because directus doesn't provide the total items in the response list
 * @param params
 * @param enable
 * @returns total users
 */
export function useGetTotalUsers(params?: IGlobalParams, enable?: boolean) {
  return useQuery({
    queryKey: ["get-total-users", params],
    queryFn: async () => {
      const data = await apiGetTotalUsers(params)

      if (data?.errors) {
        throw data.errors
      }

      return data
    },
    enabled: enable ?? true,
    placeholderData: keepPreviousData,
  })
}
