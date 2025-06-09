# useReducer

> Source: [Dev Notes - React_useReducer 상태관리](https://kyoungjooo.github.io/react/250330/)

React의 **useReducer** 훅은 **복잡한 상태**를 관리하거나 **상태 간에 연관**이 있을 때 유용하게 사용할 수 있는 상태 관리 도구입니다.

**1. useReducer란?**

- React 공식 문서 정의: 컴포넌트에 **reducer를 추가**하는 훅.
- 목적: 서로 연관된 여러 상태를 **하나의 객체로 묶고**, 상태 변화 로직을 **reducer 함수**로 정리하여 관리함.

**2. useState vs useReducer**

| 기준         | useReducer                                                                 | useState                  |
| ------------ | -------------------------------------------------------------------------- | ------------------------- |
| 상태 수      | 상태가 여러 개이고 복잡할 때                                               | 1\~2개로 단순한 상태일 때 |
| 상태 간 관계 | 여러 상태가 서로 영향을 주거나, 하나의 액션으로 여러 상태를 변경해야 할 때 | 각 상태가 독립적일 때     |

- 두 훅은 함께 사용 가능하며, 언제든지 교체해서 써도 문제 없음.
- 상태가 복잡할수록 **useReducer**를 쓰는 것이 가독성과 유지보수에 좋음.

**3.reducer 함수란?**

- **(state, action) => newState** 형태의 순수 함수
- 컴포넌트 외부에 정의하는 것이 일반적 (불필요한 재생성을 막기 위해)

```js
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      return state;
  }
}
```

**4. action 객체**

- 사용자의 행동을 기술하는 객체

```js
{
  type: "ADD_TODO",
  payload: { id: 1, text: "할 일 추가하기" }
}
```

**5.payload란?**

- 상태 변경에 필요한 **추가 데이터**를 포함하는 속성
- 예: 새로운 할 일 항목 추가 시, 해당 내용을 payload로 전달

**6.reducer 작성 시 주의할 점**

- **순수 함수**여야 함 (외부 값 참조 X, side-effect 없음)
- 불변성 유지 (state 직접 수정 금지)
- 하나의 액션은 하나의 사용자 상호작용을 설명해야 함 (여러 변경 사항이 있어도 하나의 액션으로 처리)

**7.dispatch 함수**

- **useReducer**가 반환하는 두 번째 값
- 액션을 **reducer** 함수로 전달함

```js
const [state, dispatch] = useReducer(reducer, { count: 0 });

dispatch({ type: 'increment' });
```

- 예시 코드

```jsx
import { useReducer } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      return state;
  }
}

export default function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <>
      <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>Decrement</button>
      <p>Current count: {state.count}</p>
    </>
  );
}
```

**8. 결론**

- **useReducer**는 복잡하거나 서로 연관된 상태를 관리할 때 유용함
- **순수 함수**와 **불변성 개념**이 중요함
- 상황에 따라 **useState**와 **useReducer**를 적절히 선택해 사용하는 것이 핵심
