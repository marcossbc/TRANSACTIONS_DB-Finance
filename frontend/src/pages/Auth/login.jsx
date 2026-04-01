import React from 'react'
import LoginForm from '../../components/auth/LoginForm'

const Login = () => {
  
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-background">

      {/* background gradient */}
      <div className="absolute inset-0 bg-gradients-to-br  from-secondary to-secondary/50"></div>

      {/* content */}
      <div className="relative z-10 w-full max-w-md px-4 text-center">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back
          </h1>

          <p className="text-muted-foreground">
            We're glad to see you again
          </p>
        </div>

        <LoginForm/>

      </div>

    </div>
  )
}

export default Login