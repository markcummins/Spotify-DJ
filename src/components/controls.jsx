import styles from '@/styles/Controls.module.css'

import { useSpotify } from '@/context/spotify'

import Freq from '@/components/freq';
import TrackDetails from '@/components/track-details';
import StationDetails from '@/components/station-details';
import ProgressBar from '@/components/progress-bar';

import { SkipBack } from '@carbon/icons-react';
import { SkipForward } from '@carbon/icons-react';

import { PauseFilled } from '@carbon/icons-react';
import { PlayFilledAlt } from '@carbon/icons-react';

export default function Controls() {
  const {
    spotifyPlayer,
    spotifyState,

    nextStation,
    previousStation,
  } = useSpotify();

  return (
    <div className={styles.controls}>
      <div>
        {spotifyState &&
          <>


            <div className={styles.trackWrap}>
              <div className={styles.cardHeaderWrap}>
                <Freq />
                <StationDetails />
              </div>

              <div className={styles.cardMainWrap}>
                <TrackDetails />
              </div>

              <div className={styles.cardFooterWrap}>

                <ProgressBar />

                <div className={styles.trackControls}>
                  <SkipBack size={32} onClick={() => { previousStation() }} />
                  {spotifyState && spotifyState.paused &&
                    <PlayFilledAlt size={48} onClick={() => {
                      console.log(spotifyPlayer);
                      spotifyPlayer.resume().then(() => {
                        console.log('Resumed!');
                      });
                    }} />
                  }
                  {spotifyState && !spotifyState.paused &&
                    <PauseFilled size={48} onClick={() => {
                      console.log(spotifyPlayer);
                      spotifyPlayer.pause().then(() => {
                        console.log('Paused!');
                      });
                    }} />
                  }
                  <SkipForward size={32} onClick={() => { nextStation() }} />
                </div>
              </div>

            </div>
          </>
        }
      </div>
    </div>
  );
};