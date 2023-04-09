import axios from "axios";
import queryString from 'querystring'

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

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
            grant_type: 'refresh_token',
            refresh_token: body.token,
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