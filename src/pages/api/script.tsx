import axios from "axios";

const getTracks = (trackWindow: any) => {
  let currentTrack = null;
  let nextTrack = null;

  currentTrack = trackWindow.current_track;
  if (trackWindow.next_tracks.length > 0) {
    nextTrack = trackWindow.next_tracks[0];
  }

  return {
    currentTrack: currentTrack,
    nextTrack: nextTrack,
  };
}

const generateScript = (script: any, currentTrack: any, nextTrack: any) => {

  const scriptPieces = [script.intro];

  const randomScripts = [...script.prompts];
  const currentScript = randomScripts.sort(function () {
    return Math.random() - 0.5;
  }).slice(0, 1);

  currentScript.forEach((item) => {
    scriptPieces.push(item);
  });

  if (nextTrack) {
    scriptPieces.push();
    scriptPieces.push(`Finally, tell the listener that the next song is called {nextTrackName} by the artist {nextTrackArtistName}`);
  }

  const tokens = [
    { key: '{currentTrackName}', value: currentTrack.name },
    { key: '{currentTrackArtistName}', value: currentTrack.artists[0].name },
    { key: '{nextTrackName}', value: nextTrack.name },
    { key: '{nextTrackArtistName}', value: nextTrack.artists[0].name },
  ]

  let renderedScript = scriptPieces.join('. ');
  tokens.forEach((tkn) => {
    const expression = new RegExp(`${tkn.key}`, "g");
    renderedScript = renderedScript.replace(expression, tkn.value);
  });

  return renderedScript;
}

export default async function handler(req, res) {
  const {
    body,
    method,
  } = req

  switch (method) {
    case 'POST':
      try {
        const key = process.env.GPT_KEY;

        const { currentTrack, nextTrack } = getTracks(body.trackWindow);
        const generatedScript = generateScript(body.script, currentTrack, nextTrack);

        const response = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            model: "gpt-3.5-turbo",
            messages: [
              { "role": "system", "content": body.script.role },
              { "role": "user", "content": generatedScript }
            ],
            n: 1,
            temperature: .5,
            max_tokens: 240,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${key}`
            }
          }
        );

        res.status(response.status).json(response.data)
      }
      catch (err: any) {
        res.status(err.response.status).json(err.response.data)
      }

      break
  }
}