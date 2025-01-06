import { IGlobalParams } from "@/interfaces/global.interface"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { apiGetAllRole } from "./action"
import { IRole } from "@/interfaces/role.interface"

/**
 * Fetches all users from the API.
 * @param params
 * @param enable
 * @returns list of user
 */
export function useGetRoles(params?: IGlobalParams, enable?: boolean) {
  return useQuery({
    queryKey: ["get-roles", params],
    queryFn: async () => {
      const data = await apiGetAllRole(params)

      if (data?.errors) {
        throw data.errors
      }

      return data as IRole[]
    },
    enabled: enable ?? true,
    placeholderData: keepPreviousData,
  })
}
