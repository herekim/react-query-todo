import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import API from 'src/service/api'

type Sign = {
  email: string
  password: string
}
export const useSigninMutation = () => {
  return useMutation(async (body: Sign) => await axios.post(`${API.SIGNIN}`, body))
}
