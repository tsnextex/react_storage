import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Collapse,
  Divider,
  Grid,
  Typography,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { StorageAssistant } from "../../components";
import _ from "lodash";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  showMore: {
    textAlign: "center",
    color: "#1B3C92",
    fontSize: "10px",
    fontWeight: 700,
  },
  cardActions: {
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
  detailsList: {
    padding: theme.spacing(2),
    fontSize: "0.8em",
  },
  detailsListItem: {
    marginTop: theme.spacing(2),
    fontSize: "0.8em",
  },
  detailsListItemTitle: { fontWeight: "700" },
}));

export default function LocationDetails({
  locationObj = false,
  locationInfo = false,
  storageAssistantContent = {},
}) {
  const classes = useStyles();

  const [detailsVisible, toggleDetails] = React.useState(false);
  storageAssistantContent.background_color = "#FFF";
  storageAssistantContent.location_view = true;

  let rating = 4;
  rating = _.get(locationObj, ["rating"], 4);

  return (
    locationObj && (
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="140"
                image={locationObj.image}
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {locationInfo.name}
                </Typography>
                <Rating
                  name="read-only"
                  defaultValue={4}
                  value={rating}
                  readOnly
                />
                <Typography variant="body2" color="textSecondary">
                  {locationInfo.away}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {locationInfo.address}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {locationInfo.phone}
                </Typography>
              </CardContent>
            </CardActionArea>
            <Divider />
            <Collapse in={detailsVisible}>
              <Grid
                className={classes.detailsList}
                container
                spacing={0}
                direction="column"
                justify="flex-start"
                alignItems="flex-start"
              >
                {locationInfo.hours &&
                  locationInfo.hours.map((hoursComponent) => (
                    <div
                      className={classes.detailsListItem}
                      key={hoursComponent.title}
                    >
                      <Grid item>
                        <Typography
                          variant="caption"
                          gutterBottom
                          className={classes.detailsListItemTitle}
                        >
                          {hoursComponent.title}
                        </Typography>
                      </Grid>
                      {hoursComponent.timeUnits.map((timeUnit) => (
                        <Grid
                          item
                          container
                          direction="row"
                          justify="space-between"
                          alignItems="flex-start"
                          spacing={0}
                          key={timeUnit.name}
                        >
                          <Grid item>
                            <Typography variant="caption" color="textSecondary">
                              {timeUnit.name}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography variant="caption" color="textSecondary">
                              {timeUnit.time}
                            </Typography>
                          </Grid>
                        </Grid>
                      ))}
                    </div>
                  ))}
              </Grid>
              <Divider />
            </Collapse>
            <CardActions
              disableSpacing
              className={classes.cardActions}
              onClick={() => toggleDetails((x) => !x)}
            >
              <Typography className={classes.showMore}>
                {detailsVisible
                  ? "- Hide Location Details"
                  : "+ View Location Details"}
              </Typography>
            </CardActions>
          </Card>
        </Grid>
        <Grid item>
          <Card className={classes.root}>
            <StorageAssistant content={storageAssistantContent} />
          </Card>
        </Grid>
      </Grid>
    )
  );
}
