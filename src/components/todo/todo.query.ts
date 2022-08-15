import axios from 'axios'
import { useQuery, useMutation } from '@tanstack/react-query'
import API from 'src/service/api'

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
  return useMutation(async (id: Pick<Todo, 'id'>) => await axios.delete(`${API.TODOS}/${id}`))
}

export const useGetTodoQuery = (id: Pick<Todo, 'id'>, { enabled }: { enabled?: boolean }) => {
  return useQuery(
    todoKeys.todo(id),
    async (): Promise<Todo> => await axios.get(`${API.TODOS}/${id}`).then((res) => res.data.data),
    { enabled },
  )
}

export const useGetTodosQuery = () => {
  return useQuery(
    todoKeys.all,
    async (): Promise<Todo[]> =>
      await axios.get(`${API.TODOS}`).then(async (res) => {
        return res.data.data
      }),
  )
}

const todoKeys = {
  all: ['todos'] as const,
  todo: (id: Pick<Todo, 'id'>) => ['todo', id] as const,
}
