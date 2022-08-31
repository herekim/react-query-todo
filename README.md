# 구현 화면

https://user-images.githubusercontent.com/76519867/183237185-eb641dcc-2b60-494f-b584-532c6b81a2cf.mov

# 환경 세팅

## BackEnd

[API Repository Link](https://github.com/starkoora/wanted-pre-onboarding-challenge-fe-1-api)

```
2. yarn
3. yarn start # http://localhost:8080
```

## FrontEnd

```
1. yarn
2. yarn dev # http://localhost:3000
```

# 구현 사항

## Login & Signup

- 로그인 / 회원가입 기능
  - [x] 이메일, 비밀번호 input, 제출 button을 갖도록 구성.
- 이메일과 비밀번호의 유효성을 확인합니다
  - [x] 이메일 조건 : 최소 @, . 포함
  - [x] 비밀번호 조건 : 8자 이상 입력
  - [x] 이메일과 비밀번호가 모두 입력되어 있고, 조건을 만족해야 제출 버튼이 활성화
- 로그인 API를 호출하고, 올바른 응답을 받았을 때 루트 경로로 이동
  - [x] 응답으로 받은 토큰은 로컬 스토리지에 저장
  - [x] 다음 번에 로그인 시 토큰이 존재한다면 루트 경로로 리다이렉트
  - [x] 토큰이 유효하지 않다면 사용자에게 알리고 로그인 페이지로 리다이렉트

## Todo List

- Todo List API를 호출하여 Todo List CRUD 기능을 구현
  - [x] 목록 / 상세 영역으로 나누어 구현
  - [x] Todo 목록을 볼 수 있음
  - [x] Todo 추가 버튼을 클릭해 할 일이 추가
  - [x] Todo 수정 버튼을 클릭해 수정 모드를 활성화하고, 수정 내용을 제출하거나 취소
  - [x] Todo 삭제 버튼을 클릭해 해당 Todo를 삭제
- 한 화면 내에서 Todo List와 개별 Todo의 상세를 확인

  - [x] 새로고침을 했을 때 현재 상태가 유지

- 한 페이지 내에서 새로고침 없이 데이터가 정합성을 갖추도록 구현
  - [x] 수정되는 Todo의 내용이 목록에서도 실시간으로 반영

## 사용 기술

- Next.js, TypeScript, React Query, Recoil, Tailwind CSS, React Hook Form, MUI

![package-json](public/images/package-json.png)

# 폴더 구조

📦src  
┣ 📂client  
┃ ┗ 📜state.ts  
┣ 📂components  
┃ ┣ 📂common  
┃ ┃ ┣ 📂error  
┃ ┃ ┃ ┣ 📜asyncBoundary.tsx  
┃ ┃ ┃ ┣ 📜errorBoundary.tsx  
┃ ┃ ┃ ┣ 📜errorContainer.tsx  
┃ ┃ ┃ ┗ 📜errorTodo.tsx  
┃ ┃ ┣ 📜backgroundBlur.tsx  
┃ ┃ ┣ 📜button.tsx  
┃ ┃ ┣ 📜centerContainer.tsx  
┃ ┃ ┣ 📜form.tsx  
┃ ┃ ┣ 📜link.tsx  
┃ ┃ ┣ 📜modal.tsx  
┃ ┃ ┗ 📜spinner.tsx  
┃ ┣ 📂signin  
┃ ┣ 📂signup  
┃ ┗ 📂todo  
┃ ┃ ┣ 📜todo.query.ts  
┃ ┃ ┣ 📜todoContainer.tsx  
┃ ┃ ┣ 📜todoHeader.tsx  
┃ ┃ ┣ 📜todoList.tsx  
┃ ┃ ┣ 📜todoMain.tsx  
┃ ┃ ┗ 📜todoModal.tsx  
┣ 📂hooks  
┃ ┣ 📜useAxiosInstance.ts  
┃ ┣ 📜useOutsideClick.ts  
┃ ┗ 📜useRedirect.ts  
┣ 📂pages  
┃ ┣ 📂api  
┃ ┃ ┗ 📜hello.ts  
┃ ┣ 📂auth  
┃ ┃ ┣ 📜signin.query.tsx  
┃ ┃ ┣ 📜signin.tsx  
┃ ┃ ┣ 📜signup.query.tsx  
┃ ┃ ┗ 📜signup.tsx  
┃ ┣ 📂todo  
┃ ┃ ┗ 📜index.tsx  
┃ ┣ 📜_app.tsx  
┃ ┣ 📜axiosInstance.tsx  
┃ ┗ 📜index.tsx  
┗ 📂service  
┃ ┗ 📜api.ts

- 기본적으로 Next.js의 폴더 라우팅 구조를 따름
- hooks 폴더에 커스텀 훅으로 비즈니스 로직을 분리함
- service 폴더에는 api 루트를 넣어놓음
- src/pages는 로그인/회원가입을 관리하는 auth, todo를 관리하는 todo폴더로 분리함
- query 파일은 co-location 전략을 사용해 사용하는 컴포넌트와 가깝게 위치시킴

# 🛠 첫번째 리팩토링

https://user-images.githubusercontent.com/76519867/184578404-fcc7f82c-2261-49c4-beda-acb932eec611.mov

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

# 🛠 두번째 리팩토링

## React Query 더욱 잘 활용하기

### Type Narrowing

- 기존 코드

  - isSuccess와 data를 구조분해할당으로 가져왔다
  - 이 경우 isSuccess로 data의 존재 여부를 타입 체킹할 수 없다

  ```tsx
  const { data: todos, refetch, isSuccess } = useGetTodosQuery()
  const { mutate: deleteTodoMutate } = useDeleteTodoMutation()

  const [selectedTodo, setSelectedTodo] = useState('')

  const deleteTodo = (id: string) => {
    deleteTodoMutate(id, {
      onSuccess: () => refetch(),
    })
  }

  useEffect(() => {
    refetch()
  }, [isModal.add, isModal.modify])

  // todos의 타입은 Todo[] | undefined 이다
  // 타입스크립트가 제대로 체크하지 못함
  return <>{isSuccess && <TodoMain todos={todos} />}</>
  ```

- 수정한 코드

  - getTodosQuery를 통해 접근하므로 정상적으로 타입체크가 가능하다

  ```tsx
  const getTodosQuery = useGetTodosQuery()
  const deleteTodoMutation = useDeleteTodoMutation()

  const [selectedTodo, setSelectedTodo] = useState('')

  const deleteTodo = (id: string) => {
    deleteTodoMutation.mutate(id, {
      onSuccess: () => getTodosQuery.refetch(),
    })
  }

  useEffect(() => {
    getTodosQuery.refetch()
  }, [isModal.add, isModal.modify])

  return <>{getTodosQuery.isSuccess && <TodoMain todos={getTodosQuery.todos} />}</>
  ```

### Colocation

- 기존 Query 파일 위치

  📦 service  
  ┣ 📜 api.ts  
  ┗ 📜 query.ts

- 수정한 Query 파일 위치  
   📦 auth  
   ┣ 📜 signin.query.tsx  
   ┣ 📜 signin.tsx  
   ┣ 📜 signup.query.tsx  
   ┗ 📜 signup.tsx

- 장점

  - 해당 컴포넌트에서 필요한 Query 관련 정보를 찾기 쉬움
  - 구조적으로 Query 파일이 분리 가능

- 단점

  - a.tsx에서 사용되는 Query가 b.tsx에서도 필요할 경우 처리 방법을 고려해야함

    📦 A  
    ┣ 📜 a.query.tsx  
    ┣ 📜 a.tsx  
    📦 B  
    ┣ 📜 b.query.tsx  
    ┣ 📜 b.tsx

- 결론
  - 옳고 그름의 문제는 아니고 선호도의 차이인 것 같다
  - 개인적으로는 Colocation 방식에 선호도가 있다
  - 이유는 다음과 같다
    1. Query는 결국 컴포넌트에서 사용하기 위해 존재하므로 컴포넌트와 같은 위치에 놓았을 때 해당 쿼리 정보를 찾기 쉽고, 해당 쿼리 파일의 내용이 예상 가능하다.
    2. 단점에서 언급한 재사용 문제도 A, B 폴더의 상위 폴더에 쿼리 파일을 위치시키는 등의 방법으로 해결 가능하다.

### Query Key Factories

- 기존 코드

  - 각각 쿼리 키를 설정해둠

  ```tsx
  export const useGetTodoQuery = (id: string, { enabled }: { enabled?: boolean }) => {
    return useQuery(
      ['todo', id],
      async (): Promise<Todo> => await axios.get(`${API.TODOS}/${id}`).then((res) => res.data.data),
      { enabled },
    )
  }

  export const useGetTodosQuery = () => {
    return useQuery(
      ['todos'],
      async (): Promise<Todo[]> =>
        await axios.get(`${API.TODOS}`).then(async (res) => {
          return res.data.data
        }),
    )
  }
  ```

- 수정한 코드

  - todoKeys 객체를 만듦
  - 구조적으로 QueryKey를 관리 가능

  ```tsx
  export const useGetTodoQuery = (id: string, { enabled }: { enabled?: boolean }) => {
    return useQuery(
      todoKeys.todo(id),
      async (): Promise<Todo> => await axios.get(`${API.TODOS}/${id}`).then((res) => res.data.data),
      { enabled },
    )
  }

  export const useGetTodosQuery = () => {
    return useQuery(
      todoKeys.all,
      async (): Promise<Todo[]> =>
        await axios.get(`${API.TODOS}`).then(async (res) => {
          return res.data.data
        }),
    )
  }

  export const todoKeys = {
    all: ['todos'] as const,
    todo: (id: string) => ['todo', id] as const,
  }
  ```

  ### 데이터 최신 상태로 만들기

  - 기존 코드

    - refetch를 통해 데이터 최신화

    ```tsx
    const getTodosQuery = useGetTodosQuery()
    const deleteTodoMutation = useDeleteTodoMutation()

    const [selectedTodo, setSelectedTodo] = useState('')

    const deleteTodo = (id: string) => {
      deleteTodoMutation.mutate(id, {
        onSuccess: () => getTodosQuery.refetch(),
      })
    }

    useEffect(() => {
      if (!isModal.add || !isModal.modify) {
        getTodosQuery.refetch()
      }
    }, [isModal.add, isModal.modify])
    ```

  - 수정한 코드

    - queryClient.invalidateQueries를 통해 해당 쿼리키 데이터 최신화

    ```tsx
    const queryClient = useQueryClient()

    const getTodosQuery = useGetTodosQuery()
    const deleteTodoMutation = useDeleteTodoMutation()

    const [selectedTodo, setSelectedTodo] = useState('')

    const deleteTodo = (id: string) => {
      deleteTodoMutation.mutate(id, {
        onSuccess: () => queryClient.invalidateQueries(todoKeys.all),
      })
    }

    useEffect(() => {
      if (!isModal.add || !isModal.modify) {
        queryClient.invalidateQueries(todoKeys.all)
      }
    }, [isModal.add, isModal.modify])
    ```

  - 정리
    - 현재 상황에서는 최신화가 필요한 getTodosQuery를 같은 컴포넌트에서 가지고 오고 있기 때문에 refetch도 괜찮은 옵션
    - 하지만 최신화가 필요한 쿼리가 같은 컴포넌트에 없는 상황이라면 invalidateQueries와 쿼리키로 최신화해주면 됨

### 참고 자료

[TKDodo's blog](https://tkdodo.eu/blog/)  
[stale-while-revalidate 전략은 어떻게 활용되고 있을까](https://youthfulhps.dev/web/stale-while-ravalidate/#stale-while-revalidate)

# 가장 고민한 것들

- 구조적으로 에러 핸들링하기
  - React의 Suspense, React Query의 QueryErrorResetBoundary, errorBoundary를 사용해 로딩, 에러, 리셋처리를 위임했다
  - 컴포넌트에서는 성공 시만 고려할 수 있음
- React Query를 더욱 깊게 사용해보기
  - TypeNarrowing, CoLocation, Query Key Factories, invalidateQueries를 등의 개념을 토대로 리팩토링
  - React Query에 대한 더욱 깊은 이해를 토대로 각 기능들을 잘 활용할 수 있음

# 개선 사항

- QueryErrorResetBoundary를 사용한 reset 처리에 대한 확신이 없음
- 에러 종류에 따른 에러 처리가 미흡함
- React Query의 반복적인 코드를 감싸는 래퍼 컴포넌트를 만들어 볼 수 있을 것 같음
