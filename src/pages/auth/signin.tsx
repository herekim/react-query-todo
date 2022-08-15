import React from 'react'

import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useSigninMutation } from './signin.query'
import { useSetRecoilState } from 'recoil'
import { tokenState } from 'src/client/state'

import CenterContainer from 'src/components/common/centerContainer'
import Form from 'src/components/common/form'

type Sign = {
  email: string
  password: string
}

const SignIn = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Sign>()

  const router = useRouter()

  const signinMutation = useSigninMutation()
  const setToken = useSetRecoilState(tokenState)

  const onSubmit: SubmitHandler<Sign> = (data) => {
    const { email, password } = data
    signinMutation.mutate(
      { email, password },
      {
        onSuccess: (res) => {
          if (res.data.message === '성공적으로 로그인 했습니다') {
            alert(res.data.message)
            setToken(res.data.token)
            router.push('/todo')
          } else {
            alert('로그인에 실패했습니다.')
          }
        },
      },
    )
  }

  const isAbledButton = watch('email')?.length > 0 && watch('password')?.length > 0

  return (
    <CenterContainer>
      <Form
        type="signIn"
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
        errors={errors}
        isAbledButton={isAbledButton}
      />
    </CenterContainer>
  )
}

export default SignIn
