import { createContext } from "react";

const Context = createContext({
  coords: {},
  setCoords: () => {},
  setBounds: () => {},
  childClicked: null,
  setChildClicked: () => {},
  weatherData: [],
  isLoading: false,
  type: "restaurants",
  setType: () => {},
  rating: "",
  setRating: () => {},
  //   places: [],
});

export default Context;
