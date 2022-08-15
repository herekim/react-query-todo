import React, { useEffect, useState } from 'react'

import { useGetTodosQuery, useDeleteTodoMutation } from './todo.query'

import useRedirect from 'src/hooks/useRedirect'

import TodoModal from 'src/components/todo/todoModal'
import TodoMain from 'src/components/todo/todoMain'

const TodoContainer = () => {
  useRedirect()

  const [isModal, setIsModal] = useState({
    add: false,
    modify: false,
  })

  const getTodosQuery = useGetTodosQuery()
  const deleteTodoMutation = useDeleteTodoMutation()

  const [selectedTodo, setSelectedTodo] = useState('')

  const deleteTodo = (id: string) => {
    deleteTodoMutation.mutate(id, {
      onSuccess: () => getTodosQuery.refetch(),
    })
  }

  useEffect(() => {
    getTodosQuery.refetch()
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
