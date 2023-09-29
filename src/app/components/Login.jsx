"use client"

import React from 'react'
import { signIn } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'


const Login = () => {
  const { data: session } = useSession();
  const router = useRouter();

  if(session){
    router.push('/')
  }

  return(
    <div className="login-page-container">
      <Image src="../assets/company-logo.svg" alt="company logo" height="100" width="100" style={{ height: 'auto',width: '60%', objectFit: 'contain', position: 'relative', margin: '15px' }}/>
      <button onClick={() => signIn("google")} className="google-signin-btn">LOG IN WITH GOOGLE</button>
    </div>
  )
}

export default Login