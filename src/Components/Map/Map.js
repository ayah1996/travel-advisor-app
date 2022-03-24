import React, { useContext } from "react";
import GoogleMapReact from "google-map-react";
import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import useStyles from "./Map.styles";
import Rating from "@material-ui/lab/Rating";
import mapStyles from "./mapStyles";
import Context from "../../Context/Context";
import { v4 as uuidv4 } from "uuid";

const Map = () => {
  const { setCoords, setBounds, coords, places, setChildClicked, weatherData } =
    useContext(Context);
  const classes = useStyles();
  const isDesktop = useMediaQuery("(min-width:600px)");

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={{ lat: 51.507351, lng: -0.127758 }}
        center={coords}
        defaultZoom={13}
        margin={[50, 50, 50, 50]}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          gestureHandling: "cooperative",
          styles: mapStyles,
        }}
        onChange={(e) => {
          setCoords({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child) => {
          setChildClicked(child);
        }}
      >
        {places?.map((place, i) => (
          <div
            className={classes.markerContainer}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={uuidv4()}
          >
            {!isDesktop ? (
              <LocationOnOutlinedIcon color="primary" fontSize="large" />
            ) : (
              <Paper elevation={3} className={classes.paper}>
                <Typography
                  className={classes.Typography}
                  variant="subtitle2"
                  gutterBottom
                >
                  {place.name}
                </Typography>
                <img
                  className={classes.pointer}
                  src={
                    place.photo
                      ? place.photo.images.large.url
                      : "https://images.pexels.com/photos/704982/pexels-photo-704982.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                  }
                  alt={place.name}
                />
                <Rating size="small" value={Number(place.rating)} readOnly />
              </Paper>
            )}
          </div>
        ))}

        {weatherData?.list?.length &&
          weatherData.list.map((data, i) => (
            <div key={uuidv4()} lat={data.coord.lat} lng={data.coord.lon}>
              <img
                src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`}
                alt="weather icon"
                height={80}
              />
            </div>
          ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
