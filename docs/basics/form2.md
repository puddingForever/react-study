# React 19의 폼 처리 방식

> 출처: [안나의 전두엽 어딘가 - React 19에서의 폼 처리 방식](https://dksek3050.tistory.com/182?category=1231973)

## Form Action

React 19에서는 `<form action={someFunction}>`처럼 action 속성에 함수를 전달할 수 있습니다.

### 주요 특징

- `preventDefault()` 자동 호출
- FormData 객체를 자동으로 함수에 전달
- `<input>`, `<select>` 등의 name 속성을 기반으로 FormData 구성
- 제출 완료 시 자동 폼 초기화

```jsx
<form action={myAction}>
  <input name="email" />
  <button>Submit</button>
</form>
```

> ⚠️ 주의: 모든 입력 요소에는 반드시 name 속성을 지정해야 합니다.

## useActionState 훅

폼의 상태와 액션 함수를 연결하여, 액션 함수의 반환값을 UI에서 쉽게 사용할 수 있게 해주는 훅입니다.

```jsx
const [formState, formAction, isPending] = useActionState(
  actionFn,
  initialState
);
```

### 매개변수

- **actionFn**: 폼 제출 시 실행될 함수 (prevState, formData)를 인자로 받음
- **initialState**: 초기 상태

### 반환값

- **formState**: 현재 상태
- **formAction**: form 요소의 action에 전달할 수 있는 React가 감지 가능한 래핑된 함수
- **isPending**: 비동기 요청 중 여부 (폼 제출 중일 때 true)

### 예시: 유효성 검사 및 에러 처리

```jsx
function signupAction(prevState, formData) {
  const email = formData.get('email');
  const password = formData.get('password');

  const errors = [];

  if (!email.includes('@')) errors.push('잘못된 이메일 형식입니다.');
  if (!password || password.length < 6)
    errors.push('비밀번호는 6자 이상이어야 합니다.');

  if (errors.length > 0) {
    return { errors, enteredValues: { email, password } };
  }

  return { errors: null };
}

const [formState, formAction] = useActionState(signupAction, { errors: null });

<form action={formAction}>
  <input name="email" defaultValue={formState.enteredValues?.email} />
  <input
    name="password"
    type="password"
    defaultValue={formState.enteredValues?.password}
  />
  {formState.errors && (
    <ul>
      {formState.errors.map((e) => (
        <li key={e}>{e}</li>
      ))}
    </ul>
  )}
  <button>Sign Up</button>
</form>;
```

## useFormStatus 훅

현재 `<form>`의 제출 상태와 관련된 정보를 제공하는 훅입니다.

### 주요 특징

- 폼의 자식 컴포넌트에서 제출 상태에 따라 UI 동적 제어 가능
- 제출 중 버튼 비활성화
- 로딩 스피너 표시
- 상태에 따른 메시지 표시

```jsx
import { useFormStatus } from 'react';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending}>{pending ? 'Submitting...' : 'Submit'}</button>
  );
}
```

> ⚠️ 주의: useFormStatus는 `<form>` 태그 안에 위치한 컴포넌트에서만 사용 가능합니다.

### 반환되는 객체 속성

| 속성명  | 설명                              |
| ------- | --------------------------------- |
| pending | 폼이 제출 중일 때 true            |
| data    | 폼 제출 시 전송되는 FormData 객체 |
| method  | 폼 요청 방식 (예: "post")         |
| action  | 폼에 지정된 액션 함수 또는 URL    |
| enctype | 폼 인코딩 타입                    |

## useOptimistic 훅

useOptimistic은 비동기 작업이 완료되기 전에 UI를 낙관적으로(optimistically) 업데이트할 수 있게 해주는 훅입니다.

### 주요 특징

- 서버 응답을 기다리지 않고 즉시 UI 업데이트
- 실제 서버 작업이 완료되면 자동으로 실제 상태로 대체
- 오류 발생 시 이전 상태로 롤백

### 사용 예시

```jsx
import { useOptimistic } from 'react';

function OpinionList({ opinions }) {
  const [optimisticVotes, addOptimisticVote] = useOptimistic(
    opinions,
    (state, opinionId) => {
      return state.map((opinion) =>
        opinion.id === opinionId
          ? { ...opinion, votes: opinion.votes + 1 }
          : opinion
      );
    }
  );

  async function handleVote(opinionId) {
    addOptimisticVote(opinionId);
    await upvoteOpinion(opinionId);
  }

  return (
    <ul>
      {optimisticVotes.map((opinion) => (
        <li key={opinion.id}>
          {opinion.text} - Votes: {opinion.votes}
          <button onClick={() => handleVote(opinion.id)}>Upvote</button>
        </li>
      ))}
    </ul>
  );
}
```

### 동작 방식

1. `addOptimisticVote(opinionId)`를 호출하면 UI가 즉시 업데이트됩니다.
2. 실제 서버 작업은 `await upvoteOpinion(id)`에서 진행됩니다.
3. 폼 제출 중에는 `optimisticVotes` 값이 화면에 표시됩니다.
4. 제출이 완료되면 이 값은 사라지고 실제 상태로 대체됩니다.
5. 만일 폼 제출 과정에서 오류가 발생했다면 이전 상태로 롤백됩니다.

## 버튼별 다른 액션 처리

같은 `<form>` 안에서도 각 버튼마다 다른 함수를 실행할 수 있습니다.

```jsx
<form>
  <button formAction={saveDraft}>임시 저장</button>
  <button formAction={submitFinal}>최종 제출</button>
</form>
```

## Form Action vs onSubmit 비교

| 비교 항목        | Form Action                    | onSubmit                      |
| ---------------- | ------------------------------ | ----------------------------- |
| 선언 방식        | `<form action={function}>`     | `<form onSubmit={handler}>`   |
| 기본 동작 방지   | 자동                           | 수동 (event.preventDefault()) |
| 데이터 수집 방식 | 자동으로 FormData 제공         | event.target에서 수동 수집    |
| 비동기 처리 지원 | ✔ (Promise 지원)               | ✔ (직접 핸들링)               |
| 상태 관리        | useActionState로 간편하게 처리 | 수동으로 useState 등 사용     |
