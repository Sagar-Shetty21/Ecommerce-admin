'use client'

import { useState } from 'react'
import Providers from './components/Providers'
import Navbar from './components/Navbar'
import Topbar from './components/Topbar'
import './globals.css'

export const metadata = {
  title: 'E-Commerce Admin Panel',
  description: 'Admin panel to manage an ecommerce store',
}

export default function RootLayout({ children }) {

  const [showNav, setShowNav] = useState(false);

  return (
    <html lang="en">
      <body>
        <Providers>
          <main>
            <Topbar setShowNav={setShowNav} showNav={showNav}/>
            <div className="main">
              <Navbar showNav={showNav} setShowNav={setShowNav}/>
              <div className="main-content">{children}</div>
            </div>
          </main>
        </Providers>
      </body>
    </html>
  )
}
