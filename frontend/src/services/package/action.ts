"use server"

import { ACCESS_TOKEN } from "@/interfaces/auth.interface"
import directus from "@/utils/config/directus"
import { readItems, withToken } from "@directus/sdk"
import { cookies } from "next/headers"

export const apiGetUniquePackages = async () => {
  try {
    const token = (await cookies().get(ACCESS_TOKEN)?.value) ?? ""

    const packages = await directus.request(
      withToken(
        token,
        readItems("packages", {
          fields: ["*"],
          groupBy: ["name"],
        })
      )
    )

    return packages
  } catch (error) {
    return await new Response(JSON.stringify(error)).json()
  }
}
