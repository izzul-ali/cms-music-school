"use server"

import { ACCESS_TOKEN } from "@/interfaces/auth.interface"
import { IGlobalParams } from "@/interfaces/global.interface"
import {
  ICreateInstrument,
  IUpdateInstrument,
} from "@/interfaces/instrument.interface"
import directus from "@/utils/config/directus"
import {
  aggregate,
  createItem,
  deleteItem,
  readItems,
  updateItem,
  withToken,
} from "@directus/sdk"
import { cookies } from "next/headers"

export const apiGetAllInstrument = async (params?: IGlobalParams) => {
  try {
    const token = (await cookies().get(ACCESS_TOKEN)?.value) ?? ""

    const instruments = await directus.request(
      withToken(
        token,
        readItems("instruments", {
          fields: ["*"],
          filter: {
            status: {
              _eq: params?.status,
            },
          },
          ...params,
        })
      )
    )

    return instruments
  } catch (error) {
    return await new Response(JSON.stringify(error)).json()
  }
}

export const apiGetTotalInstruments = async (params?: IGlobalParams) => {
  try {
    const token = (await cookies().get(ACCESS_TOKEN)?.value) ?? ""

    const totalData = await directus.request(
      withToken(
        token,
        aggregate("instruments", {
          aggregate: { count: "*" },
          query: {
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

export const apiCreateInstrument = async (body: ICreateInstrument) => {
  try {
    const token = (await cookies().get(ACCESS_TOKEN)?.value) ?? ""

    const result = await directus.request(
      withToken(token, createItem("instruments", body as any))
    )

    return result
  } catch (error) {
    return await new Response(JSON.stringify(error)).json()
  }
}

export const apiUpdateInstrument = async (body: IUpdateInstrument) => {
  try {
    const token = (await cookies().get(ACCESS_TOKEN)?.value) ?? ""

    const result = await directus.request(
      withToken(token, updateItem("instruments", body.id, body as any))
    )

    return result
  } catch (error) {
    return await new Response(JSON.stringify(error)).json()
  }
}

export const apiDeleteInstrument = async (id: number) => {
  try {
    const token = (await cookies().get(ACCESS_TOKEN)?.value) ?? ""

    await directus.request(withToken(token, deleteItem("instruments", id)))

    return true
  } catch (error) {
    return await new Response(JSON.stringify(error)).json()
  }
}
