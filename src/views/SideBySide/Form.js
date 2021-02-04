import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import {
  Button,
  Grid,
  Typography,
  TextField,
  Container,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);
const useStyles = makeStyles((theme) => ({
  root: {
    padding: "3em",
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
  title: {
    fontSize: "25",
    fontWeight: "300",
    color: "#4A4A4A",
    textShadow: "none",
  },
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
  formContainer: { padding: theme.spacing(2) },
  button: {
    paddingTop: "12px",
    paddingBottom: "12px",
    textTransform: "capitalize",
    background: "#1B3C92",
    fontFamily: "Montserrat",
    fontSize: "10px",
    fontWeight: "bold",
    letterSpacing: 0,
    lineHeight: "11px",
    textAlign: "center",
    width: "100%",
  },
  buttonTransparent: {
    background: "transparent",
    textTransform: "none",
  },
}));

export default function Form({ form_title, input_field, button }) {

  let history = useHistory();

  const goToLookup = () => {
    const newLocation = {
      pathname: `/missing-new`,
    };
    history.push(newLocation);
  };

  return (
    <Grid
      item
      sm={6}
      theme={theme}
      className="formRoot"
      container
      alignItems="center"
      justify="center"
    >
      <Container maxWidth="sm">
        <Grid
          item
          container
          direction="column"
          justify="flex-start"
          alignItems="stretch"
        >
          <Grid item className="formTypoRow">
            <Typography
              variant="h4"
              children={form_title}
              className="formTitle"
            />
          </Grid>
          <Grid
            item
            container
            direction="column"
            className="formContainer"
            spacing={2}
          >
            {input_field.map((field) => (
              <Grid item fullWidth xs={12}>
                <TextField
                  label={field.label}
                  type={field.type || "text"}
                  id="standard-size-small"
                  defaultValue=""
                  size="small"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
            ))}
            <Grid item>
              <Typography
                style={{
                  color: "#4A4A4A",
                  fontFamily: "Montserrat",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              >
                Forgot Password?
              </Typography>
            </Grid>
          </Grid>
          <Grid
            item
            container
            direction="row"
            className="formContainer"
            spacing={2}
          >
            {button.map((butt) => (
              <Grid item fullWidth xs={12} md={6}>
                <Button
                  fullWidth
                  onClick={butt.action === "lookup" && goToLookup}
                  variant={
                    butt.background_color !== "transparent"
                      ? "contained"
                      : "outlined"
                  }
                  color={
                    butt.background_color !== "transparent"
                      ? "primary"
                      : "primary"
                  }
                  className={
                    butt.background_color === "transparent"
                      ? "formButton"
                      : "formButton"
                  }
                >
                  {butt.text}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
}
