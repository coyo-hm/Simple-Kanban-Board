import React, { createContext } from "react";
import { GlobalStyle } from "./style/globalStyle";
import { ThemeProvider as StyledProvider } from "styled-components";
import { darkTheme, lightTheme } from "./theme/theme";
import { Theme } from "./types";

import DroppableArea from "./components/DroppableArea";
import useCustomTheme from "./hooks/useTheme";

interface IThemeContext {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<IThemeContext>({
  theme: "light",
  toggleTheme: () => {
    return null;
  },
});

function App() {
  const { theme, toggleTheme } = useCustomTheme();

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <StyledProvider theme={theme === "dark" ? darkTheme : lightTheme}>
        <GlobalStyle />
        <DroppableArea />
      </StyledProvider>
    </ThemeContext.Provider>
  );
}

export default App;
