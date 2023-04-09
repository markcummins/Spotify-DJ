
import Head from 'next/head'

import speak from '@/utils/tts'
import chatGPT from '@/utils/chatGPT'

import { useState, useEffect } from 'react'
import { useSpotify } from '@/context/spotify'

import Controls from '@/components/controls';

export default function Radio() {
  const [DJScript, setDJScript] = useState('');
  const [DJSpeaking, setDJSpeaking] = useState(false);
  const [audioOutputDevice, setAudioOutputDevice] = useState<any>(null);
  const [previousSongId, setPreviousSongId] = useState(null);

  const [adFrequency] = useState(3);

  const {
    deviceId,
    spotifyPlayer,
    spotifyState,
    fadeVolumeDown,
    timeRemaining,
    songCount,
    startRadio,
    setSongCount,
    station,
  } = useSpotify();

  useEffect(() => {
    if (!deviceId) {
      return;
    }

    startRadio();
  }, [deviceId]);

  useEffect(() => {
    if (!spotifyState) {
      return;
    }

    if (!previousSongId || spotifyState.track_window.current_track.id !== previousSongId) {
      console.log('new song detected', spotifyState.track_window.current_track.id, previousSongId);

      setDJScript('');
      setSongCount(songCount + 1);
      setPreviousSongId(spotifyState.track_window.current_track.id);

      if (DJSpeaking === true) {
        setDJSpeaking(false);

        spotifyPlayer.setVolume(.5);
        if (audioOutputDevice) {
          audioOutputDevice.pause();
        }
      }
    }

  }, [spotifyState]);

  useEffect(() => {
    if (timeRemaining === 60 && songCount % adFrequency === 1) {
      chatGPT(station.script, spotifyState.track_window).then((response) => {
        setDJScript(response.data.choices[0].message.content);
        console.log('script out:', response.data.choices[0].message.content);
      }).catch((error) => {
        console.log(error);
      });
    }
  }, [timeRemaining]);

  useEffect(() => {
    if (timeRemaining === 20 && DJScript.length > 0) {
      setDJSpeaking(true);
      fadeVolumeDown(.1, 500);

      const { speaker, synth } = speak(DJScript, station.dj, () => {
        spotifyPlayer.nextTrack();
      });

      setAudioOutputDevice(speaker);
    }
  }, [timeRemaining]);

  useEffect(() => {
    if (timeRemaining === 0 && DJSpeaking === true) {
      spotifyPlayer.pause();
    }
  }, [timeRemaining]);

  const [title, setTitle] = useState('AI Tunes');

  useEffect(() => {
    if (spotifyState) {
      setTitle(`AI Tunes |  ${spotifyState.track_window.current_track.name}`);
    }
  }, [spotifyState]);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Controls />
    </>
  )
}
