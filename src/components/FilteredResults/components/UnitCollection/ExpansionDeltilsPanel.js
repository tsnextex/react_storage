import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Accordion, Grid } from "@material-ui/core";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(16),
    flexBasis: "66.66%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

export default function ExpansionDeltilsPanel({ content = false }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    content && (
      <div className={classes.root}>
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography className={classes.heading}>{content.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container direction={"column"}>
              <Grid item xs={12} container>
                <Grid item xs={12}>
                  <Typography variant="caption">{content.text}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Grid
                    container
                    spacing={0}
                    justify="space-evenly"
                    alignItems="center"
                  >
                    {[0, 1, 2].map((value) => (
                      <Grid key={value} item>
                        details
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </div>
    )
  );
}
