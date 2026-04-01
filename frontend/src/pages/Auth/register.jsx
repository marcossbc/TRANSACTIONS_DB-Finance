import React from 'react'
import RegisterForm from '../../components/auth/RegisterForm'

const Register = () => {
  
  return (
      <div className="relative min-h-screen flex items-center justify-center bg-background">

      {/* background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br  from-secondary to-secondary/50"></div>

      {/* content */}
      <div className="relative z-10 w-full max-w-md px-4 text-center">

        <div className="mb-8">
                             <h1 className='text-3xl font-bold text-foreground'>Join us today</h1>
                    <p>Create an account in just a few steps</p>

        </div>

        <RegisterForm/>

      </div>

    </div>
  )
}

export default Register