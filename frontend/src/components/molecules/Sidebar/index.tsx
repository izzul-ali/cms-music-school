"use client"

import { useState } from "react"
import { styled, Theme, CSSObject, useTheme } from "@mui/material/styles"
import MuiDrawer from "@mui/material/Drawer"
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from "@mui/material"
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined"
import { twMerge } from "tailwind-merge"
import { usePathname, useRouter } from "next/navigation"
import { MENU } from "@/assets/data/menu"

interface Props {
  isOpenDrawer: boolean
  setIsOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>
}

const drawerWidth = 260

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

const PermanentDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}))

export default function Sidebar({
  isOpenDrawer,
  setIsOpenDrawer,
}: Readonly<Props>) {
  const theme = useTheme()
  const router = useRouter()
  const pathname = usePathname()
  const isMdScreen = useMediaQuery(theme.breakpoints.up("md"))

  const [isNotMinimizeSidebar, setIsNotMinimizeSidebar] =
    useState<boolean>(true)

  const handleDrawerClose = () => {
    setIsOpenDrawer(false)
  }

  const handleDrawerToggle = () => {
    if (isMdScreen) {
      setIsNotMinimizeSidebar((prev) => !prev)
      return
    }

    setIsOpenDrawer((prev) => !prev)
  }

  // Menu list
  const drawerContent = () => {
    const isOpen = isMdScreen ? isNotMinimizeSidebar : isOpenDrawer

    const pathActive = pathname.split("/").filter(Boolean)

    return (
      <>
        <DrawerHeader className="w-full flex justify-between items-center px-5 pt-6">
          {isOpen && <h1 className="font-bold">CMS</h1>}
          <MenuOutlinedIcon
            className="text-3xl cursor-pointer"
            onClick={handleDrawerToggle}
          />
        </DrawerHeader>

        <div
          className={twMerge(
            "h-full overflow-auto mt-8 pb-10 custom-scrollbar",
            isOpen ? "w-[250px] md:w-full px-3" : "px-3"
          )}
        >
          <div className={twMerge("px-2", isOpen ? "block" : "md:hidden")}>
            <span className="text-neutral80 text-xs font-semibold uppercase">
              Main Menu
            </span>
          </div>

          <div className="text-neutral80 w-full">
            <List
              sx={{
                width: "100%",
                bgcolor: "transparent",
                display: "flex",
                flexDirection: "column",
                gap: { sx: 0, md: isOpen ? 0 : 1 },
              }}
              component="nav"
            >
              {MENU.map((menu) => {
                const isActiveMenu =
                  pathActive[pathActive.length - 1] ===
                    menu?.url?.replaceAll("/", "") ||
                  pathActive[0] === menu?.url?.replaceAll("/", "") ||
                  pathname === menu.url

                return (
                  <ListItemButton
                    key={menu.key}
                    sx={{
                      color: isActiveMenu ? "#22356F" : "",
                      bgcolor: isActiveMenu ? "#EDF1FF" : "transparent",
                      ":hover": {
                        bgcolor: "#EDF1FF",
                        color: "#22356F",
                      },
                      paddingX: isOpen ? 1 : 0,
                      borderRadius: "6px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                    onClick={() => {
                      router.push(menu.url)
                      setIsOpenDrawer(false)
                    }}
                  >
                    <ListItemIcon className="min-w-fit px-3">
                      {menu.icon}
                    </ListItemIcon>

                    <ListItemText
                      primary={menu.title}
                      primaryTypographyProps={{
                        fontSize: 14,
                      }}
                      sx={{
                        display: { sx: "block", md: isOpen ? "block" : "none" },
                      }}
                    />
                  </ListItemButton>
                )
              })}
            </List>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      {/* Desktop version uses permanent drawer */}
      <PermanentDrawer
        variant="permanent"
        open={isNotMinimizeSidebar}
        sx={{
          display: { xs: "none", md: "block" },
        }}
      >
        {drawerContent()}
      </PermanentDrawer>

      {/* Mobile version uses a temporary drawer so it can be opened and closed. */}
      <Drawer
        variant="temporary"
        open={isOpenDrawer}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", md: "none" },
        }}
      >
        {drawerContent()}
      </Drawer>
    </>
  )
}
