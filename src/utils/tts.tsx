const { SpeakerAudioDestination, SpeechConfig, AudioConfig, SpeechSynthesizer } = require("microsoft-cognitiveservices-speech-sdk");

const tts = (sentence: string, dj: { lang: any; gender: any; name: any; style: any; rate: any; pitch: any; }, callback: Function) => {
  const destination = new SpeakerAudioDestination();
  destination.onAudioEnd = callback;

  const audioConfig = AudioConfig.fromSpeakerOutput(destination);
  const speechConfig = SpeechConfig.fromSubscription(process.env.NEXT_PUBLIC_AZURE_TTS_KEY, process.env.NEXT_PUBLIC_AZURE_TTS_REGION);

  const xml = `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="https://www.w3.org/2001/mstts" xml:lang="${dj.lang}">
                <voice xml:lang="${dj.lang}" xml:gender="${dj.gender}" name="${dj.name}">
                  <mstts:express-as style="${dj.style}">
                    <prosody rate="${dj.rate}" pitch="${dj.pitch}">
                      ${sentence}
                    </prosody>
                  </mstts:express-as>
                </voice>
               </speak>`;

  const speechSynthesizer = new SpeechSynthesizer(speechConfig, audioConfig);

  speechSynthesizer.speakSsmlAsync(
    xml,
    () => {
      speechSynthesizer.close();
    },
    (error: any) => {
      console.log(error);
      speechSynthesizer.close();
    });

  return {
    speaker: destination,
    synth: speechSynthesizer
  };
}

export default tts;

