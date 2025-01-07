"use server"

import { ACCESS_TOKEN } from "@/interfaces/auth.interface"
import { IGlobalParams } from "@/interfaces/global.interface"
import directus from "@/utils/config/directus"
import { aggregate, readItems, withToken } from "@directus/sdk"
import { cookies } from "next/headers"

export const apiGetAllPayment = async (params?: IGlobalParams) => {
  try {
    const token = (await cookies().get(ACCESS_TOKEN)?.value) ?? ""

    const payments = await directus.request(
      withToken(
        token,
        readItems("payments", {
          fields: [
            "*",
            { package: ["*"], user_created: ["*"], user_updated: ["*"] },
          ],
          filter: {
            package: {
              name: { _eq: params?.package },
            },
          },
          ...params,
        })
      )
    )

    return payments
  } catch (error) {
    return await new Response(JSON.stringify(error)).json()
  }
}

export const apiGetTotalPaymentRows = async (params?: IGlobalParams) => {
  try {
    const token = (await cookies().get(ACCESS_TOKEN)?.value) ?? ""

    const totalData = await directus.request(
      withToken(
        token,
        aggregate("payments", {
          aggregate: { count: "*" },
          query: {
            filter: {
              package: {
                name: { _eq: params?.package },
              },
            },
            ...params,
          },
        })
      )
    )

    return totalData?.[0]?.count ?? 0
  } catch (error) {
    return await new Response(JSON.stringify(error)).json()
  }
}
