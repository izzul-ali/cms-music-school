import { IGlobalErrorResponse } from "@/interfaces/global.interface"
import { isAxiosError } from "axios"
import { signOut } from "next-auth/react"
import { toast } from "react-toastify"
import { isDirectusError } from "@directus/errors"
import { isArray } from "lodash"

/**
 * Handling global error
 */
export async function onError(err: any) {
  console.log("t-log-global-error", err)

  err = JSON.parse(JSON.stringify(err))

  if (isAxiosError(err)) {
    const errData = err.response?.data as {
      errors: IGlobalErrorResponse[]
    }

    const firstError = errData.errors?.[0]

    if (firstError?.extensions?.code === "TOKEN_EXPIRED") {
      toast.error(firstError.message)

      await signOut({
        redirect: true,
        callbackUrl: "/login",
      })

      return
    }

    toast.error(firstError.message ?? "Something wrong happend!")

    return
  }

  if (isArray(err)) {
    const errData = err as IGlobalErrorResponse[]

    const firstError = errData?.[0]

    if (firstError?.extensions?.code === "TOKEN_EXPIRED") {
      toast.error(firstError.message)

      await signOut({
        redirect: true,
        callbackUrl: "/login",
      })

      return
    }

    toast.error(firstError.message ?? "Something wrong happend!")

    return
  }

  toast.error(err?.message ?? "Something wrong happend!")
}
