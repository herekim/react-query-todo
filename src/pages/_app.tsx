import 'styles/globals.css'

import type { AppProps } from 'next/app'

import { RecoilRoot } from 'recoil'
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AxiosInstance from './axiosInstance'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      useErrorBoundary: true,
    },
  },
})

function MyApp({ Component, pageProps }: AppProps) {
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
