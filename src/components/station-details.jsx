import styles from '@/styles/StationDetails.module.css'
import { useSpotify } from '@/context/spotify'

import gsap from 'gsap';
import { TextPlugin } from "gsap/dist/TextPlugin";
import { useEffect, useRef } from 'react';

gsap.registerPlugin(TextPlugin);

export default function TrackDetails() {
  const {
    station,
    spotifyState,
  } = useSpotify();

  const refStation = useRef(null);

  useEffect(() => {
    gsap.to(refStation.current, 1, { text: station.name, ease: 'none' });
  }, [station.name]);

  return (
    <>
      {spotifyState &&
        <div className={styles.stationDetails}>
          <h2><strong ref={refStation}></strong></h2>
        </div>
      }
    </>
  )
}