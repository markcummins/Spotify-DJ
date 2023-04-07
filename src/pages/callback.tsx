import Head from 'next/head'
import queryString from 'querystring'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import Router, { useRouter } from "next/router";
import styles from '@/styles/Callback.module.css'

import { useSpotify } from '@/context/spotify'
import { getAccessToken } from '@/utils/spotify'

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

export default function Callback() {
  const { query } = useRouter();

  const {
    setAuthorized,
    setAccessToken,
    setRefreshToken,
  } = useSpotify();

  const [qp, setQp] = useState("");

  useEffect(() => {
    let stateKey = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;

    while (counter < 16) {
      stateKey += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }

    const qpParams = {
      response_type: 'code',
      scope: scopes.join(' '),
      client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
      redirect_uri: 'http://localhost:3000/callback/',
      state: stateKey,
    };

    setQp(queryString.stringify(qpParams));
  }, []);

  useEffect(() => {
    if (query.code) {

      getAccessToken(query.code as string).then((response: any) => {
        console.log(response);
        if (response.status === 200) {
          setAuthorized({ state: true, message: null });
          setAccessToken(response.data.access_token);
          setRefreshToken(response.data.refresh_token);

          Router.push('/radio');
        }
      }).catch((err: any) => {
        console.log('err', err);
      });
    }
  }, [query.code]);

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <main className={styles.main}>
        <div>
          <Image
            src="/spotify.svg"
            alt="Spotify Logo"
            width={240}
            height={240}
            priority
          />
          <div style={{ textAlign: 'center' }}>
            <a className={'btn'} href={`https://accounts.spotify.com/authorize?${qp}`}>Log In</a>
          </div>
        </div>
      </main>
    </>
  )
}
