"use client"

import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'

const Login = () => {
    const { data: session } = useSession();
    

  if(session && session.user) {
    console.log(session.user)
    return (
        <div>{session.user.name}</div>
    )
  }
  return (
    <div><button onClick={() => signIn("google")}>Sign In</button></div>
  )
}

export default Login