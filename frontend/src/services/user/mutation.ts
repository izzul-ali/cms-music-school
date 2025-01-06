import { useMutation } from "@tanstack/react-query"
import { apiCreateUser, apiDeleteUser, apiUpdateUser } from "./action"
import { ICreateUser, IUpdateUser } from "@/interfaces/user.interface"

export function useCreateUser() {
  return useMutation({
    mutationKey: ["create-user"],
    mutationFn: async (body: ICreateUser) => {
      const data = await apiCreateUser(body)

      if (data?.errors) {
        throw data.errors
      }

      return data
    },
  })
}

export function useUpdateUser() {
  return useMutation({
    mutationKey: ["update-user"],
    mutationFn: async (body: IUpdateUser) => {
      const data = await apiUpdateUser(body)

      if (data?.errors) {
        throw data.errors
      }

      return data
    },
  })
}

export function useDeleteUser() {
  return useMutation({
    mutationKey: ["delete-user"],
    mutationFn: async (id: string) => {
      const data = await apiDeleteUser(id)

      if (data?.errors) {
        throw data.errors
      }

      return data
    },
  })
}
