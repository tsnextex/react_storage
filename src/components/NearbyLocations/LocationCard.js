import React from "react";
import { LocationCardContainer, CustomRating } from "./style";
import { Link } from 'react-router-dom';
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import CallIcon from "@material-ui/icons/Call";

export default function LocationCard({ data = false }) {

  return (
    data && (
      <LocationCardContainer>
        <Grid item>
          <Card className="locationRoot">
            <CardActionArea>
              <CardMedia
                className="media"
                image={`https://images-dev.sroa.com/images/location/${data.images[0]?.url}`}
                title="Nearby Location"
              />
              <CardContent className="content">
                <div className="unitsFromWrapper">
                  <div className="unitsFrom">
                    <Typography
                      variant="subtitle2"
                      className="unitsFromText"
                    >
                      Units from
                    </Typography>
                  </div>
                  <div className="unitsFromPriceHolder">
                    <Typography
                      variant="h5"
                      component="span"
                      className="unitsFromPrice"
                    >
                      ${data.min_price}
                    </Typography>
                    <Typography
                      variant="body2"
                      component="span"
                      className="perMonth"
                    >
                      /month
                    </Typography>
                  </div>
                </div>
                <Typography className="locationTitle" variant="h5">
                  {data.name}
                </Typography>
                <CustomRating
                  name="read-only"
                  value={data.rating}
                  readOnly
                  className="rating"
                />
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  className="distance"
                >
                  <LocationOnIcon className="icon" />
                  {Math.trunc(data.search_distance)} miles away
                </Typography>
                <Typography className="location" variant="body2">
                  {data.address}, {data.city}, {data.state} {data.zipcode}
                </Typography>
                <Typography className="phone" variant="body2">
                  <CallIcon className="icon" />
                  {data.phone}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions justify="center" className="actions">
              <Link to={{ pathname: data.url }} style={{ width: '100%' }}>
                <Button
                  className="button"
                  color="secondary"
                  variant="contained"
                  style={{ width: '100%' }}
                >
                  Browse Units
                </Button>
              </Link>
            </CardActions>
          </Card>
        </Grid>
      </LocationCardContainer>
    )
  );
}
