import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import { IGlobalResponse } from "@/interfaces/global"
import { IUser } from "@/interfaces/user"

/**
 * Fetches the user profile from the API.
 * @param enable
 * @returns current login user
 */
export function useGetCurrentUser(enable?: boolean) {
  return useQuery({
    queryKey: ["get-current-user"],
    queryFn: async () => {
      const { data } = await axios.get<IGlobalResponse<IUser>>(
        "/api/user/current"
      )

      return data
    },
    enabled: enable ?? true,
  })
}
