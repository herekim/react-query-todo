import React from 'react'

import { useRouter } from 'next/router'

import { Icon } from '@iconify/react'

const ErrorContainer = ({ text, error, reset }: { text?: string; error: Error; reset: () => void }) => {
  const router = useRouter()

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <button onClick={() => router.back()} className="flex items-center gap-2">
          <Icon icon="eva:arrow-back-fill" />
          <p className="text-sm">이전 페이지</p>
        </button>
        <button onClick={() => reset()} className="p-1 rounded text-xs bg-blue-500 text-white">
          새로고침
        </button>
      </div>
      <p className="text-blue-600 text-xl">{text} 페이지에 문제가 생겼어요. 😭</p>
    </div>
  )
}

export default ErrorContainer
