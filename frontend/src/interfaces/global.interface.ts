// https://docs.directus.io/reference/query.html
export interface IGlobalParams {
  search?: string
  status?: string
  sort?: string[]
  page?: number
  limit?: number
  offset?: number
}

export interface IGlobalResponse<T> {
  data: T
  total: any
  message?: string
}

export interface IPagination {
  currentPage: number
  nextPage?: number
  prevPage?: number
  totalRecords: number
  totalPage: number
}

export interface IGlobalErrorResponse {
  message: string
  extensions: {
    code: ErrorCode
  }
}

// https://directus.io/docs/guides/connect/errors
type ErrorCode =
  | "FAILED_VALIDATION"
  | "FORBIDDEN"
  | "INVALID_TOKEN"
  | "TOKEN_EXPIRED"
  | "INVALID_CREDENTIALS"
  | "INVALID_IP"
  | "INVALID_OTP"
  | "INVALID_PAYLOAD"
  | "INVALID_QUERY"
  | "UNSUPPORTED_MEDIA_TYPE"
  | "REQUESTS_EXCEEDED"
  | "ROUTE_NOT_FOUND"
  | "SERVICE_UNAVAILABLE"
  | "UNPROCESSABLE_CONTENT"
