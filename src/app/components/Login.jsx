"use client"

import React from 'react'
import { signIn } from 'next-auth/react'

const Login = () => {
  return(
    <div className="login-page-container">
      <img src="../assets/company-logo.svg" alt="company logo"/>
      <button onClick={() => signIn("google")} className="google-signin-btn">LOG IN WITH GOOGLE</button>
    </div>
  )
}

export default Login