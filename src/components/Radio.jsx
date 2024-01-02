import { RadioBrowserApi } from "radio-browser-api";
import { useEffect, useState } from "react";
const Radio = () => {
  const [stationType, setStationType] = useState("all");
  const [stations, setStations] = useState("");
  const setupApi = async (stationType) => {
    const api = new RadioBrowserApi(fetch.bind(window), "Radio Player");
    const stations = await api.searchStations({
      language: "english",
      tag: stationType,
      limit: 32,
    });
    console.log(stations);

    setStations(stations);
  };
  const types = [
    "all",
    "classical",
    "country",
    "dance",
    "disco",
    "house",
    "jazz",
    "pop",
    "rap",
    "retro",
    "rock",
  ];

  useEffect(() => {
    setupApi(stationType);
    console.log(stations);
  }, [stationType]);

  return <div>Radio</div>;
};

export default Radio;
