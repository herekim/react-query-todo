import React, { useEffect, useState } from 'react'

import { useQueryClient } from '@tanstack/react-query'

import { useGetTodosQuery, useDeleteTodoMutation, todoKeys } from './todo.query'

import useRedirect from 'src/hooks/useRedirect'

import TodoModal from 'src/components/todo/todoModal'
import TodoMain from 'src/components/todo/todoMain'

const TodoContainer = () => {
  useRedirect()

  const queryClient = useQueryClient()

  const [isModal, setIsModal] = useState({
    add: false,
    modify: false,
  })

  const getTodosQuery = useGetTodosQuery()
  const deleteTodoMutation = useDeleteTodoMutation()

  const [selectedTodo, setSelectedTodo] = useState('')

  const deleteTodo = (id: string) => {
    deleteTodoMutation.mutate(id, {
      onSuccess: () => queryClient.invalidateQueries(todoKeys.all),
    })
  }

  useEffect(() => {
    if (!isModal.add || !isModal.modify) {
      queryClient.invalidateQueries(todoKeys.all)
    }
  }, [isModal.add, isModal.modify])

  return (
    <>
      {getTodosQuery.isSuccess && (
        <TodoMain
          todos={getTodosQuery.data}
          isModal={isModal}
          setIsModal={setIsModal}
          deleteTodo={deleteTodo}
          setSelectedTodo={setSelectedTodo}
        />
      )}
      {isModal.add && <TodoModal type="Add" closeModal={() => setIsModal({ ...isModal, add: !isModal.add })} />}
      {isModal.modify && (
        <TodoModal
          type="Modify"
          id={selectedTodo}
          closeModal={() => setIsModal({ ...isModal, modify: !isModal.modify })}
        />
      )}
    </>
  )
}

export default TodoContainer
