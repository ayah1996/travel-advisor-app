import { CssBaseline, Grid } from "@material-ui/core";
import { useEffect, useState } from "react";

import { getPlacesData } from "./api/api";

import Header from "./Components/Header/Header";
import List from "./Components/List/List";
import Map from "./Components/Map/Map";

// import LeafletMap from "./Components/LeafletMap/LeafletMap";

const App = () => {
  const [places, setPlaces] = useState([]);
  const [coords, setCoords] = useState({});
  const [bounds, setBounds] = useState(null);
  // set default coords for leaflet map
  // const [coords, setCoords] = useState({ lat: 51.507351, lng: -0.127758 });

  // set initial bounds for leaflet map
  // const [bounds, setBounds] = useState({
  //   ne: { lat: 52.531260397544685, lng: 13.438213391784672 },
  //   sw: { lat: 52.50875071915752, lng: 13.371694608215336 },
  // });

  useEffect(() => {
    const success = (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      setCoords({ lat: latitude, lng: longitude });
    };
    const error = () => {
      console.log("Unable to retrieve your location");
    };
    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  useEffect(() => {
    try {
      getPlacesData(bounds.ne, bounds.sw).then((data) => {
        setPlaces(data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [coords, bounds]);

  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List places={places} />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map setCoords={setCoords} setBounds={setBounds} coords={coords} />
        </Grid>

        {/* this code for leaflet react map  */}
        {/* <Grid item xs={12} md={4}>
          <List places={places} />
        </Grid>
        <Grid item xs={12} md={8}>
          <LeafletMap
            setCoords={setCoords}
            setBounds={setBounds}
            coords={coords}
            // bounds={bounds}
          />
        </Grid> */}
      </Grid>
    </>
  );
};

export default App;
