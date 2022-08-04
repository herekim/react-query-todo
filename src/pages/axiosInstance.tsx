import React from 'react'
import useAxiosInstance from 'src/hooks/useAxiosInstance'

const AxiosInstance = ({ children }: { children: React.ReactNode }) => {
  useAxiosInstance()

  return <>{children}</>
}

export default AxiosInstance
