'use client'

import React from 'react'
import { useSession } from 'next-auth/react'


const Orders = () => {
  useSession({required: true});

  return (
    <div>Orders</div>
  )
}

export default Orders