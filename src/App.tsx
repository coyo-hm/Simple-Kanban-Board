import React, { createContext } from "react";
import { GlobalStyle } from "./style/globalStyle";
import { ThemeProvider as StyledProvider } from "styled-components";
import { darkTheme, lightTheme } from "./theme/theme";
import { Theme } from "./types";
import useCustomTheme from "./hooks/useTheme";

import Home from "./components/Home";

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
        <Home />
      </StyledProvider>
    </ThemeContext.Provider>
  );
}

export default App;
