import 'styles/globals.css'

import { useState } from 'react'
import type { AppProps } from 'next/app'

import { RecoilRoot } from 'recoil'
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AxiosInstance from './axiosInstance'

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <RecoilRoot>
          <AxiosInstance>
            <Component {...pageProps} />
          </AxiosInstance>
        </RecoilRoot>
      </Hydrate>
    </QueryClientProvider>
  )
}

export default MyApp
