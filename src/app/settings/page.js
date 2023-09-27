'use client'

import { useSession } from 'next-auth/react'
import FeaturedProductSelector from '../components/settingsOptions/FeaturedProductSelector'

const Settings = () => {
  useSession({required: true});
  
  return (
    <div>
      <FeaturedProductSelector />
    </div>
  )
}

export default Settings