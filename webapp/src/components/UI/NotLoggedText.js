import React, { useState, useEffect } from "react";

import styles from "./NotLoggedText.module.css";
import Map from "../Map/Maps";

// This component is used when the user is not logged in
const NotLoggedText = () => {
  const [coords, setCorrds] = useState({
    latitude: 43.254501,
    longitude: -5.76885,
  });
  const [display_name, setName] = useState("");

  const [isLoaded, setIsLoaded] = useState(false);

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
  }

  async function getLocation() {
    const response = await new Promise((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(resolve, reject, options)
    ).then((value) => {
      setCorrds({
        latitude: value.coords.latitude,
        longitude: value.coords.longitude,
      });
      setIsLoaded(true);
    });
  }

  // A useEffect without dependencies loads only on first componente load, otherwise a useEffect
  // with dependencies only runs when the object/s changes
  useEffect(() => {
    getCurrentCityName();
  }, [coords]);

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <div className={styles.container}>
      {isLoaded && <Map coords={coords} display_name={display_name} />}
    </div>

    // <div className={styles.container}>
    //   <p className={styles.text}>NOT LOGGED IN, PLEASE LOGIN!</p>
    // </div>
  );
};

export default NotLoggedText;
