import Head from 'next/head'
import queryString from 'querystring'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import Router, { useRouter } from "next/router";
import styles from '@/styles/Callback.module.css'

import { useSpotify } from '@/context/spotify'
import { getAccessToken } from '@/utils/spotify'

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
      client_id: '6473d69081fa4218b41b12d474d97a53',
      redirect_uri: 'http://localhost:3000/callback/',
      state: stateKey,
    };

    setQp(queryString.stringify(qpParams));
  }, []);

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

  // const refresh = () => {
  //   const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  //   axios({
  //     url: 'https://accounts.spotify.com/api/token',
  //     method: 'post',
  //     headers: {
  //       Authorization: 'Basic ' + basic,
  //       'content-type': 'application/x-www-form-urlencoded',
  //     },
  //     data: queryString.stringify({
  //       grant_type: 'refresh_token',
  //       refresh_token: '',
  //     })
  //   }).then((response: any) => {
  //     if (response.status === 200) {
  //       console.log('Token Refreshed');
  //     }
  //   }).catch((err: any) => {
  //     console.log('err', err);
  //   });
  // }

  useEffect(() => {
    if (query.code) {

      getAccessToken(query.code as string).then((response: any) => {
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
          <br />
          <br />
          <div style={{ textAlign: 'center' }}>
            <a className={'btn'} href={`https://accounts.spotify.com/authorize?${qp}`}>Log In</a>
          </div>
        </div>
      </main>
    </>
  )
}
