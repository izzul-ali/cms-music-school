import { ACCESS_TOKEN } from "@interfaces/auth"
import { APIKey } from "@utils/environment"
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios"
import { cookies } from "next/headers"

const satellite = axios.create({
  headers: {
    "Content-Type": "application/json",
    apiKey: APIKey,
  },
})

satellite.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = cookies().get(ACCESS_TOKEN)?.value

    if (token) {
      config.headers.Authorization = "Bearer " + token
    }

    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

satellite.interceptors.response.use(
  function (response) {
    return response
  },
  async function (error: AxiosError) {
    return Promise.reject(error?.response?.data || error)
  }
)

export default satellite
