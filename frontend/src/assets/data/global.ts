import { IOptions } from "@/components/atoms/Forms/SelectSearchForm"

export const STATUS_USER: IOptions[] = [
  {
    value: "active",
    label: "Active",
  },
  {
    value: "suspended",
    label: "Suspended",
  },
  {
    value: "invited",
    label: "Invited",
  },
  {
    value: "archived",
    label: "Archived",
  },
  {
    value: "draft",
    label: "Draft",
  },
]
