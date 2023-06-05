import "../styles/globals.css";
import React, { useReducer } from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import MyContext, {
  initialState,
  userReducer,
} from "../context-api/AppContext";
import Footer from "../components/Footer/Footer";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import HeaderApp from "../components/Header";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2C3333",
    },
    secondary: {
      main: "#dddddd",
    },
    warning: {
      main: "#c90d11",
    },
    success: {
      main: "#2cc50f",
    },
  },
});

type AppProps = {
  Component: React.ComponentType<any>;
  pageProps: any;
};

export default function App({ Component, pageProps }: AppProps) {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserProvider>
      <MyContext.Provider value={{ state, dispatch }}>
        <ThemeProvider theme={theme}>
          <HeaderApp />
          <Component {...pageProps} />
          <Footer />
        </ThemeProvider>
      </MyContext.Provider>
    </UserProvider>
  );
}
