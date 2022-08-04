import React from 'react'

import { UseFormHandleSubmit, SubmitHandler, UseFormRegister, FieldErrorsImpl, DeepRequired } from 'react-hook-form'

type SigninInput = {
  email: string
  password: string
}

type Form = {
  type: 'signIn' | 'signUp'
  handleSubmit: UseFormHandleSubmit<SigninInput>
  onSubmit: (data: SigninInput) => SubmitHandler<SigninInput>
  register: UseFormRegister<SigninInput>
  errors: FieldErrorsImpl<DeepRequired<SigninInput>>
  isAbledButton: boolean
}

const Form = ({ type, handleSubmit, onSubmit, register, errors, isAbledButton }: Form) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex-col-center gap-6">
      <div className="flex flex-col gap-4 w-96">
        <div>
          <p className="py-1">Email</p>
          <input
            {...register('email', {
              required: true,
              pattern: /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
            })}
            placeholder="wanted@onboarding.com"
            className="px-4 w-full h-12 rounded-lg border text-sm"
          />
          {errors?.email?.type === 'pattern' && (
            <p className="px-1 text-sm text-red-600">{errors.email && 'This is not a valid email format.'}</p>
          )}
        </div>
        <div>
          <div>
            <p className="py-1">Password</p>
            <input
              {...register('password', { required: true, minLength: 8 })}
              type="password"
              placeholder="&#183;&#183;&#183;&#183;&#183;&#183;&#183;&#183;&#183;&#183;&#183;"
              className="px-4 w-full h-12 rounded-lg border text-sm"
            />
            {errors.password?.type === 'minLength' && (
              <p className="px-1 text-sm text-red-600">{'Please enter at least 8 characters.'}</p>
            )}
          </div>
        </div>
      </div>
      <div className="w-full">
        {isAbledButton ? (
          <button type="submit" className="w-full h-12 bg-blue-600 rounded-lg text-white">
            {type === 'signIn' ? 'Sign in' : 'Join us'}
          </button>
        ) : (
          <button disabled className="w-full h-12 bg-blue-200 rounded-lg text-white">
            {type === 'signIn' ? 'Sign in' : 'Join us'}
          </button>
        )}
      </div>
    </form>
  )
}

export default Form
