import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { apiGetUniquePackages } from "./action"

/**
 * Fetches all unique package from the API.
 * @param params
 * @param enable
 * @returns list of unique package
 */
export function useGetUniquePackages(enable?: boolean) {
  return useQuery({
    queryKey: ["get-unique-packages"],
    queryFn: async () => {
      const data = await apiGetUniquePackages()

      if (data?.errors) {
        throw data.errors
      }

      return data as { name: string }[]
    },
    enabled: enable ?? true,
    placeholderData: keepPreviousData,
  })
}
