"use server"

import { ACCESS_TOKEN } from "@/interfaces/auth.interface"
import { IGlobalParams } from "@/interfaces/global.interface"
import { ICreateUser, IUpdateUser } from "@/interfaces/user.interface"
import directus from "@/utils/config/directus"
import {
  createUser,
  deleteUser,
  readMe,
  readUsers,
  updateUser,
  withToken,
} from "@directus/sdk"
import { cookies } from "next/headers"

export const apiGetCurrentLoginUser = async (token: string) => {
  const userData = await directus.request(
    withToken(
      token,
      readMe({
        fields: ["*", { role: ["*"] }],
      })
    )
  )

  return userData
}

export const apiGetAllUser = async (params?: IGlobalParams) => {
  try {
    const token = (await cookies().get(ACCESS_TOKEN)?.value) ?? ""

    const users = await directus.request(
      withToken(
        token,
        readUsers({
          fields: ["*", { role: ["*"] }],
          filter: {
            status: {
              _eq: params?.status,
            },
          },
          ...params,
        })
      )
    )

    return users
  } catch (error) {
    return await new Response(JSON.stringify(error)).json()
  }
}

export const apiGetTotalUsers = async () => {
  try {
    const token = (await cookies().get(ACCESS_TOKEN)?.value) ?? ""

    const agr = {
      aggregate: { count: "*" },
    } as any

    const totalData = await directus.request(withToken(token, readUsers(agr)))

    return totalData?.[0]?.count ?? 0
  } catch (error) {
    return await new Response(JSON.stringify(error)).json()
  }
}

export const apiCreateUser = async (body: ICreateUser) => {
  try {
    const token = (await cookies().get(ACCESS_TOKEN)?.value) ?? ""

    const result = await directus.request(
      withToken(token, createUser(body as any))
    )

    return result
  } catch (error) {
    return await new Response(JSON.stringify(error)).json()
  }
}

export const apiUpdateUser = async (body: IUpdateUser) => {
  try {
    const token = (await cookies().get(ACCESS_TOKEN)?.value) ?? ""

    const result = await directus.request(
      withToken(token, updateUser(body.id, body as any))
    )

    return result
  } catch (error) {
    return await new Response(JSON.stringify(error)).json()
  }
}

export const apiDeleteUser = async (id: string) => {
  try {
    const token = (await cookies().get(ACCESS_TOKEN)?.value) ?? ""

    await directus.request(withToken(token, deleteUser(id)))

    return true
  } catch (error) {
    return await new Response(JSON.stringify(error)).json()
  }
}
