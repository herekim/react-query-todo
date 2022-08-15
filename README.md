# 구현 화면

https://user-images.githubusercontent.com/76519867/183237185-eb641dcc-2b60-494f-b584-532c6b81a2cf.mov

# 구현 사항

## Assignment 1 - Login / SignUp

- /auth 경로에 로그인 / 회원가입 기능을 개발합니다
  - 로그인, 회원가입을 별도의 경로로 분리해도 무방합니다
  - [x] 최소한 이메일, 비밀번호 input, 제출 button을 갖도록 구성해주세요
- 이메일과 비밀번호의 유효성을 확인합니다
  - [x] 이메일 조건 : 최소 @, . 포함
  - [x] 비밀번호 조건 : 8자 이상 입력
  - [x] 이메일과 비밀번호가 모두 입력되어 있고, 조건을 만족해야 제출 버튼이 활성화 되도록 해주세요
- 로그인 API를 호출하고, 올바른 응답을 받았을 때 루트 경로로 이동시켜주세요
  - [x] 응답으로 받은 토큰은 로컬 스토리지에 저장해주세요
  - [x] 다음 번에 로그인 시 토큰이 존재한다면 루트 경로로 리다이렉트 시켜주세요
  - [x] 어떤 경우든 토큰이 유효하지 않다면 사용자에게 알리고 로그인 페이지로 리다이렉트 시켜주세요

## Assignment 2 - Todo List

- Todo List API를 호출하여 Todo List CRUD 기능을 구현해주세요
  - [x] 목록 / 상세 영역으로 나누어 구현해주세요
  - [x] Todo 목록을 볼 수 있습니다.
  - [x] Todo 추가 버튼을 클릭하면 할 일이 추가 됩니다.
  - [x] Todo 수정 버튼을 클릭하면 수정 모드를 활성화하고, 수정 내용을 제출하거나 취소할 수 있습니다.
  - [x] Todo 삭제 버튼을 클릭하면 해당 Todo를 삭제할 수 있습니다.
- 한 화면 내에서 Todo List와 개별 Todo의 상세를 확인할 수 있도록 해주세요.

  - [x] 새로고침을 했을 때 현재 상태가 유지되어야 합니다.
  - [ ] 개별 Todo를 조회 순서에 따라 페이지 뒤로가기를 통하여 조회할 수 있도록 해주세요.

- 한 페이지 내에서 새로고침 없이 데이터가 정합성을 갖추도록 구현해주세요
  - [x] 수정되는 Todo의 내용이 목록에서도 실시간으로 반영되어야 합니다

## 사용 기술

Next.js, TypeScript, React Query, Recoil, Tailwind CSS, React Hook Form, MUI

## 참고 사항

- Redirect의 경우 특정 페이지(/todo)에 접근 시 토큰이 없으면 로그인 페이지로 이동하도록 했습니다.
- "개별 Todo를 조회 순서에 따라 페이지 뒤로가기를 통하여 조회할 수 있도록 해주세요."에서 '조회 순서'의 의미를 이해하지 못해 구현하지 못했습니다.

## 배우고 싶은 것

- ✅ React Query에서 반복되는 코드 줄이기
- React Query에서 Response 데이터의 타이핑
- ✅ 구조적인 에러 핸들링 처리 방법 (컴포넌트에서 개별적으로 하지않기)

# 1차 리팩토링

## [비동기 처리 위임하기](https://github.com/herekim/wanted-pre-onboarding-challenge-fe-1/commit/ada145791ea171edef19c081d60d817548c39329)

### 바꾸고 싶었던 문제

- 비동기 처리를 구조적으로 해결하고 싶었다
- 각 컴포넌트 내에서 이뤄지는 비동기 처리를 외부로 위임해보자

### 주요 컨셉

- 로딩 처리 Suspence에 위임하기
- 에러 처리 ErrorBoundary에 위임하기
- React Query의 QueryErrorResetBoundary로 reset 처리하기

### 주요 구현

- 비동기 처리 위임하기 전

  - 컴포넌트 내부에서 로딩과 에러처리를 하고있음

    ```tsx
    // todo.tsx
    const { isRedirect } = useRedirect()

    const { data: todos, refetch } = useGetTodosQuery()
    const { mutate: deleteTodoMutate } = useDeleteTodoMutation()

    const [selectedTodo, setSelectedTodo] = useState('')

    const deleteTodo = (id: string) => {
      deleteTodoMutate(id, {
        onSuccess: () => {
          refetch()
        },
        onError: (err) => {
          // 에러 핸들링
        },
      })
    }

    // 로딩 핸들링
    if (!todos || isRedirect) return <Spinner />
    ```

- 비동기 처리 후

  - todoContainer 컴포넌트로 추상화
  - 로딩과 에러 처리는 제거되었고, 성공 시만 고려

    ```tsx
    // todoContainer.tsx
    useRedirect()

    const { data: todos, refetch } = useGetTodosQuery()
    const { mutate: deleteTodoMutate } = useDeleteTodoMutation()

    const [selectedTodo, setSelectedTodo] = useState('')

    const deleteTodo = (id: string) => {
      deleteTodoMutate(id, {
        // 성공 시만 관리
        onSuccess: () => refetch(),
      })
    }

    // 로딩 핸들링 제거
    ```

- AsyncBoundary로 비동기 처리를 위임

  - pendingFallback으로 로딩 처리
  - rejectedFallback으로 에러 처리

    ```tsx
    // todo.tsx
    // AsyncBoundary로 비동기 처리를 한번 더 추상화
    <CenterContainer>
      <AsyncBoundary
        // 로딩 핸들링
        pendingFallback={<Spinner />}
        // 에러 핸들링
        rejectedFallback={({ error, reset }) => <ErrorTodo error={error} reset={reset} />}
      >
        <TodoContainer />
      </AsyncBoundary>
    </CenterContainer>
    ```

- 비동기 처리를 하는 AsyncBoundary의 내부

  - 로딩 처리는 Suspense
  - 에러 처리는 ErrorBoundary
  - QueryErrorResetBoundary로 reset 처리

    ```tsx
    // asyncBoundary.tsx
    const AsyncBoundary = ({ pendingFallback, rejectedFallback, children }: Props) => {
      return (
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary onReset={reset} fallbackComponent={rejectedFallback}>
              <Suspense fallback={pendingFallback}>{children}</Suspense>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      )
    }
    ```

### 얻을 수 있었던 것

- 컴포넌트 내에서 비동기 처리가 이뤄질 때 성공 시만 고려할 수 있다
- AsyncBoundary에 로딩과 에러 시 보여줘야할 컴포넌트를 주입해주면 선언적으로 비동기 처리가 가능하다
- 비동기 처리에 대해 협업 시 컨벤션을 만들기 쉽다

### 추가로 고려할 수 있는 것

- 로딩 시 단순히 Spinner를 보여주고 있는데, 이를 컴포넌트에 따라 스켈레톤으로 구현할 수 있다
- ErrorBoundary를 직접 구현했는데, react-error-boundary 라이브러리 옵션을 사용해볼 수 있다

## [any 없애기](https://github.com/herekim/wanted-pre-onboarding-challenge-fe-1/commit/6992301a6b61b17144578f036b5516d69382d05d)

### useRef, event 타입 추론

- ref와 event에서 any 사용중

```ts
// ref any
const useOutsideClick = (ref: any) => {
  const [clicked, setClicked] = useState(false)

  useEffect(() => {
    // event any
    const handleClick = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setClicked(true)
      }
    }

    document.addEventListener('mousedown', handleClick)
    return () => {
      document.removeEventListener('mousedown', handleClick)
    }
  }, [ref])

  return { clicked }
}
```

- 타입 추론 후

```ts
-
const useOutsideClick = (ref: React.RefObject<HTMLElement>) => {
  const [clicked, setClicked] = useState(false)

  useEffect(() => {
    const handleClick = (event: Event) => {
      if (event.target instanceof HTMLElement) {
        if (ref.current && !ref.current.contains(event.target)) {
          setClicked(true)
        }
      }
    }

    document.addEventListener('mousedown', handleClick)
    return () => {
      document.removeEventListener('mousedown', handleClick)
    }
  }, [ref])

  return { clicked }
}
```

### 참고자료

[React에서 선언적으로 비동기 다루기](https://jbee.io/react/error-declarative-handling-1/)<br/>
[React ErrorBoundary를 사용하여 에러 처리 개선하기 (with react-query)](https://velog.io/@suyeon9456/React-Query-Error-Boundary-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0#error-%EB%B0%9C%EC%83%9D-%ED%9B%84-%EC%BF%BC%EB%A6%AC-%EC%9E%AC%EC%8B%9C%EB%8F%84)
