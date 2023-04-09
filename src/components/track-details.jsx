import styles from '@/styles/TrackDetails.module.css'
import { useSpotify } from '@/context/spotify'

import gsap from 'gsap';
import { TextPlugin } from "gsap/dist/TextPlugin";
import { useEffect, useRef } from 'react';
import AlbumCover from '@/components/album-cover';

gsap.registerPlugin(TextPlugin);

export default function TrackDetails() {
  const {
    spotifyState,
  } = useSpotify();

  const refAlbumName = useRef(null);
  const refArtistName = useRef(null);
  const refTrackName = useRef(null);

  useEffect(() => {
    gsap.to(refAlbumName.current, 2, { text: spotifyState.track_window.current_track.album.name, ease: 'none' });
    gsap.to(refArtistName.current, 2, { text: spotifyState.track_window.current_track.artists[0].name, ease: 'none' });
    gsap.to(refTrackName.current, 2, { text: spotifyState.track_window.current_track.name, ease: 'none' });
  }, [spotifyState.track_window.current_track.album.name]);

  return (
    <>
      {spotifyState &&
        <div className={styles.trackDetails}>
          <h2><strong ref={refArtistName}></strong></h2>
          <AlbumCover coverSrc={spotifyState.track_window.current_track.album.images[0].url} />
          <h3><strong ref={refAlbumName}></strong></h3>
          <p>
            <i ref={refTrackName}></i>
          </p>
        </div>
      }
    </>
  )
}