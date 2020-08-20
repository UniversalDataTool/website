import React from "react"
import "./theme.css"
import createMuiTheme from "@material-ui/core/styles/createMuiTheme"
import { ThemeProvider } from "@material-ui/core/styles"

import * as colors from "@material-ui/core/colors"

const theme = createMuiTheme({
  palette: {
    primary: colors.blue,
    secondary: colors.blue,
  },
  typography: {
    fontFamily: '"Inter", "Roboto", sans-serif',
    fontSize: 14,
    button: {
      textTransform: "none",
    },
  },
})

export default ({ children }: any) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
