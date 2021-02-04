import React, { useState, useEffect, useRef } from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Map, Marker, GoogleApiWrapper, InfoWindow } from "google-maps-react";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import CallIcon from "@material-ui/icons/Call";
import location_red from '../../../../img/icons/general/location_red.png';
import InfoWindowEx from './components/InfoWindowEx';

const useStyles = makeStyles((theme) => ({
  root: {
    height: "fit-content",
  },
  title: {
    fontSize: "1.3rem",
    fontWeight: 300,
  },
  icon: {
    fontSize: "1.2em",
    marginRight: ".2em",
    position: "relative",
    top: "2px",
  },
  location: { fontWeight: 200, marginLeft: "1.4em" },
  phone: { fontWeight: 200 },
  button: {
    width: "100%",
    display: "flex",
    cursor: "pointer",
    backgroundColor: "#1B3C92",
    borderRadius: 4,
    color: "white",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    padding: ".8em 0 1em 0",
    fontWeight: 700,
    marginTop: ".8em",
  },
}));

function MapContainer(props = { height: "600px" }) {

  const {
    activeMarker,
    selectedPlace,
    onMarkerClick,
    browseUnits,
    showingInfoWindow,
    height,
    propertyList,
    latLng
  } = props;

  const [mapRef, setMapRef] = useState(null);
  const [zoom, setZoom] = useState(12);

  useEffect(() => {

    // set bounds on load or list change
    if (!!mapRef && !!propertyList) getMapBounds();

  }, [mapRef, propertyList]);

  // set initial map load
  const setMap = (mapProps, map) => {
    setMapRef(map);
  };

  const classes = useStyles();

  const style = {
    width: "100%",
    height: "100%",
  };

  const containerStyle = {
    position: "relative",
    width: "inherit",
    height: height,
    paddingBottom: "1em",
  };

  // fit map to markers
  const getMapBounds = () => {

    let bounds = new props.google.maps.LatLngBounds();

    if (propertyList.length > 1) {
      
      // locations available
      propertyList.map(({ latitude, longitude }) => {
        bounds.extend({
          lat: latitude,
          lng: longitude
        });
      });
  
      mapRef.fitBounds(bounds);

    } else if (propertyList.length === 1) {

      // center of search
      bounds.extend({
        lat: Number(propertyList[0].latitude),
        lng: Number(propertyList[0].longitude)
      });

      mapRef.fitBounds(bounds);
      setTimeout(() => {
        setZoom(11);
      }, 1000);

    } else {

      // center of search
      bounds.extend({
        lat: Number(latLng[0]),
        lng: Number(latLng[1])
      });

      mapRef.fitBounds(bounds);
      setTimeout(() => {
        setZoom(11);
      }, 1000);
    }
  };

  return (
    <Map
      onReady={setMap}
      google={props.google}
      mapTypeControl={false}
      fullscreenControl={false}
      style={style}
      containerStyle={containerStyle}
      zoom={zoom}
    >
      {propertyList.map((m) => (
        <Marker
          icon={{
            url: location_red,
            anchor: new props.google.maps.Point(32,32),
            scaledSize: new props.google.maps.Size(25,25)
          }}
          position={{lat: m.latitude, lng: m.longitude}}
          onClick={(a,b) => onMarkerClick(a,b,m)}
          name={m.name}
          key={m.name}
        />
      ))}

      { !!selectedPlace &&
        <InfoWindowEx visible={showingInfoWindow} marker={activeMarker}>
          <div>
            <Typography className={classes.title} variant="h5">
              {selectedPlace.name}
            </Typography>

            <Typography variant="caption" component="p">
              <LocationOnIcon className={classes.icon} />
              {selectedPlace.search_distance.toFixed(2)} miles away
            </Typography>

            <Typography
              className={classes.location}
              variant="caption"
              component="p"
            >
              {selectedPlace.address}
            </Typography>

            <Typography
              className={classes.phone}
              variant="caption"
              component="p"
            >
              <CallIcon className={classes.icon} />
              {selectedPlace.phone}
            </Typography>
            <div className={classes.button} onClick={() => browseUnits(selectedPlace)}>
              Browse Units
            </div>
          </div>
        </InfoWindowEx>
      }
    </Map>
  );
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyB09s9IJePPEZZbuFo94H3M8x3W6RdWx9s",
})(MapContainer);
