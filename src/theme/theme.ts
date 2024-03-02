import { DefaultTheme } from "styled-components";

export const darkTheme: DefaultTheme = {
  key: "dark",
  bgColor: "rgb(25, 25, 25)",
  textColor: "rgba(255, 255, 255, 0.81)",
  hoverColor: "#DADFE9",
  buttonHoverColor: "rgba(255, 255, 255, 0.055)",
  boxColor: "rgba(32,32,32,255)",
  blue: "rgb(35, 131, 226)",
  input: {
    label: "#898989",
    bgHover: "#2a2a2a",
    boxShadow: "rgba(0, 0, 0, 0.8)",
    bgFocus: "#2a2a2a",
  },
  modal: {
    dimColor: "rgba(15, 15, 15, 0.8)",
    bgColor: "rgb(32, 32, 32)",
  },
  board: { textColor: "rgba(255, 255, 255, 0.81)", bgOpacity: "4D" },
};

export const lightTheme: DefaultTheme = {
  key: "light",
  bgColor: "#ffffff",
  textColor: "#84837e",
  hoverColor: "#181a1d",
  buttonHoverColor: "rgba(55, 53, 47, 0.08)",
  blue: "rgb(35, 131, 226)",
  boxColor: "rgba(251,251,250,255)",
  input: {
    label: "#83827f",
    bgHover: "#f1f1f0",
    boxShadow: "rgba(0, 0, 0, 0.5)",
    bgFocus: "white",
  },
  modal: {
    dimColor: "rgba(0, 0, 0, 0.4)",
    bgColor: "white",
  },
  board: { textColor: "#181a1d", bgOpacity: "CC" },
};
