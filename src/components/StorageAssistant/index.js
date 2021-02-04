import React from "react";
import {
  createMuiTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Button } from "@material-ui/core";

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);
const useStyles = makeStyles((theme) => ({
  root: {
    background: "#F4F5F8",
    display: "flex",
    textAlign: "center",
    padding: ".4em",
  },
  title: {
    color: "#1B3C92",
  },
  subtitle: {
    fontWeight: 300,
    padding: ".3em",
  },
  bodyText: { fontWeight: 300 },
  sectionsRow: {
    paddingTop: "1.2em",
  },
  section: {
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    padding: "3em",
    textAlign: "left",
    letterSpacing: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    [theme.breakpoints.down("md")]: {
      height: "fit-content",
      textAlign: "center",
      alignItems: "center",
      backgroundSize: "contain",
      backgroundPosition: "center",
    },
  },
  sectionLocation: {
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    padding: "1em",
    textAlign: "center",
    letterSpacing: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down("md")]: {
      height: "fit-content",
      textAlign: "center",
      alignItems: "center",
      backgroundSize: "contain",
      backgroundPosition: "center",
    },
  },
  imageSection: {
    backgroundRepeat: "no-repeat",
    padding: "6em",
    textAlign: "right",
    letterSpacing: 0,
    display: "flex",
    flexDirection: "column",
    backgroundSize: "contain",
    backgroundPosition: "right",
    height: "inherit",
    [theme.breakpoints.down("md")]: {
      height: 160,
      textAlign: "center",
      alignItems: "center",
      backgroundSize: "contain",
      backgroundPosition: "center",
    },
  },
  sectionTitle: {
    color: "#FFF",
    fontWeight: 300,
    paddingBottom: ".4em",
  },
  sectionContent: {
    color: "#FFF",
    fontWeight: 300,
  },
  buttonWrapper: {
    paddingTop: "2em",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    [theme.breakpoints.down("sm")]: {
      alignItems: "center",
    },
  },
  button: {
    background: "#CE3138",
    position: "relative",
    bottom: 0,
  },
  buttonLocation: {
    fontSize: "0.7em",
  },
}));

export default function StorageAssistant({ content = {} }) {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      {!!Object.keys(content).length && (
        <Grid
          container
          justify="center"
          alignItems="center"
          className={classes.root}
          style={{ backgroundColor: content.background_color }}
        >
          <Grid
            item
            xs={12}
            md={window.location.pathname.includes("location") ? 12 : 10}
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid
              item
              className={classes.sectionsRow}
              container
              justify="center"
              alignItems="center"
            >
              <React.Fragment>
                <Grid
                  className={classes.imageSection}
                  item
                  xs={12}
                  sm={window.location.pathname.includes("location") ? 8 : 4}
                  style={{
                    backgroundImage: `url(${content.background_image})`,
                  }}
                ></Grid>
                <Grid
                  className={
                    window.location.pathname.includes("location")
                      ? classes.sectionLocation
                      : classes.section
                  }
                  key={content.name}
                  item
                  xs={12}
                  sm={window.location.pathname.includes("location") ? 12 : 8}
                  container
                  justify={"center"}
                  alignItems={"center"}
                >
                  <Grid
                    item
                    className={classes.titleRow}
                    container
                    justify={"center"}
                    alignItems={"center"}
                  >
                    <Typography
                      className={classes.title}
                      variant="button"
                      children={content.title}
                    />
                    <Typography
                      className={classes.subtitle}
                      variant={
                        window.location.pathname.includes("location")
                          ? "body1"
                          : "h4"
                      }
                    >
                      {content.subtitle}
                    </Typography>
                    <Typography
                      className={classes.bodyText}
                      variant={
                        window.location.pathname.includes("location")
                          ? "body2"
                          : "body1"
                      }
                    >
                      {content.body_text}
                    </Typography>
                  </Grid>
                  <div className={classes.buttonWrapper}>
                    <Button
                      children={content.button_text}
                      className={
                        window.location.pathname.includes("location")
                          ? classes.buttonLocation
                          : classes.button
                      }
                      variant="contained"
                      color="primary"
                    />
                  </div>
                </Grid>
              </React.Fragment>
            </Grid>
          </Grid>
        </Grid>
      )}
    </ThemeProvider>
  );
}
