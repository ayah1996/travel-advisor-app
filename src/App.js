import { CssBaseline, Grid } from "@material-ui/core";
import { useEffect, useState } from "react";

import { getPlacesData } from "./api/api";

import Header from "./Components/Header/Header";
import List from "./Components/List/List";
import Map from "./Components/Map/Map";

function App() {
  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState(null);

  useEffect(() => {
    // Run first time
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  useEffect(() => {
    // getPlacesData(bounds.sw, bounds.ne).then((data) => {
    getPlacesData().then((data) => {
      console.log(
        "OUTPUT ~ file: App.js ~ line 17 ~ getPlacesData ~ data",
        data
      );

      setPlaces(data);
    });
  }, [bounds, coordinates]);
  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
