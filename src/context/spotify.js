import axios from "axios";
import { createContext, useState, useEffect, useMemo, useContext } from "react";

import { stations } from '@/utils/stations';

const Context = createContext();

const Provider = ({ children }) => {
  const [deviceId, setDeviceId] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");

  const [spotifyPlayer, setSpotifyPlayer] = useState(null);
  const [spotifyState, setSpotifyState] = useState(null);

  const [authorized, setAuthorized] = useState({ state: false, message: null });

  const [pollrateId, setPollrateId] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [songCount, setSongCount] = useState(0);

  const [stationId, setStationId] = useState('circuitRadio');
  const [station, setStation] = useState(stations.circuitRadio);

  const playPlaylist = (station) => {
    const playlistId = `spotify${station.user}${station.id}`;
    axios({
      method: 'put',
      url: `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      data: { context_uri: playlistId },
    }).then(()=>{
      console.log('playPlaylist');
    }).catch((error)=>{
      console.log('error',error);
    }).finally(function () {
      shuffleMusic().then(()=>{
        spotifyPlayer.seek(Math.floor(Math.random() * 60) * 1000);
      });
    });
  }

  const shuffleMusic = () => {
    return axios({
      method: 'put',
      url: `https://api.spotify.com/v1/me/player/shuffle?device_id=${deviceId}&state=true`,
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
    });
  }

  const fadeVolumeUp = (volume, rate) => {
    spotifyPlayer.getVolume().then((currentVolume) => {
      if ((currentVolume + .1) < volume) {
        currentVolume + .1;
        spotifyPlayer.setVolume(currentVolume + .1).then((updatedVolume) => {
          setTimeout(() => {
            fadeVolumeUp(volume, rate);
          }, rate);
        });
      }
      else {
        spotifyPlayer.setVolume(volume);
      }
    });
  }

  const fadeVolumeDown = (volume, rate) => {
    spotifyPlayer.getVolume().then((currentVolume) => {
      if ((currentVolume - .1) > volume) {
        currentVolume - .1;
        spotifyPlayer.setVolume(currentVolume - .1).then((updatedVolume) => {
          setTimeout(() => {
            fadeVolumeDown(volume, rate);
          }, rate);
        });
      }
      else {
        spotifyPlayer.setVolume(volume);
      }
    });
  }

  const playerPosition = useMemo(() => {
    return (spotifyState)
      ? {
        paused: spotifyState.paused,
        position: spotifyState.position,
        duration: spotifyState.duration,
        updateTime: performance.now(),
      }
      : null;
  }, [spotifyState]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPollrateId(pollrateId => pollrateId + 1);
    }, 500);
    return () => clearTimeout(intervalId);
  }, []);

  useEffect(() => {
    if (playerPosition === null) {
      setTimeRemaining(0);
      return;
    }

    if (playerPosition.paused) {
      setTimeRemaining(Math.floor((playerPosition.duration - playerPosition.position) / 1000));
      return;
    }

    const ellapsedTime = performance.now() - playerPosition.updateTime;
    const runtimeRemaining = Math.floor(((playerPosition.duration - playerPosition.position) - ellapsedTime) / 1000);

    setTimeRemaining((runtimeRemaining < 0)
      ? 0
      : runtimeRemaining);

  }, [pollrateId]);

  const startRadio = () => {
    playPlaylist(station.playlist);
  }

  const nextStation = () => {
    const availableStations = Object.keys(stations);
    const isLastStation = (availableStations.indexOf(stationId) + 1) === availableStations.length;

    const nextStationIndex = isLastStation ? 0 : availableStations.indexOf(stationId) + 1;
    const nextStationId = availableStations[nextStationIndex];

    setStationId(nextStationId);
    setStation(stations[nextStationId]);
    setSongCount(0);

    playPlaylist(stations[nextStationId].playlist);
  }

  const previousStation = () => {
    const availableStations = Object.keys(stations);
    const isFirstStation = availableStations.indexOf(stationId) === 0;

    const nextStationIndex = isFirstStation ? (availableStations.length - 1) : availableStations.indexOf(stationId) - 1;
    const nextStationId = availableStations[nextStationIndex];

    setStationId(nextStationId);
    setStation(stations[nextStationId]);
    setSongCount(0);

    playPlaylist(stations[nextStationId].playlist);
  }


  const exposed = {
    authorized,
    setAuthorized,

    deviceId,
    setDeviceId,

    accessToken,
    setAccessToken,

    refreshToken,
    setRefreshToken,

    spotifyPlayer,
    setSpotifyPlayer,

    shuffleMusic,
    playPlaylist,

    fadeVolumeUp,
    fadeVolumeDown,

    songCount,
    setSongCount,

    spotifyState,
    setSpotifyState,

    station,
    setStation,

    startRadio,
    nextStation,
    previousStation,

    timeRemaining,
  };

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useSpotify = () => useContext(Context);

export default Provider;