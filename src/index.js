import React from "react";
import { render } from "react-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import "typeface-montserrat";
import "./index.css";
import { App } from "./App";
import * as serviceWorker from "./serviceWorker";
import client from "./apollo";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const THEME = createMuiTheme({
  typography: {
    fontFamily: `"Montserrat", sans-serif`,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
});

const ReactApp = () => (
  <ApolloProvider client={client}>
    <MuiThemeProvider theme={THEME}>
      <App />
    </MuiThemeProvider>
  </ApolloProvider>
);

render(<ReactApp />, document.getElementById("root"));
// ReactDOM.render(<ApolloApp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();