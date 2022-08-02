import React from 'react'

const Button = ({ children }: { children: React.ReactNode }) => {
  return (
    <button className="py-2 w-28 border border-black rounded hover:bg-blue-400 hover:text-white hover:border-none">
      {children}
    </button>
  )
}

export default Button
