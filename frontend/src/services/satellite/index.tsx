"use server"

import { ACCESS_TOKEN } from "@/interfaces/auth.interface"
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios"
import { cookies } from "next/headers"

// axios global configuration used for custom api calls from the server
const satellite = axios.create({
  withCredentials: true,
})

satellite.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // get access token obtained from login to be sent as authorization header in every api request
    const token = await cookies().get(ACCESS_TOKEN)?.value

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
