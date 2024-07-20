import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: ["bg-emerald-800", "bg-sky-600", "bg-pink-900"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
        slideInFromLeft: {
          "0%": {
            transform: "translateX(-20%)",
            opacity: "0",
          },
          "100%": {
            transform: "translateX(0)",
            opacity: "1",
          },
        },
        slideInFromRight: {
          "0%": {
            transform: "translateX(20%)",
            opacity: "0",
          },
          "100%": {
            transform: "translateX(0)",
            opacity: "1",
          },
        },
        slideInFromBottom: {
          "0%": {
            transform: "translateY(40%)",
            opacity: "0",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
      },
      animation: {
        scroll:
          "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
        slideInFromLeft: "slideInFromLeft 1s ease-out forwards",
        slideInFromRight: "slideInFromRight 1s ease-out forwards",
        slideInFromBottom: "slideInFromBottom 1s ease-out forwards",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui(),
    addVariablesForColors,
    function ({ addUtilities }: { addUtilities: any }) {
      const newAnimationDelays = {
        ".delay-0": {
          animationDelay: "0s",
        },
        ".delay-500": {
          animationDelay: "0.5s",
        },
        ".delay-1000": {
          animationDelay: "1s",
        },
        ".delay-1500": {
          animationDelay: "1.5s",
        },
        ".delay-2000": {
          animationDelay: "2s",
        },
      };
      addUtilities(newAnimationDelays, ["responsive", "hover"]);
    },
  ],
};

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}

export default config;
