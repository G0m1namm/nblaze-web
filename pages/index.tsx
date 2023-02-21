import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import Header from '@/components/Header'

export default function Home() {
  return (
    <>
      <Head>
        <title>SMM Agency</title>
        <meta name="description" content="Website for SMM Agency" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;700&display=swap" rel="stylesheet" />
      </Head>
      <Header>
          <div className="noise-overlay site-noise"></div>
      </Header>
    </>
  )
}
