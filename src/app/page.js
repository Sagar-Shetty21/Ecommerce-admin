"use client"
import { signOut, useSession } from 'next-auth/react'
import Login from './components/Login';


export default function Home() {

  const { data: session } = useSession();

  if(session && session.user) {
    return (
        <div className="dashboard-section">
          <h2>Hello, {session?.user?.name}!</h2>
          <div className="profile-info" onClick={signOut}>
            <img src={session?.user?.image} alt="user image"/>
            {session?.user?.email}
          </div>
        </div>
    )
  }
  return (
      <Login />
  )
}
