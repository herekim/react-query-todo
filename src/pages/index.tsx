import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'src/components/common/link'
import Button from 'src/components/common/button'

const HeadContainer = () => {
  return (
    <Head>
      <title>Wanted onboarding</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}

const Introduce = () => {
  return (
    <div className="flex flex-col gap-2 text-6xl text-blue-200">
      <p>Welcome</p>
      <p>
        My <span className="text-blue-700">Todo</span> App !
      </p>
    </div>
  )
}

const LinkContainer = () => {
  return (
    <section className="flex gap-2 my-10">
      <Link href="/auth/signin">
        <Button>Signin</Button>
      </Link>
      <Link href="/auth/signup">
        <Button>Signup</Button>
      </Link>
      <Link href="/todo">
        <Button>Todo App</Button>
      </Link>
    </section>
  )
}

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <HeadContainer />
      <main>
        <Introduce />
        <LinkContainer />
      </main>
    </div>
  )
}

export default Home
