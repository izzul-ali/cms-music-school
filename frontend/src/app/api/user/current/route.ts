import { IGlobalResponse } from "@/interfaces/global"
import { IUser } from "@/interfaces/user"
import satellite from "@/services/satellite"
import { API_URL } from "@/utils/environment"
import { isAxiosError } from "axios"

export async function GET() {
  try {
    const { data } = await satellite.get<IGlobalResponse<IUser>>(
      API_URL + "/users/me"
    )

    return Response.json(data, { status: 200 })
  } catch (error) {
    console.log(error)
    const internalError = { message: "Something wrong happen!" }

    if (isAxiosError(error)) {
      return Response.json(error?.response?.data ?? internalError, {
        status: error.status,
      })
    }

    return Response.json(internalError, { status: 500 })
  }
}
