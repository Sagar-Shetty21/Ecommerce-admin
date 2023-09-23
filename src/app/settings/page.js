'use client'

import React from 'react'
import { useSession } from 'next-auth/react'

const Settings = () => {
  useSession({required: true});
  
  return (
    <div>Settings</div>
  )
}

export default Settings