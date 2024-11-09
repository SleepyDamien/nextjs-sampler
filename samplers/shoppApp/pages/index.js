import Head from 'next/head'
import shopAppHeader from '@shopApp/components/Header'
import shopAppFooter from '@shopApp/components/Footer'

export default function Home() {
    return (
        <div className="container">
            <Head>
                <title>Next.js Starter!</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <shopAppHeader title="App in progress!" />
                <p className="description">
                    Keep an eye on this space.
                </p>
                <div>
                    Custom mini applications
                    <ul>
                        <li></li>
                    </ul>
                </div>
            </main>

            <shopAppFooter />
        </div>
    )
}
