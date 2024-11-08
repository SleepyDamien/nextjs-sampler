import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'

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
      </main>

      <Footer />
    </div>
  )
}
