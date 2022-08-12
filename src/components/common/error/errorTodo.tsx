import { ReactElement } from 'react'

import CenterContainer from 'src/components/common/centerContainer'
import ErrorContainer from 'src/components/common/error/errorContainer'

const ErrorTodo = ({ error, reset }: { error: Error; reset: () => void }): ReactElement => {
  return (
    <CenterContainer>
      <ErrorContainer error={error} reset={reset} />
    </CenterContainer>
  )
}

export default ErrorTodo
