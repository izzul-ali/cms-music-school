import { useMutation } from "@tanstack/react-query"
import {
  apiCreateInstrument,
  apiDeleteInstrument,
  apiUpdateInstrument,
} from "./action"
import {
  ICreateInstrument,
  IUpdateInstrument,
} from "@/interfaces/instrument.interface"

export function useCreateInstrument() {
  return useMutation({
    mutationKey: ["create-instrument"],
    mutationFn: async (body: ICreateInstrument) => {
      const data = await apiCreateInstrument(body)

      if (data?.errors) {
        throw data.errors
      }

      return data
    },
  })
}

export function useUpdateInstrument() {
  return useMutation({
    mutationKey: ["update-instrument"],
    mutationFn: async (body: IUpdateInstrument) => {
      const data = await apiUpdateInstrument(body)

      if (data?.errors) {
        throw data.errors
      }

      return data
    },
  })
}

export function useDeleteInstrument() {
  return useMutation({
    mutationKey: ["delete-instrument"],
    mutationFn: async (id: number) => {
      const data = await apiDeleteInstrument(id)

      if (data?.errors) {
        throw data.errors
      }

      return data
    },
  })
}
