import Image from 'next/image'
import styles from '@/styles/Controls.module.css'

import { useSpotify } from '@/context/spotify'

import Dial from '@/components/dial';
import AlbumCover from '@/components/album-cover';
import ProgressBar from '@/components/progress-bar';

import { SkipBack } from '@carbon/icons-react';
import { SkipForward } from '@carbon/icons-react';

import { PlayOutlineFilled } from '@carbon/icons-react';
import { PauseOutlineFilled } from '@carbon/icons-react';

export default function Controls() {
  const {
    spotifyPlayer,
    spotifyState,

    station,
    nextStation,
    previousStation,
  } = useSpotify();

  return (
    <div className={styles.controls}>
      <div>
        {!spotifyState &&
          <h1>Fail</h1>
        }
        {
          <>
            <h3>{station.name}</h3>
            <Image
              src={`/stations/${station.logo}`}
              alt=""
              width={400}
              height={400}
            />
          </>
        }
        {spotifyState &&
          <AlbumCover coverSrc={spotifyState.track_window.current_track.album.images[0].url} />
        }
        {spotifyState &&
          <div className={styles.albumDetails}>
            <h4><strong>{spotifyState.track_window.current_track.album.name}</strong></h4>
            <h2>{spotifyState.track_window.current_track.artists[0].name}</h2>
            <p>
              <strong>{spotifyState.track_window.current_track.name}</strong>
            </p>
          </div>
        }
        {spotifyState &&
          <ProgressBar />
        }
        {spotifyState &&
          <Dial />
        }

        {spotifyPlayer &&
          <div className={styles.trackControls}>
            <SkipBack size={32} onClick={() => { previousStation() }} />
            {spotifyState && spotifyState.paused &&
              <PlayOutlineFilled size={48} onClick={() => { spotifyPlayer.resume() }} />
            }
            {spotifyState && !spotifyState.paused &&
              <PauseOutlineFilled size={48} onClick={() => { spotifyPlayer.pause() }} />
            }
            <SkipForward size={32} onClick={() => { nextStation() }} />
          </div>
        }
      </div>
    </div>
  );
};