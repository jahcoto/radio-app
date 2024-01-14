import { useEffect, useState } from 'react';
import { RadioBrowserApi } from 'radio-browser-api';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import CountryList from './CountryList';
import img from '../img/radio.jpg';

const Radio = () => {
  const [stationType, setStationType] = useState('all');
  const [stations, setStations] = useState('');
  const [countryCode, setCountryCode] = useState('');

  const setupApi = async (countryCode) => {
    const api = new RadioBrowserApi(fetch.bind(window), 'Radio Player');
    const stations = await api.searchStations({
      tag: stationType,
      limit: 32,
      countryCode: countryCode,
    });
    console.log(countryCode);

    setStations(stations);
  };
  const types = [
    'all',
    'classical',
    'country',
    'dance',
    'disco',
    'house',
    'jazz',
    'pop',
    'rap',
    'retro',
    'rock',
  ];

  useEffect(() => {
    setupApi(countryCode);
    console.log(countryCode);
  }, [countryCode]);

  const setImage = (event) => {
    event.target.src = img;
  };

  return (
    <div>
      <CountryList setCountryCode={setCountryCode} />
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
      <div className="container">
        <div className="row mx-auto">
          {stations &&
            stations.map((station, index) => {
              return (
                <div className="col col-lg-3 col-md-6 col-sm-12" key={index}>
                  <div className="card">
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
                          'MAIN_CONTROLS',
                          'VOLUME_CONTROLS',
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
