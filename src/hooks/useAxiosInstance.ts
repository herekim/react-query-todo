import axios from 'axios'
import { useRecoilValue } from 'recoil'
import { tokenState } from 'src/client/state'

const useAxiosInstance = () => {
  const token = useRecoilValue<string>(tokenState)

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
