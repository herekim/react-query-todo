import React from 'react'

const BackgroudBlur = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 h-full bg-black bg-opacity-75 animate-toggle z-30">
      {children}
    </div>
  )
}

export default BackgroudBlur
