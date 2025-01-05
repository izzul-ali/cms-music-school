import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined"
import MusicVideoOutlinedIcon from "@mui/icons-material/MusicVideoOutlined"
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined"
import CastForEducationOutlinedIcon from "@mui/icons-material/CastForEducationOutlined"
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined"

export const URL_DASHBOARD = "/"
export const URL_INSTRUMENT = "/instrument"
export const URL_USER = "/user"
export const URL_LESSON = "/lesson"
export const URL_PAYMENT = "/payment"

export const MENU = [
  {
    key: "dashboard",
    icon: <DashboardOutlinedIcon className="text-xl text-neutral80" />,
    title: "Dashboard",
    url: URL_DASHBOARD,
  },
  {
    key: "instrument",
    icon: <MusicVideoOutlinedIcon className="text-xl text-neutral80" />,
    title: "Instrument",
    url: URL_INSTRUMENT,
  },
  {
    key: "lesson",
    icon: <CastForEducationOutlinedIcon className="text-xl text-neutral80" />,
    title: "Lesson",
    url: URL_LESSON,
  },
  {
    key: "payment",
    icon: <PaymentOutlinedIcon className="text-xl text-neutral80" />,
    title: "Payment",
    url: URL_PAYMENT,
  },
  {
    key: "user",
    icon: <PeopleOutlineOutlinedIcon className="text-xl text-neutral80" />,
    title: "User",
    url: URL_USER,
  },
]
