import React, { useEffect } from 'react'

import { SubmitHandler, useForm } from 'react-hook-form'

import { useGetTodoQuery, useCreateTodoMutation, useUpdateTodoMutation } from './todo.query'

import Modal from 'src/components/common/modal'
import BackgroundBlur from 'src/components/common/backgroundBlur'

type Todo = {
  title: string
  content: string
}

type ModalType = 'Add' | 'Modify'

const TodoModal = ({ type, id, closeModal }: { type: ModalType; id?: string; closeModal: () => void }) => {
  const isModifyModal = !!(id && type === 'Modify')
  const { data: todo } = useGetTodoQuery(id!, { enabled: isModifyModal })
  const { mutate: createTodoMutate } = useCreateTodoMutation()
  const { mutate: updateTodoMutate } = useUpdateTodoMutation()

  const title = isModifyModal && todo ? todo.title : ''
  const content = isModifyModal && todo ? todo.content : ''

  const { register, handleSubmit, setValue } = useForm<Todo>()

  useEffect(() => {
    if (isModifyModal && todo) {
      setValue('title', title)
      setValue('content', content)
    }
  }, [todo])

  const handleUpdate = (title: string, content: string, id: string) => {
    updateTodoMutate(
      { title, content, id },
      {
        onSuccess: (_) => closeModal(),
      },
    )
  }

  const handleCreate = (title: string, content: string) => {
    createTodoMutate(
      { title, content },
      {
        onSuccess: (_) => closeModal(),
      },
    )
  }

  const onSubmit: SubmitHandler<Todo> = (data) => {
    const { title, content } = data
    if (isModifyModal && id) {
      handleUpdate(title, content, id)
    } else {
      handleCreate(title, content)
    }
  }

  return (
    <BackgroundBlur>
      <Modal handleClick={closeModal}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex-col items-center gap-4 w-80">
          <div>
            <p className="py-1">Title</p>
            <input {...register('title')} className="px-4 w-full h-10 rounded-lg border text-sm" />
          </div>
          <div>
            <p className="py-1">Content</p>
            <textarea {...register('content')} className="p-4 w-full h-40 rounded-lg border text-sm resize-none" />
          </div>
          <div className="flex justify-end mt-8">
            <button type="submit" className="px-6 py-1 rounded bg-blue-400 text-white">
              {type}
            </button>
          </div>
        </form>
      </Modal>
    </BackgroundBlur>
  )
}

export default TodoModal
