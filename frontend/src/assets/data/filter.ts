// start the variable with the word FILTER

import { STATUS_USER } from "./global"

export const FILTER_USER_STATUS = [
  {
    value: "all",
    label: "All Status",
  },
  ...STATUS_USER,
]

export const FILTER_SORT_USER = [
  {
    value: "first_name",
    label: "Ascending",
  },
  {
    value: "-first_name",
    label: "Descending",
  },
]

export const FILTER_SORT_PAYMENT_DATE = [
  {
    value: "payment_date",
    label: "Ascending",
  },
  {
    value: "-payment_date",
    label: "Descending",
  },
]

export const FILTER_SORT_LESSON_START_DATE = [
  {
    value: "start_datetime",
    label: "Ascending",
  },
  {
    value: "-start_datetime",
    label: "Descending",
  },
]

export const FILTER_SORT_INSTRUMENT = [
  {
    value: "name",
    label: "Ascending",
  },
  {
    value: "-name",
    label: "Descending",
  },
]
