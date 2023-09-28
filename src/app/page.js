"use client"

import { useSession } from 'next-auth/react'
import Image from 'next/image';

export default function Home() {

  const { data: session } = useSession({required: true});

    return (
        <div className="dashboard-section">
          <h2>Hello, {session?.user?.name}!</h2>
          <div className="profile-info" >
            <Image src={session?.user?.image} alt="user image"/>
            {session?.user?.email}
          </div>
        </div>
    )
}
