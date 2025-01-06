import { IGlobalResponse } from "@/interfaces/global.interface"
import satellite from "../satellite"
import { ILogin, ILoginResponse, ILogout } from "@/interfaces/auth.interface"
import { API_URL } from "@/utils/environment"

/**
 * Login Function
 * @param body login payload
 * @returns access token and refresh token
 */
export const login = async (
  body: ILogin
): Promise<IGlobalResponse<ILoginResponse>> => {
  const { data } = await satellite.post<IGlobalResponse<ILoginResponse>>(
    API_URL + "/auth/login",
    body
  )

  return data
}

/**
 * Logout Function
 * @param body logout payload
 * @returns success
 */
export const logout = async (body: ILogout): Promise<IGlobalResponse<any>> => {
  const { data } = await satellite.post<IGlobalResponse<any>>(
    API_URL + "/auth/logout",
    body
  )

  return data
}
