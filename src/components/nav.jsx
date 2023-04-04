import Link from "next/link";

import styles from '@/styles/Nav.module.css'

import { useApp } from '@/context/app'
import { useSpotify } from '@/context/spotify'

export default function Nav({ children }) {
  const { theme, setTheme } = useApp();
  const { authorized, accessToken } = useSpotify();

  const update = () => {
    setTheme({
      ...theme,
      darkMode: !theme.darkMode
    });
  };

  // useEffect(() => {
  //   if (spotifyMounted && accessToken === '') {
  //     console.log('No Token');
  //     Router.push('/callback?x');
  //   }

  //   window.onSpotifyWebPlaybackSDKReady = () => {
  //     console.log('sdk ready');
  //   };
  // }, [authorized]);

  return (
    <div className={styles.nav}>
      <div>
        <Link href={"/"}>Home</Link>
      </div>

      {!authorized.state &&
        <div >
          <Link href={"/callback/"}>Log In</Link>
        </div>
      }
      {authorized.state &&
        <div>
          <Link href={"/radio"}>Radio</Link>
        </div>
      }
      <div>
        <Link href="#" onClick={update}>{theme.darkMode ? 'dark' : 'light'}</Link>
      </div>
    </div>
  );
};