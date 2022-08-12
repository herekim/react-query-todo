import React, { useEffect, useState } from 'react'

import { useGetTodosQuery, useDeleteTodoMutation } from 'src/service/query'

import useRedirect from 'src/hooks/useRedirect'

import TodoModal from 'src/components/todo/todoModal'
import TodoMain from 'src/components/todo/todoMain'

const TodoContainer = () => {
  useRedirect()

  const [isModal, setIsModal] = useState({
    add: false,
    modify: false,
  })

  const { data: todos, refetch } = useGetTodosQuery()
  const { mutate: deleteTodoMutate } = useDeleteTodoMutation()

  const [selectedTodo, setSelectedTodo] = useState('')

  const deleteTodo = (id: string) => {
    deleteTodoMutate(id, {
      onSuccess: () => refetch(),
      onError: (err) => {
        console.log(err)
      },
    })
  }

  useEffect(() => {
    refetch()
  }, [isModal.add, isModal.modify])

  return (
    <>
      <TodoMain
        todos={todos}
        isModal={isModal}
        setIsModal={setIsModal}
        deleteTodo={deleteTodo}
        setSelectedTodo={setSelectedTodo}
      />
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
