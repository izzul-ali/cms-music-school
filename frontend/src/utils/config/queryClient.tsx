import {
  isServer,
  MutationCache,
  QueryCache,
  QueryClient,
} from "@tanstack/react-query"
import { toast } from "react-toastify"

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
    // handle errors globally by displaying a toast containing the error message
    queryCache: new QueryCache({
      onError: (err) => {
        console.log("t-log-query-error", err)
        toast.error(err?.message ?? "Something wrong happend!")
      },
    }),
    mutationCache: new MutationCache({
      onError: (err) => {
        console.log("t-log-mutation-error", err)
        toast.error(err?.message ?? "Something wrong happend!")
      },
    }),
  })
}

let browserQueryClient: QueryClient | undefined = undefined

function getQueryClient() {
  if (isServer) {
    return makeQueryClient()
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient
  }
}

/**
 * react-query global configuration to handle api cache and global errors
 */
export const queryClient = getQueryClient()
