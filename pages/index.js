import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import Link from 'next/link'
import shopAppMain from './shopapp'
import { FaSquareGithub, FaLink } from "react-icons/fa6";


export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Damien Rincon | Next.JS sandbox</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header title="Next.JS demos" />
        <p className="description">
        Each app is designed with a general concept in mind. 
        </p>
    <p>
    <Link href="https://github.com/SleepyDamien"><FaSquareGithub /> View my GitHub!</Link> 
    </p>

              <div className="miniNav">
                  Custom mini applications
                  <ul>
                      <li><Link href="shopapp"><FaLink /> Shop App Demo</Link> </li>
                  </ul>
              </div>
      </main>
      <Footer />
    </div>
  )
}
