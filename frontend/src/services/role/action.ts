"use server"

import { ACCESS_TOKEN } from "@/interfaces/auth.interface"
import { IGlobalParams } from "@/interfaces/global.interface"
import directus from "@/utils/config/directus"
import { readRoles, withToken } from "@directus/sdk"
import { cookies } from "next/headers"

export const apiGetAllRole = async (params?: IGlobalParams) => {
  try {
    const token = (await cookies().get(ACCESS_TOKEN)?.value) ?? ""

    const roles = await directus.request(
      withToken(
        token,
        readRoles({
          fields: ["*"],
          ...params,
        })
      )
    )

    return roles
  } catch (error) {
    return await new Response(JSON.stringify(error)).json()
  }
}
