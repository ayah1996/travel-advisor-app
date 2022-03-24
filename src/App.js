import { CssBaseline, Grid } from "@material-ui/core";
import { useEffect, useState } from "react";

import { getPlacesData, getWeatherData } from "./api/api";

import Header from "./Components/Header/Header";
import List from "./Components/List/List";
import Map from "./Components/Map/Map";
import Context from "./Context/Context";

const App = () => {
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  const [coords, setCoords] = useState({});
  const [bounds, setBounds] = useState({});

  const [childClicked, setChildClicked] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState("");

  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    // user location
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
    const filteredPlaces = places.filter((place) => place.rating > rating);
    setFilteredPlaces(filteredPlaces);
  }, [rating]);

  useEffect(() => {
    if (bounds.sw && bounds.ne) {
      setIsLoading(true);
      getWeatherData(coords.lat, coords.lng).then((data) => {
        setWeatherData(data);
      });

      getPlacesData(type, bounds.ne, bounds.sw).then((data) => {
        setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
        setFilteredPlaces([]);
        setIsLoading(false);
      });
    }
  }, [bounds, type]);

  return (
    <Context.Provider
      value={{
        setCoords,
        setBounds,
        coords,
        setChildClicked,
        weatherData,
        childClicked,
        isLoading,
        type,
        setType,
        rating,
        setRating,
        places: filteredPlaces.length ? filteredPlaces : places,
      }}
    >
      <>
        <CssBaseline />
        <Header />
        <Grid container spacing={3} style={{ width: "100%" }}>
          <Grid item xs={12} md={4}>
            <List />
          </Grid>
          <Grid item xs={12} md={8}>
            <Map />
          </Grid>
        </Grid>
      </>
    </Context.Provider>
  );
};

export default App;
