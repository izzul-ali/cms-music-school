"use client"

import {
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Popover,
  Stack,
} from "@mui/material"
import ArrowBack from "@mui/icons-material/ArrowBack"
import { useState } from "react"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined"

interface Props {
  user?: {
    fullName?: string
    shortName?: string
    roleName?: string
    email?: string
  }
  btnBack?: boolean
  onLogout?: () => any
  onClickBtn?: () => any
}

/**
 * Pop-up profile menu in header for dekstop version
 */
export default function Profile({
  user,
  btnBack = false,
  onLogout,
  onClickBtn,
}: Readonly<Props>) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <section className="flex justify-between px-6 py-5 mt-3 items-center rounded-md shadow-custom1">
      <Stack direction="row" spacing={2} alignItems="center">
        {btnBack && (
          <IconButton
            onClick={onClickBtn}
            className="rounded-[6px] px-2 py-[6px] bg-primary hover:opacity-90"
          >
            <ArrowBack className="text-neutral10 text-base" />
          </IconButton>
        )}

        <h2 className="text-base font-semibold text-primary">
          Music School Management System
        </h2>
      </Stack>
      <div className="flex items-center gap-4">
        <Avatar
          sx={{
            bgcolor: "#EDF1FF",
            color: "#22356F",
            width: 32,
            height: 32,
            fontSize: "14px",
            fontWeight: "600",
          }}
        >
          {user?.shortName}
        </Avatar>

        <p className="text-sm font-medium text-primary max-w-40 overflow-hidden text-ellipsis whitespace-nowrap">
          {user?.fullName}
        </p>

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
          <MoreVertIcon sx={{ color: "#22356f" }} />
        </IconButton>

        <Popover
          id={"profile"}
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
                  color: "#22356F !important",
                  fontSize: "12px",
                  fontWeight: 500,
                }}
              >
                {user?.shortName}
              </Avatar>
              <div className="text-xs">
                <span className="block font-semibold text-sm text-neutral90 max-w-36 overflow-hidden text-ellipsis whitespace-nowrap">
                  {user?.fullName}
                </span>
                <span className="block text-neutral90 mt-0.5 max-w-36 overflow-hidden text-ellipsis whitespace-nowrap">
                  {user?.email}
                </span>
                <span className="block w-fit mt-2 bg-primarySurface rounded-md px-2 py-0.5 max-w-32 overflow-hidden text-ellipsis whitespace-nowrap">
                  {user?.roleName}
                </span>
              </div>
            </div>

            <Divider />

            <MenuItem
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
              onClick={() => onLogout && onLogout()}
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
  )
}
