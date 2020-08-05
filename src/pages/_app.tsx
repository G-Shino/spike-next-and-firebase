import React from "react";
import { NextComponentType } from "next";
import { AppContext, AppInitialProps, AppProps } from "next/app";
import Head from "next/head";
import { Global } from "@emotion/core";
import { StylesProvider } from "@material-ui/styles";
import globalCSS from "./../styles/global";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Theme } from "../constants/Theme";

const MyApp: NextComponentType<AppContext, AppInitialProps, AppProps> = ({
  Component,
  pageProps,
}) => {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <ThemeProvider theme={Theme}>
        <Head>
          <title>spike-next-and-firebase</title>
        </Head>
        <Global styles={globalCSS} />
        <StylesProvider injectFirst>
          <CssBaseline />
          <Component {...pageProps} />
        </StylesProvider>
      </ThemeProvider>
    </>
  );
};

export default MyApp;
