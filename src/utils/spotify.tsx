import axios from "axios";
import queryString from 'querystring'

const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const clientSecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;
const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

console.log(clientId, clientSecret);


export const getAccessToken = (code: string) => {
  console.log('basic', basic);

  return axios({
    url: 'https://accounts.spotify.com/api/token',
    method: 'post',
    headers: {
      Authorization: 'Basic ' + basic,
      'content-type': 'application/x-www-form-urlencoded',
    },
    data: queryString.stringify({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: 'http://localhost:3000/callback/',
    })
  })
}

export const refreshAccessToken = (code: string) => {
  return axios({
    url: 'https://accounts.spotify.com/api/token',
    method: 'post',
    headers: {
      Authorization: 'Basic ' + basic,
      'content-type': 'application/x-www-form-urlencoded',
    },
    data: queryString.stringify({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: 'http://localhost:3000/callback/',
    })
  });
}
