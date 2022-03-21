import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";

import useStyles from "./LeafletMap.styles";

import visitorIcon from "./visitorIcon";

const LeafletMap = ({ setCoords, setBounds, coords }) => {
  const classes = useStyles();

  // visitor geoLocation on the Map
  function LocationMarker() {
    const [position, setPosition] = useState(null);

    const map = useMap();

    useEffect(() => {
      map.locate().on("locationfound", function (e) {
        console.log(e);
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      });
      return function cleanup() {
        map.stopLocate();
      };
    }, [map]);

    return position === null ? null : (
      <Marker position={position} icon={visitorIcon}>
        <Popup>You are here</Popup>
      </Marker>
    );
  }

  function MyComponent() {
    const map = useMapEvents({
      dragend: (e) => {
        console.log(e.target.getCenter());
        setCoords({
          lat: e.target.getCenter().lat,
          lng: e.target.getCenter().lng,
        });
        setBounds({
          ne: e.target.getBounds()._northEast,
          sw: e.target.getBounds()._southWest,
        });
      },
    });
    return null;
  }

  return (
    <>
      <MapContainer
        style={{ width: "100%", height: "100vh" }}
        defaultCenter={coords}
        center={coords}
        zoom={12}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* <LocationMarker /> */}
        <MyComponent />
      </MapContainer>

      <h1 className={classes.test}>test</h1>
    </>
  );
};

export default LeafletMap;
