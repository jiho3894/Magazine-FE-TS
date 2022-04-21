import "tailwindcss/tailwind.css";
import "./shared/Global.css";
import { useRecoilValue } from "recoil";
import { ThemeProvider } from "styled-components";
import { CircularProgress } from "@mui/material";
import { Suspense } from "react";
import { ThemeEnums, themeState } from "./recoil/atoms";
import { Darktheme, lightTheme } from "./shared/theme";
import { GlobalStyle } from "./shared/GlobalStyle";
import Router from "./router/Router";

function App() {
  const theme = useRecoilValue(themeState);
  const { DARK } = ThemeEnums;
  return (
    <ThemeProvider theme={theme !== DARK ? Darktheme : lightTheme}>
      <GlobalStyle />
      <Router />
    </ThemeProvider>
  );
}

export default App;
