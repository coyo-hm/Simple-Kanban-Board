import { DefaultTheme } from "styled-components";

export const darkTheme: DefaultTheme = {
  bgColor: "rgb(25, 25, 25)",
  textColor: "rgba(255, 255, 255, 0.81)",
  cardColor: "#ffffff",
  boardColor: "#DADFE9",
  boardTitleColor: "black",
  hoverColor: "#DADFE9",
  buttonHoverColor: "rgba(255, 255, 255, 0.055)",
  modal: {
    dimColor: "rgba(15, 15, 15, 0.8)",
    bgColor: "rgb(32, 32, 3)",
  },
};

export const lightTheme: DefaultTheme = {
  bgColor: "#ffffff",
  textColor: "#84837e",
  cardColor: "#ffffff",
  boardColor: "#2f3640",
  boardTitleColor: "white",
  hoverColor: "#181a1d",
  buttonHoverColor: "rgba(55, 53, 47, 0.08)",
  modal: {
    dimColor: "rgba(0, 0, 0, 0.4)",
    bgColor: "white",
  },
};
