import axios from "axios";

export const getPlacesData = async (type, ne, sw) => {
  try {
    const {
      data: { data },
    } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
      {
        params: {
          bl_latitude: sw.lat,
          tr_latitude: ne.lat,
          bl_longitude: sw.lng,
          tr_longitude: ne.lng,
        },
        headers: {
          "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
          "x-rapidapi-key":
            "2780ab2661mshbe20cf36cf012d8p17cbf2jsnd54bbf72dcdc",
        },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getWeatherData = async (lat, lng) => {
  try {
    const { data } = await axios.get(
      "https://community-open-weather-map.p.rapidapi.com/find",
      {
        params: {
          lon: lng,
          lat: lat,
        },
        headers: {
          "X-RapidAPI-Host": "community-open-weather-map.p.rapidapi.com",
          "X-RapidAPI-Key":
            "ba0d7fa420msh9351fb3825cd73cp19ba28jsn409fdad2d3fa",
        },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
