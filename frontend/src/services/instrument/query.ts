import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { IGlobalParams } from "@/interfaces/global.interface"
import { apiGetAllInstrument, apiGetTotalInstruments } from "./action"
import { IInstrument } from "@/interfaces/instrument.interface"

/**
 * Fetches all instrument from the API.
 * @param params
 * @param enable
 * @returns list of instrument
 */
export function useGetInstruments(params?: IGlobalParams, enable?: boolean) {
  return useQuery({
    queryKey: ["get-instruments", params],
    queryFn: async () => {
      const data = await apiGetAllInstrument(params)

      if (data?.errors) {
        throw data.errors
      }

      return data as IInstrument[]
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
 * @returns total instruments
 */
export function useGetTotalInstruments(
  params?: IGlobalParams,
  enable?: boolean
) {
  return useQuery({
    queryKey: ["get-total-instruments", params],
    queryFn: async () => {
      const data = await apiGetTotalInstruments(params)

      if (data?.errors) {
        throw data.errors
      }

      return data
    },
    enabled: enable ?? true,
    placeholderData: keepPreviousData,
  })
}
