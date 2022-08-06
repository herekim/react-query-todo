import React from 'react'

import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import { Todo } from 'src/service/query'

type Modal = { add: boolean; modify: boolean }

const TodoList = ({
  todos,
  isModal,
  setIsModal,
  deleteTodo,
  setSelectedTodo,
}: {
  todos: Todo[]
  isModal: Modal
  setIsModal: (modal: Modal) => void
  deleteTodo: (id: string) => void
  setSelectedTodo: (id: string) => void
}) => {
  return (
    <div className="p-20 bg-white rounded-lg drop-shadow-xl">
      <section className="w-96">
        {todos.map((todo: Todo) => {
          return (
            <Accordion key={todo.id}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Typography>{todo.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <pre className="font-sans">{todo.content}</pre>
                <span className="flex justify-end gap-1">
                  <button
                    onClick={() => {
                      setIsModal({ ...isModal, modify: !isModal.modify })
                      setSelectedTodo(todo.id)
                    }}
                    className="px-3 py-1 border text-xs rounded"
                  >
                    수정
                  </button>
                  <button onClick={() => deleteTodo(todo.id)} className="px-3 py-1 border text-xs rounded">
                    삭제
                  </button>
                </span>
              </AccordionDetails>
            </Accordion>
          )
        })}
      </section>
    </div>
  )
}

export default TodoList
