
import Providers from './components/Providers'
import Navbar from './components/Navbar'
import './globals.css'

export const metadata = {
  title: 'E-Commerce Admin Panel',
  description: 'Admin panel to manage an ecommerce store',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <main className="main">
            <Navbar />
            <div className="main-content">{children}</div>
          </main>
        </Providers>
      </body>
    </html>
  )
}
