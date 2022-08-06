import { useLayoutEffect } from 'react'

import { useRouter } from 'next/router'

import { useRecoilValue } from 'recoil'
import { tokenState } from 'src/client/state'

const useRedirect = () => {
  const router = useRouter()
  const token = useRecoilValue<string>(tokenState)
  const isRedirect = !token

  useLayoutEffect(() => {
    if (!token) {
      router.push('/auth/signin')
    }
  }, [token])

  return { isRedirect }
}

export default useRedirect
