"use client"

import React, { useMemo, useState } from "react"
import {
  Stack,
  IconButton,
  Avatar,
  MenuItem,
  ListItemIcon,
  Divider,
  ListItemText,
  Popover,
} from "@mui/material"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import MenuIcon from "@mui/icons-material/Menu"
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined"
import { signOut } from "next-auth/react"
import { usePathname } from "next/navigation"
import Profile from "@/components/atoms/Profile"
import { useGetCurrentUser } from "@/services/user/query"

interface Props {
  setIsOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Header({ setIsOpenDrawer }: Readonly<Props>) {
  const pathname = usePathname()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  // Fetch user profile data from the API
  const { data } = useGetCurrentUser()
  const user = data?.data
  const fullname = (user?.first_name ?? "") + " " + (user?.last_name ?? "")

  const formatPath = useMemo(() => {
    const pathSegment = pathname.split("/")[2]
    if (pathSegment)
      return pathSegment
        .replace(/-/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase())
    return pathname.split("/")[1].toUpperCase()
  }, [pathname])

  const shortName = fullname
    ?.split(" ")
    ?.slice(0, 2)
    ?.map((it) => it.charAt(0))
    ?.join("")

  // Open profile popup in desktop version
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  // Close profile popup in desktop version
  const handleClose = () => {
    setAnchorEl(null)
  }

  // Function to handle logout, after success will be directed to the login page
  const handleLogout = async () => {
    await signOut({
      redirect: true,
      callbackUrl: "/login",
    })

    handleClose()
  }

  return (
    <header className="w-full">
      {/* Dekstop screen */}
      <section className="hidden md:block">
        <Profile
          user={{
            fullName: fullname,
            shortName: shortName,
            roleName: user?.role ?? "-",
            email: user?.email ?? "-",
          }}
          onLogout={() => handleLogout()}
        />
      </section>

      {/* Mobile screen */}
      <section className="flex md:hidden justify-between p-5 items-center bg-primary">
        <Stack direction="row" spacing={2} alignItems="center">
          <IconButton
            sx={{ backgroundColor: "#22356F" }}
            onClick={() => setIsOpenDrawer((prev) => !prev)}
            className="p-1"
          >
            <MenuIcon className="text-neutral10 text-2xl" />
          </IconButton>
          <div className="text-sm text-white">{formatPath}</div>
        </Stack>
        <div className="flex items-center gap-4">
          <Avatar
            sx={{ bgcolor: "#EDF1FF", width: 30, height: 30 }}
            className="text-xs text-primaryMain"
          >
            {shortName}
          </Avatar>

          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            sx={{
              ":hover": {
                bgcolor: "#EDF1FF33",
              },
            }}
          >
            <MoreVertIcon sx={{ color: "#ffffff" }} />
          </IconButton>

          <Popover
            id="profile"
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            sx={{ marginTop: "15px" }}
          >
            <div className="bg-white w-[240px] rounded-md overflow-hidden">
              <div className="flex items-start p-4 gap-3">
                <Avatar
                  sx={{
                    width: "32px",
                    height: "32px",
                    bgcolor: "#EDF1FF",
                    color: "#22356F",
                    fontSize: "12px",
                    fontWeight: 500,
                  }}
                >
                  {shortName}
                </Avatar>
                <div className="text-xs">
                  <span className="block font-semibold text-sm text-neutral90 max-w-36 overflow-hidden text-ellipsis whitespace-nowrap">
                    {fullname}
                  </span>
                  <span className="block text-neutral90 mt-0.5 max-w-36 overflow-hidden text-ellipsis whitespace-nowrap">
                    {user?.email ?? "-"}
                  </span>
                </div>
              </div>

              <Divider />

              <MenuItem
                onClick={() => handleLogout()}
                sx={{
                  "& .MuiTypography-root": {
                    fontSize: "12px",
                    fontWeight: 500,
                    color: "#404040",
                  },
                  "& .MuiListItemIcon-root": {
                    minWidth: "fit-content",
                  },
                }}
                className="px-4 py-3.5 hover:bg-[#EDF1FF]"
              >
                <ListItemText>Logout</ListItemText>

                <ListItemIcon>
                  <ExitToAppOutlinedIcon className="text-neutral90 text-base" />
                </ListItemIcon>
              </MenuItem>
            </div>
          </Popover>
        </div>
      </section>
    </header>
  )
}
