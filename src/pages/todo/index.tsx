import React, { useEffect, useState } from 'react'

// import Accordion from '@mui/material/Accordion'
// import AccordionSummary from '@mui/material/AccordionSummary'
// import AccordionDetails from '@mui/material/AccordionDetails'
// import Typography from '@mui/material/Typography'
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import { useGetTodosQuery, useDeleteTodoMutation } from 'src/service/query'

import CenterContainer from 'src/components/common/centerContainer'
import TodoModal from 'src/components/todo/todoModal'
import TodoMain from 'src/components/todo/todoMain'

type Todo = {
  title: string
  content: string
}

const Todo = () => {
  const [isModal, setIsModal] = useState({
    add: false,
    modify: false,
  })

  const { data: todos, refetch } = useGetTodosQuery()
  const { mutate: deleteTodoMutate } = useDeleteTodoMutation()

  const [selectedTodo, setSelectedTodo] = useState('')

  const deleteTodo = (id: string) => {
    deleteTodoMutate(id, {
      onSuccess: (res) => {
        console.log(res)
        refetch()
      },
      onError: (err) => {
        console.log(err)
      },
    })
  }

  useEffect(() => {
    refetch()
  }, [isModal.add, isModal.modify])

  if (!todos) return

  return (
    <CenterContainer>
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
    </CenterContainer>
  )
}

export default Todo
