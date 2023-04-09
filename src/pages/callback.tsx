import Head from 'next/head'

import axios from "axios";
import queryString from 'querystring'

import { useEffect } from 'react'
import Router, { useRouter } from "next/router";

import { useSpotify } from '@/context/spotify'

import { Gift } from '@carbon/icons-react';
import styles from '@/styles/Callback.module.css'

export default function Callback() {
  const { query } = useRouter();

  const {
    setAuthorized,
    setAccessToken,
    setAccessTokenExpiry,
    setRefreshToken,
  } = useSpotify();

  useEffect(() => {
    if (query.code) {
      axios({
        method: 'post',
        url: `/api/access-token`,
        data: queryString.stringify({
          code: query.code,
        })
      }).then((response: any) => {
        if (response.status === 200) {

          setAuthorized({ state: true, message: null });
          setAccessToken(response.data.access_token);

          const currentTime = Math.floor(Date.now() / 1000);
          setAccessTokenExpiry(currentTime + response.data.expires_in);

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
        <title>Connecting...</title>
      </Head>
      <div className={styles.connecting}>
        <div>
          <Gift size={80} />
          <h2 style={{ marginBottom: '4px' }}>
            <strong>Setting things up...</strong>
          </h2>
          <p><i>Booting up your Digital DJ's</i></p>
        </div>
      </div>
    </>
  )
}
