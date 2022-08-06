import React from 'react'

type Modal = { add: boolean; modify: boolean }
type TodoHeader = { isModal: Modal; setIsModal: (Modal: Modal) => void }

const TodoHeader = ({ isModal, setIsModal }: TodoHeader) => {
  return (
    <header className="flex justify-between px-2 py-4">
      <h1 className="text-2xl text-blue-700">Things to do</h1>
      <button
        onClick={() => setIsModal({ ...isModal, add: !isModal.add })}
        className="px-4 text-sm rounded bg-blue-400 text-white border-none"
      >
        Add
      </button>
    </header>
  )
}

export default TodoHeader
