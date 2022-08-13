import React, { useRef, useEffect } from 'react'

import useOutsideClick from 'src/hooks/useOutsideClick'

type Modal = {
  children: React.ReactNode
  handleClick: () => void
}

const Modal = ({ children, handleClick }: Modal) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const { clicked } = useOutsideClick(modalRef)

  useEffect(() => {
    if (clicked) {
      handleClick()
    }
  }, [clicked])

  const closeModal = () => {
    handleClick()
  }

  return (
    <>
      <div ref={modalRef} className="position-center flex-center p-20 pb-10 bg-white rounded-lg overflow-scroll z-30">
        <button className="absolute top-3 right-5" onClick={closeModal}>
          X
        </button>
        <div>{children}</div>
      </div>
    </>
  )
}

export default Modal
