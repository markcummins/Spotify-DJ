import Image from 'next/image'
import styles from '@/styles/AlbumCover.module.css'
import { SwitchTransition, CSSTransition } from "react-transition-group";

export default function AlbumCover({ coverSrc }) {
  return (
    <SwitchTransition>
      <CSSTransition
        key={coverSrc}
        timeout={500}
        classNames={{
          enter: styles.AlbumEnter,
          enterActive: styles.AlbumEnterActive,
          exit: styles.AlbumExit,
          exitActive: styles.AlbumExitActive,
        }}
      >
        <div className={styles.vinylWrap}>
          <div className={styles.vinyl}>
            <Image
              src="/vinyl.png"
              alt="Vinyl"
              priority
              width={120}
              height={120}
            />
          </div>
          <div className={styles.cover}>
            <img
              src={coverSrc}
              alt="Spotify"
              width={120}
              height={120}
            />
          </div>
        </div>
      </CSSTransition>
    </SwitchTransition>
  );
};