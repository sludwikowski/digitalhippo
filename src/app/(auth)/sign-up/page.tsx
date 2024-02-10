'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import React from 'react'
import { useForm } from 'react-hook-form'

import { Button, buttonVariants } from '@/components/ui/button'
import { ArrowRight } from '@/components/ui/icon'
import { Icons } from '@/components/ui/Icons'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils/cn'
import {
  AuthCredentialsValidator,
  type TAuthCredentialsValidator,
} from '@/lib/validators/accountCredentialsValidator'

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  })

  const onSubmit = ({ email, password }: TAuthCredentialsValidator) => {
    console.log(email, password)
  }

  return (
    <div className="container relative flex flex-col items-center justify-center pt-20 lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col items-center space-y-2 text-center">
          <Icons.logo className="size-20" />
          <h1 className="text-2xl font-bold">Create an account</h1>

          <Link
            href="/sign-in"
            className={buttonVariants({
              variant: 'link',
              className: 'gap-1.5',
            })}>
            Alredy have an account? Sign-in
            <ArrowRight className="size-5" />
          </Link>
        </div>

        <div className="grid gap-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              <div className="grid gap-1 py-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  {...register('email')}
                  className={cn({
                    'focus-visible:ring-red-500': errors.email,
                  })}
                  placeholder="you@example.com"
                />
              </div>
              <div className="grid gap-1 py-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  {...register('password')}
                  className={cn({
                    'focus-visible:ring-red-500': errors.password,
                  })}
                  placeholder="Password"
                />
              </div>
              <Button>Sign up</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Page
