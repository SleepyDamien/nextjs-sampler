import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import Link from 'next/link'
import { FaLink } from "react-icons/fa6";
import styles from '@styles/HomePage.module.css'
import About from '@components/homepage/about'
import Socials from '@components/homepage/socials'
import MicroSiteSection from '@components/homepage/microsites'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Damien Rincon | Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main id="landingPage" className={styles.landingMain}>
        <Header title="Welcome!" />
        <About />
        <Socials />
        <MicroSiteSection />
      </main>
      <Footer />
    </div>
  )
}
