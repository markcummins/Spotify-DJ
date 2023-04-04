import Layout from '@/components/layout.jsx';
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import AppProvider from '@/context/app';
import UserProvider from '@/context/spotify';

export default function App({ Component, pageProps }: AppProps) {
  return <AppProvider>
    <UserProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  </AppProvider>
}
