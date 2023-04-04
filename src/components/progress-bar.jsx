import styles from '@/styles/ProgressBar.module.css'
import { useState, useEffect } from 'react'
import { useSpotify } from '@/context/spotify';

export default function ProgressBar() {

  const {
    spotifyState,
    timeRemaining,
  } = useSpotify();

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!spotifyState) {
      return;
    }

    const duration = Math.floor(spotifyState.duration / 1000);
    const elapsed = duration - timeRemaining;

    setProgress(Math.floor((elapsed / duration) * 100));
  }, [timeRemaining]);

  return (
    <div className={styles.bar}>
      <div style={{ width: `${progress}%` }}></div>
    </div>
  );
};