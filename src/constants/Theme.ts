import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
  //色の設定
  palette: {
    type: "light",
    primary: {
      light: "#80e27e",
      main: "#4caf50",
      dark: "#087f23",
      contrastText: "#000000",
    },
    secondary: {
      light: "#ffff72",
      main: "#ffeb3b",
      dark: "#c8b900",
      contrastText: "#000000",
    },
  },
  //テキストの設定
  typography: {
    htmlFontSize: 10,
    fontSize: 16,
    h1: {
      fontSize: 24,
    },
    body1: {
      fontSize: 16,
    },
    button: {
      textTransform: "none",
    },
  },
  //部品のスタイルの設定
  props: {
    MuiTextField: {
      color: "primary",
      variant: "outlined",
    },
    MuiButton: {
      color: "primary",
      variant: "outlined",
    },
    MuiCheckbox: {
      color: "primary",
    },
    MuiRadio: {
      color: "primary",
    },
    MuiSwitch: {
      color: "primary",
    },
  },
});
