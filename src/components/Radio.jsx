import { useEffect, useState } from "react";
import { RadioBrowserApi } from "radio-browser-api";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import CountryList from "./CountryList";
import img from "../img/radio.jpg";

const Radio = () => {
  const [stationType, setStationType] = useState("all");
  const [stations, setStations] = useState("");
  const [sountryCode, setCountryCode] = useState("");
  const setupApi = async (stationType) => {
    const api = new RadioBrowserApi(fetch.bind(window), "Radio Player");
    const stations = await api.searchStations({
      tag: stationType,
      limit: 32,
      countryCode: "CR",
    });
    // console.log(stations);

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

  const setImage = (event) => {
    event.target.src = img;
  };

  return (
    <div>
      <CountryList />
      {/* <div className="row">
        {types.map((type, index) => {
          return (
            <span className="col">
              <button
                className="btn btn-primary"
                key={index}
                onClick={() => setStationType(type)}>
                {type}
              </button>
            </span>
          );
        })}
      </div> */}
      <div>
        <div className="row mx-auto">
          {stations &&
            stations.map((station, index) => {
              return (
                <div className="col col-lg-3 col-md-6 col-sm-12" key={index}>
                  <div className="card sm:w-100">
                    <img
                      style={{ width: 80, height: 80 }}
                      className="card-img-top"
                      src={station.favicon}
                      alt=""
                      onError={setImage}
                    />
                    <div className="card-header">
                      <h6>{station.name}</h6>
                    </div>
                    <div className="card-body">
                      <AudioPlayer
                        className="player"
                        src={station.urlResolved}
                        showJumpControls={false}
                        layout="stacked"
                        customProgressBarSection={[]}
                        customControlsSection={[
                          "MAIN_CONTROLS",
                          "VOLUME_CONTROLS",
                        ]}
                        autoPlayAfterSrcChange={false}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Radio;
