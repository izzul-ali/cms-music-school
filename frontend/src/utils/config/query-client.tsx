import {
  isServer,
  MutationCache,
  QueryCache,
  QueryClient,
} from "@tanstack/react-query"
import { onError } from "../helpers/error"

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
      onError: onError,
    }),
    mutationCache: new MutationCache({
      onError: onError,
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
