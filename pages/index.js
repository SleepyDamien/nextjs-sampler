import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import Link from 'next/link'
import shopAppMain from './shopapp'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Next.js Starter!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="App in progress!" />
        <p className="description">
         Keep an eye on this space. 
        </p>
              <div>
                  Custom mini applications
                  <ul>
                      <li><Link href="shopapp">Shop App Demo</Link> </li>
                  </ul>
              </div>
      </main>

      <Footer />
    </div>
  )
}
