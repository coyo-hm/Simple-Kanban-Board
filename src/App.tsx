import React, { createContext } from "react";
import { ThemeProvider as StyledProvider } from "styled-components";
import { Helmet } from "react-helmet";
import { GlobalStyle } from "./style/globalStyle";
import { darkTheme, lightTheme } from "./theme/theme";
import { Theme } from "./types";
import useCustomTheme from "./hooks/useTheme";
import ModalProvider from "./contexts/ModalContext";
import Header from "./components/Header";
import Toolbar from "./components/Toolbar";
import DroppableArea from "./components/DroppableArea";
import Container from "./components/Container";

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
        <Container>
          <ModalProvider>
            <Helmet>
              <title>SIMPLE KANBAN BOARD</title>
            </Helmet>
            <Header />
            <Toolbar />
            <DroppableArea />
          </ModalProvider>
        </Container>
      </StyledProvider>
    </ThemeContext.Provider>
  );
}

export default App;
