import { IGlobalParams } from "@/interfaces/global.interface"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { apiGetAllLesson, apiGetTotalLessonRows } from "./action"
import { ILesson } from "@/interfaces/lesson.interface"

/**
 * Fetches all lesson from the API.
 * @param params
 * @param enable
 * @returns list of lesson
 */
export function useGetLessons(params?: IGlobalParams, enable?: boolean) {
  return useQuery({
    queryKey: ["get-lessons", params],
    queryFn: async () => {
      const data = await apiGetAllLesson(params)

      if (data?.errors) {
        throw data.errors
      }

      return data as ILesson[]
    },
    enabled: enable ?? true,
    placeholderData: keepPreviousData,
  })
}

/**
 * Create a separate api request to get the total rows,
 * because directus doesn't provide the total items in the response list
 * @param params
 * @param enable
 * @returns total lesson rows
 */
export function useGetTotalLessonRows(
  params?: IGlobalParams,
  enable?: boolean
) {
  return useQuery({
    queryKey: ["get-total-lesson-rows", params],
    queryFn: async () => {
      const data = await apiGetTotalLessonRows(params)

      if (data?.errors) {
        throw data.errors
      }

      return data
    },
    enabled: enable ?? true,
    placeholderData: keepPreviousData,
  })
}
