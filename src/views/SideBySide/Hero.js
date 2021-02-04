import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
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
    fontFamily: "Montserrat",
    color: "#FFF",
    marginBottom: "1em",
    textAlign: "left",
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
  title: { fontSize: "14", fontWeight: "bold" },
  subtitle: {
    fontSize: "35",
    fontWeight: "300",
    textShadow: "0 2px 4px 0 rgba(0,0,0,0.5)",
  },
  body: {
    fontSize: 16,
    fontWeight: 300,
    textShadow: "0 2px 4px 0 rgba(0,0,0,0.5)",
  },
}));

export default function Hero({ background, subtitle, title, body }) {

  return (
    <Grid item sm={6} theme={theme}>
      <div
        className="heroRoot"
        style={{ backgroundImage: `url(${background})` }}
      >
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item className="heroTypoRow">
            <Typography
              variant="button"
              children={title}
              className="heroTitle"
            />
            <Typography
              variant="h4"
              children={subtitle}
              className="heroSubTitle"
            />
            <Typography variant="h6" children={body} className="heroBody" />
          </Grid>
        </Grid>
      </div>
    </Grid>
  );
}
