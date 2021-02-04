import React from "react";
import { CustomLoginContainer } from './style';
import { makeStyles } from "@material-ui/core/styles";
import {
  createMuiTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@material-ui/core/styles";

import { Grid } from "@material-ui/core";
import butter from "../../butter-client";
import _ from "lodash";

import Hero from "./Hero";
import Form from "./Form";

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);
const useStyles = makeStyles((theme) => ({
  root: { margin: 0 },
  heroPanel: {
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    display: "flex",
    minHeight: "370px",
    height: "fit-content",
    padding: "1em",
  },
  typoRow: {
    color: "#FFF",
    marginBottom: "1em",
    textAlign: "center",
    textShadow: "3px 2px 3px #333",
    width: "85%",
    padding: "1em",
    [theme.breakpoints.down("sm")]: {
      textShadow: "2px 1px 2px #333",
      width: "100%",
      "& h1": { fontSize: "5rem" },
    },
    [theme.breakpoints.down("xs")]: {
      padding: 0,
      "& h1": { fontSize: "3rem" },
      "& h4": { fontSize: "1.2rem" },
    },
  },
  formRow: {
    fontSize: "1.3em",
    width: "50%",
    padding: "1em",
    [theme.breakpoints.down("md")]: {
      width: "80%",
    },
    [theme.breakpoints.down("sm")]: {
      padding: 0,
      width: "100%",
    },
  },
  button: {
    background: "#CE3138",
    color: "white",
    height: "100%",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      paddingTop: "1.2em",
      paddingBottom: "1.2em",
    },
  },
}));

export default function SideBySide({ pathname = "" }) {

  // get data from butterCMS
  const [leftSide, setLeftSide] = React.useState(false);
  const [rightSide, setRightSide] = React.useState(false);
  const [leftType, setLeftType] = React.useState(false);
  const [rightType, setRightType] = React.useState(false);

  React.useEffect(() => {

    let butterPagePromise = butter.page.retrieve("side-by-side", pathname);

    Promise.all([butterPagePromise]).then((r) => {

      console.log('WHAT IS THIS', r);

      let butterPage = r[0].data.data;

      const leftFields = _.chain(butterPage)
        .get(["fields", "left", "0", "fields"], false)
        .value();

      const leftType = _.chain(butterPage)
        .get(["fields", "left", "0", "type"], false)
        .value();

      const rightFields = _.chain(butterPage)
        .get(["fields", "right", "0", "fields"], false)
        .value();

      const rightType = _.chain(butterPage)
        .get(["fields", "right", "0", "type"], false)
        .value();

      console.log({ rightFields });

      setLeftSide(leftFields);
      setRightSide(rightFields);
      setLeftType(leftType);
      setRightType(rightType);
    });

  }, [pathname]);

  return (
    <ThemeProvider theme={theme}>
      <CustomLoginContainer>
        <Grid
          className="root"
          container
          direction="row"
          justify="center"
          alignItems="stretch"
        >
          {leftSide && leftType === "hero" && <Hero {...leftSide} />}
          {rightSide && rightType === "form" && <Form {...rightSide} />}
        </Grid>
      </CustomLoginContainer>
    </ThemeProvider>
  );
}
