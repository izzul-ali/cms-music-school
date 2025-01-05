import { createTheme } from "@mui/material"

/**
 * Material UI custom theme
 */
export const theme = createTheme({
  palette: {
    primary: {
      main: "#22356F",
    },
    secondary: {
      main: "#ffffff",
    },
    success: {
      main: "#3D9944",
    },
    warning: {
      main: "#F0B500",
    },
    error: {
      main: "#D1293D",
    },
  },
  typography: {
    fontFamily: "var(--font-inter), sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "initial",
        },
        containedPrimary: {
          backgroundColor: "#22356F",
          ":hover": {
            backgroundColor: "#142043",
            boxShadow: "none",
          },
          ":focus": {
            backgroundColor: "#22356F",
            boxShadow: "none",
            outline: "2px solid #6785E1",
          },
          ":disabled": {
            backgroundColor: "#EDF1FF",
            boxShadow: "none",
          },
        },
        containedError: {
          backgroundColor: "#D1293D",
          ":hover": {
            backgroundColor: "#8C2A2A",
            boxShadow: "none",
          },
          ":focus": {
            backgroundColor: "#D1293D",
            boxShadow: "none",
            outline: "2px solid #FFDCDC",
          },
          ":disabled": {
            backgroundColor: "#FFEFF1",
            boxShadow: "none",
          },
        },
        containedSecondary: {
          backgroundColor: "#FFFFFF",
          boxShadow: "0px 0px 0px 1px #464F6029 !important",
          ":hover": {
            boxShadow: "0px 0px 0px 1px #464F6052 !important",
            backgroundColor: "#fff",
          },
          ":focus": {
            backgroundColor: "#fff",
            boxShadow: "none",
            outline: "2px solid #C2CBE8",
          },
          ":disabled": {
            boxShadow: "0px 0px 0px 1px #464F6015 !important",
            backgroundColor: "#FAFAFA",
            outline: "none",
          },
        },
        containedSuccess: {
          backgroundColor: "#3D9944",
        },
        containedWarning: {
          backgroundColor: "#F0B500",
        },
        outlined: {
          padding: "11px 12px",
          borderColor: "#464F6052",
          textTransform: "capitalize",
          fontSize: "14px",
          fontWeight: 500,
          borderRadius: "6px",
        },
        contained: {
          padding: "11px 12px",
          textTransform: "capitalize",
          fontSize: "14px",
          fontWeight: 500,
          borderRadius: "6px",
          boxShadow: "none",
        },
        text: {
          textTransform: "capitalize",
          padding: "11px 12px",
          fontSize: "14px",
          fontWeight: 500,
          borderRadius: "6px",
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          minHeight: "45px",
          height: "45px",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          minHeight: "37px",
          height: "37px",
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          padding: "6px",
        },
      },
    },
  },
  // custom breakpoint size like tailwind css breakpoint
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },
})
