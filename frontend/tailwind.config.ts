import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
      colors: {
        primary: "#22356F",
        secondary: "#FFFFFF",
        primarySurface: "#EDF1FF",
        secondarySurface: "#EDF1FF",
        menuColor: "#142043",
        error: "#FF0000",
        cardBg: "rgba(255,255,255, 0.65)",
        buttonLogin: "#3366FF",
        titleColor: "#095580",
        tableHeader: "#005c8e",
        teksBlack: "#474D66",
        teksNavi: "#101840",
        border: "#C2CBE8",
        hover: "#6785E1",
        pressed: "#142043",
        focus: "#BEC8E4",
        danger: "#D1293D",
        neutral100: "#0A0A0A",
        neutral90: "#404040",
        neutral80: "#616161",
        neutral70: "#757575",
        neutral60: "#9E9E9E",
        neutral50: "#C2C2C2",
        neutral40: "#E0E0E0",
        neutral30: "#F3F3F3",
        neutral20: "#FAFAFA",
        neutral10: "#FFFFFF",
      },
      boxShadow: {
        custom1: "0 0 4px 0 rgba(0,0,0,0.25)",
        custom2: "0 1px 4px 0 rgba(16,24,40,0.25)",
        custom3: "0px 0px 0px 1px #464F6029",
        "custom3-hover": "0px 0px 0px 1px #464F6052",
        button: "0 0 0 1px rgba(16,24,40,0.25)",
      },
    },
  },
  plugins: [],
}
export default config
