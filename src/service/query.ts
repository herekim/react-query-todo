import axios from 'axios'
import { useQuery, useMutation } from '@tanstack/react-query'
import API from 'src/service/api'

type Sign = {
  email: string
  password: string
}
export const useSigninMutation = () => {
  return useMutation((body: Sign) => axios.post(`${API.SIGNIN}`, body))
}

export const useSignUpMutation = () => {
  return useMutation((body: Sign) => axios.post(`${API.SIGNUP}`, body))
}

export const useCreateTodoMutation = () => {
  return useMutation((body) => axios.post(`${API.TODOS}`, body))
}

export const useUpdateTodoMutation = () => {
  return useQuery([], (body) => axios.post(`${API.TODOS}`, body))
}

export const useDeleteTodoMutation = () => {
  return useMutation((body) => axios.post(`${API.TODOS}`, body))
}

export const useGetTodoQuery = () => {
  return useQuery(['todo'], (id) => axios.get(`${API.TODOS}/${id}`))
}

export const useGetTodosQuery = () => {
  return useQuery(['todos'], () => axios.get(`${API.TODOS}`))
}
