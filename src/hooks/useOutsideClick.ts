import React, { useEffect, useState } from 'react'

const useOutsideClick = (ref: React.RefObject<HTMLElement>) => {
  const [clicked, setClicked] = useState(false)

  useEffect(() => {
    const handleClick = (event: Event) => {
      if (event.target instanceof HTMLElement) {
        if (ref.current && !ref.current.contains(event.target)) {
          setClicked(true)
        }
      }
    }

    document.addEventListener('mousedown', handleClick)
    return () => {
      document.removeEventListener('mousedown', handleClick)
    }
  }, [ref])

  return { clicked }
}

export default useOutsideClick
