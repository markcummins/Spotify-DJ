import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'

export default function Home() {

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <main className={styles.main}>
        <div>
          <a href="/radio">
            <Image
              src="/spotify.svg"
              alt="Spotify Logo"
              className={styles.vercelLogo}
              width={240}
              height={240}
              priority
            />
          </a>
        </div>
      </main>
    </>
  )
}
