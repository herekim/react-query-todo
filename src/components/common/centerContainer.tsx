import React from 'react'

const CenterContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex-col-center h-full">{children}</div>
}

export default CenterContainer
