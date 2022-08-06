import React from 'react'

import TodoHeader from 'src/components/todo/todoHeader'
import TodoList from 'src/components/todo/todoList'

type Modal = { add: boolean; modify: boolean }

const TodoMain = ({
  todos,
  isModal,
  setIsModal,
  deleteTodo,
  setSelectedTodo,
}: {
  todos: any
  isModal: Modal
  setIsModal: (modal: Modal) => void
  deleteTodo: (id: string) => void
  setSelectedTodo: (id: string) => void
}) => {
  return (
    <main>
      <TodoHeader isModal={isModal} setIsModal={setIsModal} />
      <TodoList
        todos={todos}
        isModal={isModal}
        setIsModal={setIsModal}
        deleteTodo={deleteTodo}
        setSelectedTodo={setSelectedTodo}
      />
    </main>
  )
}

export default TodoMain
