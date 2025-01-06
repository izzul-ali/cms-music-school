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
