import React from 'react'

import CenterContainer from './centerContainer'
import CircularProgress from '@mui/material/CircularProgress'

const Spinner = () => {
  return (
    <CenterContainer>
      <CircularProgress />
    </CenterContainer>
  )
}

export default Spinner
