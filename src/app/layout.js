import Login from './components/Login'
import Providers from './components/Providers'
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
          <Login/>
          {children}
        </Providers>
      </body>
    </html>
  )
}
