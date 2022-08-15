import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import API from 'src/service/api'

type Sign = {
  email: string
  password: string
}

export const useSignUpMutation = () => {
  return useMutation(async (body: Sign) => await axios.post(`${API.SIGNUP}`, body))
}
