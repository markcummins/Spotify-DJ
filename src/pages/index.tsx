import Head from 'next/head'
import Image from 'next/image'

import queryString from 'querystring'
import styles from '@/styles/Home.module.css'

import { useState, useEffect } from 'react'

const imgSize = 80;

// https://developer.spotify.com/documentation/general/guides/authorization/scopes/
const scopes = [
  'ugc-image-upload',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'app-remote-control',
  'streaming',
  'playlist-read-private',
  'playlist-read-collaborative',
  'playlist-modify-private',
  'playlist-modify-public',
  'user-follow-modify',
  'user-follow-read',
  'user-read-playback-position',
  'user-top-read',
  'user-read-recently-played',
  'user-library-modify',
  'user-library-read',
  'user-read-email',
  'user-read-private',
];

const getStateKey = () => {
  let stateKey = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;

  while (counter < 16) {
    stateKey += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }

  return stateKey;
}

const qpParams = {
  response_type: 'code',
  scope: scopes.join(' '),
  client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
  redirect_uri: 'http://localhost:3000/callback/',
  state: getStateKey(),
};

export default function Home() {
  const [qp, setQp] = useState("");

  useEffect(() => {
    setQp(queryString.stringify(qpParams));
  }, []);

  return (
    <>
      <Head>
        <title>AI Tunes</title>
      </Head>
      <div>
        <div className={styles.logo}>
          <a href="/radio">
            <Image
              src="/ai-tunes.svg"
              alt="Spotify Logo"
              className={styles.vercelLogo}
              width={200}
              height={200}
            />
          </a>
        </div>
        <div className={styles.intro}>
          <h2><strong>Tune in</strong> and crank the volume to your favorite <strong>AI Powered</strong> Radio Stations</h2>
        </div>
        <br />
        <div className={styles.stations}>
          <div>
            <Image
              src="/stations/circuit-radio.svg"
              alt=""
              width={imgSize}
              height={imgSize}
            />
          </div>
          <div>
            <Image
              src="/stations/kpop.svg"
              alt=""
              width={imgSize}
              height={imgSize}
            />
          </div>
          <div>
            <Image
              src="/stations/midnight-groove.svg"
              alt=""
              width={imgSize}
              height={imgSize}
            />
          </div>
          <div>
            <Image
              src="/stations/outcast.svg"
              alt=""
              width={imgSize}
              height={imgSize}
            />
          </div>
          <div>
            <Image
              src="/stations/revolution-radio.svg"
              alt=""
              width={imgSize}
              height={imgSize}
            />
          </div>
          <div>
            <Image
              src="/stations/thunder-radio.svg"
              alt=""
              width={imgSize}
              height={imgSize}
            />
          </div>
          <div>
            <Image
              src="/stations/west-coast-waves.svg"
              alt=""
              width={imgSize}
              height={imgSize}
            />
          </div>
        </div>
        <br />
        <br />
        <div style={{ textAlign: 'center' }}>
          <a className={'btn'} href={`https://accounts.spotify.com/authorize?${qp}`}>Log In with Spotify</a>
        </div>
      </div>
    </>
  )
}
