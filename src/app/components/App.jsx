'use client'

import Topbar from './Topbar'
import Navbar from './Navbar'
import { useState } from 'react'


const App = ({children}) => {
  const [showNav, setShowNav] = useState(false);

  return (
    <>
        <Topbar setShowNav={setShowNav} showNav={showNav}/>
        <div className="main">
            <Navbar showNav={showNav} setShowNav={setShowNav}/>
            <div className="main-content">{children}</div>
        </div>
    </>
  )
}

export default App