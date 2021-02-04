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
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    display: "flex",
    height: "370px",
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
}));

export default function PageHero({ background_image, subtitle, title }) {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <div
        className={classes.root}
        style={{ backgroundImage: `url(${background_image})` }}
      >
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item className={classes.typoRow}>
            <Typography variant="h1" children={title} />
            <Typography variant="h4" children={subtitle} />
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
}
