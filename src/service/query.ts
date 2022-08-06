import axios from 'axios'
import { useQuery, useMutation } from '@tanstack/react-query'
import API from 'src/service/api'

type Sign = {
  email: string
  password: string
}
export const useSigninMutation = () => {
  return useMutation(async (body: Sign) => await axios.post(`${API.SIGNIN}`, body))
}

export const useSignUpMutation = () => {
  return useMutation(async (body: Sign) => await axios.post(`${API.SIGNUP}`, body))
}

export type Todo = {
  title: string
  content: string
  id: string
  createdAt: string
  updatedAt: string
}
export const useCreateTodoMutation = () => {
  return useMutation(async (body: Pick<Todo, 'title' | 'content'>) => await axios.post(`${API.TODOS}`, body))
}

export const useUpdateTodoMutation = () => {
  return useMutation(
    async (body: Pick<Todo, 'title' | 'content' | 'id'>) =>
      await axios.put(`${API.TODOS}/${body.id}`, { title: body.title, content: body.content }),
  )
}

export const useDeleteTodoMutation = () => {
  return useMutation(async (id: string) => await axios.delete(`${API.TODOS}/${id}`))
}

export const useGetTodoQuery = (id: string, config: { enabled?: boolean }) => {
  return useQuery(
    ['todo', id],
    async (): Promise<Todo> => await axios.get(`${API.TODOS}/${id}`).then((res) => res.data.data),
    config,
  )
}

export const useGetTodosQuery = () => {
  return useQuery(['todos'], async (): Promise<Todo[]> => await axios.get(`${API.TODOS}`).then((res) => res.data.data))
}
