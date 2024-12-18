import Header from '@components/Header';
import Footer from '@components/Footer';

export default function RootLayout({
    // Layouts must accept a children prop.
    // This will be populated with nested layouts or pages
    children,
}) {
    return (
        <html lang="en">
          <body>
            <div className="container">
               <main id="landingPage">
                  <Header />
                    {children}
                  <Footer />
               </main>
            </div>
          </body>
        </html>
    )
}