import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Navigate } from 'react-router-dom'

function LoginForm() {
  return (
    <Card className="w-full border-border">
            <CardHeader className="space-y-1 pb-4">
                <CardTitle className="text-xl text-center">Signin</CardTitle>
                <CardDescription className={"text-center"}>
                    Enter your credentials to access your account
                </CardDescription>
                <form >
                    <CardContent className="space-y-4 pt-0">
                        {/* {
                            error && (
                                <div className='p-3 bg-destructive/10 text-destructive text-sm rounded-md'>
                                    {error}
                                </div>
                            )
                        } */}

                        <div className='space-y-2'>
                            <div className='text-sm font-medium text-left'>
                                Email
                            </div>
                            <Input name="email" placeholder="email@email.com" required

                                // value={formValues.email}
                                // onChange={handleInputChange}

                            />
                        </div>
                        <div className='space-y-2'>
                            <div className='text-sm font-medium text-left'>
                                Password
                            </div>
                            <Input name="password" type={"password"} placeholder="*****" required
                                // value={formValues.password}
                                // onChange={handleInputChange}

                            />
                        </div>

                        <div className='py-4'>
                            <Button type="submit" className={"w-full cursor-pointer"}>
                                {/* {isLoading ? (<span className='flex items-center gap-2'><LoaderCircle /> login account... </span>) : ("Login Account")} */}
                                login account
                            </Button>
                        </div>
                    </CardContent>

                    <CardFooter className={"flex justify-center pt-0"}>
                        <div className='text-center text-sm'>
                            Don't have an account ? <a onClick={() => Navigate('/register')} className='text-primary hover:underline cursor-pointer'> Sign up</a>
                        </div>
                    </CardFooter>
                </form>
            </CardHeader>
        </Card>
  )
}

export default LoginForm
