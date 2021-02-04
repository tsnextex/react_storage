import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  createMuiTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);
const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "4em",
    display: "flex",
  },
  typoRow: {
    color: "#4A4A4A",
    fontFamily: "Montserrat",
    padding: "1em",
    "& ul": { margin: "2em" },
    "& ol": { margin: "2em" },
    [theme.breakpoints.down("sm")]: {
      "& h1": { fontSize: "5rem" },
    },
    [theme.breakpoints.down("xs")]: {
      "& h1": { fontSize: "3rem" },
      "& h4": { fontSize: "1.2rem" },
    },
  },
}));

export default function TextSection({ fields = false }) {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Grid
        className={classes.root}
        container
        direction="column"
        alignContent="center"
      >
        {fields &&
          fields.map(({ type: _type, fields: _fields }) => (
            <Grid xs={12} sm={10} item className={classes.typoRow}>
              <Typography variant="h3" children={_fields.title} />
              <div dangerouslySetInnerHTML={{ __html: _fields.body_text }} />
            </Grid>
          ))}
      </Grid>
    </ThemeProvider>
  );
}
