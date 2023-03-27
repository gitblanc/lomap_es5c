import React, { useState, useEffect } from "react";

import styles from "./MapContainer.module.css";
import Map from "./Maps";
import LoadingSpinner from "../UI/LoadingSpinner";

// This component is used when the user is not logged in
const MapContainer = () => {
  const [coords, setCorrds] = useState({
    latitude: null,
    longitude: null,
  });
  const [display_name, setName] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [clickedMarker, setClickedMarker] = useState(false);

  function error() {
    setIsLoaded(false); // Change the isLoaded property to false
    alert("Sorry, no position available.");
  }
  const options = {
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 27000,
  };

  async function getCurrentCityName() {
    let url =
      "https://nominatim.openstreetmap.org/reverse?format=jsonv2" +
      "&lat=" +
      coords.latitude +
      "&lon=" +
      coords.longitude;

    const response = await fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "https://o2cj2q.csb.app",
      },
    })
      .then((response) => response.json())
      .then((data) => setName(data.display_name));

    setIsLoaded(true);

    return display_name;
  }

  async function getLocation() {
    const response = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });

    await setCorrds({
      latitude: response.coords.latitude,
      longitude: response.coords.longitude,
    });
    setIsLoaded(true);
  }

  // A useEffect without dependencies loads only on first componente load, otherwise a useEffect
  // with dependencies only runs when the object/s changes
  useEffect(() => {
    if (coords.latitude == null || coords.longitude == null) {
      return;
    }
    // getCurrentCityName();
  }, [coords]);

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <div className={styles.container}>
      {isLoaded ? (
        <React.Fragment>
          <Map
            coords={coords}
            display_name={display_name}
            // getPositionName={getCurrentCityName}
          />
          {/* <div className={styles.info_container}>
						<InfoCard position={display_name}></InfoCard>
					</div> */}
        </React.Fragment>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};

export default MapContainer;