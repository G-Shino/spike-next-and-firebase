import React from "react";
import { NextComponentType } from "next";
import Head from "next/head";
import { AppContext, AppInitialProps, AppProps } from "next/app";
import { Global } from "@emotion/core";
import { StylesProvider } from "@material-ui/styles";
import globalCSS from "./../styles/global";

const MyApp: NextComponentType<AppContext, AppInitialProps, AppProps> = ({
  Component,
  pageProps,
}) => {
  return (
    <>
      <Head>
        <title>spike-next-and-firebase</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link
          href="https://fonts.googleapis.com/css2?family=Jost:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Global styles={globalCSS} />
      <StylesProvider injectFirst>
        <Component {...pageProps} />
      </StylesProvider>
    </>
  );
};

export default MyApp;
