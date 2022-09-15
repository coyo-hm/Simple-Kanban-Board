import { useEffect, useState } from "react";
import { Theme } from "../types";

export default function useTheme() {
  const [theme, setTheme] = useState<Theme>("light");
  const setMode = (mode: Theme) => {
    mode === "light"
      ? window.localStorage.setItem("theme", "light")
      : window.localStorage.setItem("theme", "dark");
    setTheme(mode);
  };

  const toggleTheme = () => {
    theme === "light" ? setMode("dark") : setMode("light");
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem("theme");
    if (localTheme !== null) {
      if (localTheme === "dark") {
        setTheme("dark");
      } else {
        setTheme("light");
      }
    }
  }, []);

  return { theme, toggleTheme };
}
