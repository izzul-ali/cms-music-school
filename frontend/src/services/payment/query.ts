import { IGlobalParams } from "@/interfaces/global.interface"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { apiGetAllPayment, apiGetTotalPaymentRows } from "./action"
import { IPayment } from "@/interfaces/payment.interface"

/**
 * Fetches all payment from the API.
 * @param params
 * @param enable
 * @returns list of payment
 */
export function useGetPayments(params?: IGlobalParams, enable?: boolean) {
  return useQuery({
    queryKey: ["get-payments", params],
    queryFn: async () => {
      const data = await apiGetAllPayment(params)

      if (data?.errors) {
        throw data.errors
      }

      return data as IPayment[]
    },
    enabled: enable ?? true,
    placeholderData: keepPreviousData,
  })
}

/**
 * Create a separate api request to get the total rows,
 * because directus doesn't provide the total items in the response list
 * @param params
 * @param enable
 * @returns total payment rows
 */
export function useGetTotalPaymentRows(
  params?: IGlobalParams,
  enable?: boolean
) {
  return useQuery({
    queryKey: ["get-total-payment-rows", params],
    queryFn: async () => {
      const data = await apiGetTotalPaymentRows(params)

      if (data?.errors) {
        throw data.errors
      }

      return data
    },
    enabled: enable ?? true,
    placeholderData: keepPreviousData,
  })
}
