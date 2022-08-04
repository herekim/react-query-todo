import { useRouter } from 'next/router'

import axios from 'axios'
import { useRecoilValue } from 'recoil'
import { tokenState } from 'src/client/state'
import { useEffect } from 'react'

const useAxiosInstance = () => {
  const router = useRouter()
  const token = useRecoilValue<string>(tokenState)

  useEffect(() => {
    if (!token && router.pathname.includes('todo')) {
      router.push('/auth/signin')
    }
  }, [token])

  axios.interceptors.request.use(async (config) => {
    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      },
    }
  })
}

export default useAxiosInstance
