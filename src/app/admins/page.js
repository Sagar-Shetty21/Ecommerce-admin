'use client'

import { useSession } from 'next-auth/react'

const Admins = () => {
  useSession({required: true});

  return (
    <div>set admin users</div>
  )
}

export default Admins