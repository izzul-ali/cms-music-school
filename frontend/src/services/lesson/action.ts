"use server"

import { ACCESS_TOKEN } from "@/interfaces/auth.interface"
import { IGlobalParams } from "@/interfaces/global.interface"
import directus from "@/utils/config/directus"
import { aggregate, readItems, withToken } from "@directus/sdk"
import { cookies } from "next/headers"

export const apiGetAllLesson = async (params?: IGlobalParams) => {
  try {
    const token = (await cookies().get(ACCESS_TOKEN)?.value) ?? ""

    const lessons = await directus.request(
      withToken(
        token,
        readItems("lessons", {
          fields: [
            "*",
            {
              package: ["*"],
              teacher: ["*"],
              user_created: ["*"],
              user_updated: ["*"],
            },
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

    return lessons
  } catch (error) {
    return await new Response(JSON.stringify(error)).json()
  }
}

export const apiGetTotalLessonRows = async (params?: IGlobalParams) => {
  try {
    const token = (await cookies().get(ACCESS_TOKEN)?.value) ?? ""

    const totalData = await directus.request(
      withToken(
        token,
        aggregate("lessons", {
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
