import type { NextPage } from 'next'

import CenterContainer from 'src/components/common/centerContainer'
import Link from 'src/components/common/link'
import Button from 'src/components/common/button'

const MainContainer = () => {
  return (
    <main>
      <Introduce />
      <LinkContainer />
    </main>
  )
}

const Introduce = () => {
  return (
    <section className="flex flex-col gap-2 text-6xl text-blue-200">
      <p>Welcome</p>
      <p>
        My <span className="text-blue-700">Todo</span> App !
      </p>
    </section>
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
    <CenterContainer>
      <MainContainer />
    </CenterContainer>
  )
}

export default Home
