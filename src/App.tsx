import React from "react";
import { GlobalStyle } from "./style/globalStyle";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./style/theme";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "./atoms";
import DroppableArea from "./components/DroppableArea";

function App() {
  const isDark = useRecoilValue(isDarkAtom);
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyle />
      <DroppableArea />
    </ThemeProvider>
  );
}

export default App;
