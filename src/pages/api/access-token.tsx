import axios from "axios";
import queryString from 'querystring'

const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;

const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

export default async function handler(req, res) {
  const {
    body,
    method,
  } = req

  switch (method) {
    case 'POST':
      try {
        const response = await axios({
          url: 'https://accounts.spotify.com/api/token',
          method: 'post',
          headers: {
            Authorization: 'Basic ' + basic,
            'content-type': 'application/x-www-form-urlencoded',
          },
          data: queryString.stringify({
            code: body.code,
            grant_type: 'authorization_code',
            redirect_uri: 'http://localhost:3000/callback/',
          })
        });

        res.status(response.status).json(response.data)
      }
      catch (err: any) {
        res.status(err.response.status).json(err.response.data)
      }

      break
  }
}