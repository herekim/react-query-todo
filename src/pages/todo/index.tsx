import React from 'react'

import dynamic from 'next/dynamic'

import CenterContainer from 'src/components/common/centerContainer'
import Spinner from 'src/components/common/spinner'
import ErrorTodo from 'src/components/common/error/errorTodo'

import AsyncBoundary from 'src/components/common/error/asyncBoundary'

const TodoContainer = dynamic(() => import('src/components/todo/todoContainer'), {
  ssr: false,
})

const Todo = () => {
  return (
    <CenterContainer>
      <AsyncBoundary
        pendingFallback={<Spinner />}
        rejectedFallback={({ error, reset }) => <ErrorTodo error={error} reset={reset} />}
      >
        <TodoContainer />
      </AsyncBoundary>
    </CenterContainer>
  )
}

export default Todo
