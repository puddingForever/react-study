# useState

> 출처: [useState 상태](https://kyoungjooo.github.io/react/250308/)

## useState란?

useState는 React에서 상태(state)를 관리하기 위한 Hook입니다. 컴포넌트에서 동적인 값을 관리할 때 사용되며, 상태가 변경될 때마다 컴포넌트가 리렌더링됩니다.

### 기본 개념

- 컴포넌트 함수 내부의 코드는 처음 렌더링될 때 한 번만 실행됩니다.
- 일반적인 변수는 값이 변경되어도 React의 상태를 관리할 수 없습니다.
- useState를 사용해야 UI 업데이트가 가능합니다.

## 상태 업데이트 방식

### 1. 함수형 업데이트

이전 상태 값을 기반으로 업데이트할 때는 함수형 업데이트 방식을 사용합니다.

```jsx
const [isEditing, setIsEditing] = useState(false);

// 함수형 업데이트
setIsEditing((prevIsEditing) => !prevIsEditing); // true
setIsEditing((prevIsEditing) => !prevIsEditing); // false
```

### 2. 직접 업데이트 (비권장)

```jsx
const [isEditing, setIsEditing] = useState(false);

// 직접 업데이트 (예상치 못한 결과 발생 가능)
setIsEditing(!isEditing); // false → true
setIsEditing(!isEditing); // false → true (이전 상태 참조)
```

## useState의 비동기 처리

React는 성능 최적화를 위해 useState의 상태 업데이트를 비동기적으로 처리합니다.

### 비동기 처리의 이유

1. **배칭(Batching) 최적화**

   - 여러 번의 상태 업데이트를 한 번의 렌더링으로 묶어서 처리
   - **여러 번 setState 호출해도 리렌더링 1번만 발생**

2. **렌더링의 일관성 유지**
   - 상태 변경이 즉시 반영되지 않고, React가 상태 변경을 예약
   - 적절한 시점에 한 번의 렌더링으로 처리

### 상태 업데이트 프로세스

1. setState 호출
2. React 내부에서 상태 업데이트 예약
3. 현재 실행 중인 코드가 끝날 때까지 대기
4. React가 한꺼번에 상태 변경을 처리
5. 새로운 상태가 반영된 UI 업데이트

## 주의사항

- 상태 업데이트는 비동기적으로 처리되므로, 업데이트된 상태를 즉시 사용할 수 없습니다.
- 이전 상태 값을 기반으로 업데이트할 때는 반드시 함수형 업데이트를 사용해야 합니다.
- 여러 번의 상태 업데이트가 필요한 경우, 함수형 업데이트를 사용하여 안전하게 처리해야 합니다.

## 예제 코드

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  // 올바른 방법: 함수형 업데이트
  const increment = () => {
    setCount((prevCount) => prevCount + 1);
  };

  // 잘못된 방법: 직접 업데이트
  const incrementWrong = () => {
    setCount(count + 1); // 이전 상태를 참조할 수 있음
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>증가</button>
    </div>
  );
}
```
