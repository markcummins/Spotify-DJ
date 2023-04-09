import styles from '@/styles/Freq.module.css'
import { useSpotify } from '@/context/spotify'
import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const Freq = () => {
  const {
    station,
  } = useSpotify();

  const leadingRef = useRef(null);
  const [currentFreq, setCurrentFreq] = useState(station.frequency);

  useEffect(() => {
    let counter = {time: currentFreq};
    gsap.to(counter, {
      duration: 3,
      time: station.frequency,
      ease: "steps(30)",
      onUpdate() {
        leadingRef.current.innerHTML = counter.time.toFixed(2);
      },
      onComplete: () => {
        setCurrentFreq(station.frequency);
      }
    });

  }, [station]);

  return (
    <div className={styles.freq}>
      <span ref={leadingRef}></span>
    </div>
  );
    
};

export default Freq;