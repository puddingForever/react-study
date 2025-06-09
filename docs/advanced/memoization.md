# React 메모이제이션

> Source: [React Optimization using memo, useMemo and useCallback](https://medium.com/@bytePudding/react-optimization-using-memo-usememo-and-usecallback-bc0d669c16c4)

React에서 **메모이제이션(Memoization)** 은 쉽게 말해서 **"컴포넌트나 함수가 불필요하게 다시 실행되지 않도록 결과를 기억해두는 것"** 입니다.

## 1. `React.memo` (컴포넌트 레벨 메모이제이션)

- **역할**: 컴포넌트 전체를 메모이제이션해서, props가 변경되지 않으면 리렌더링을 방지합니다.
- **언제 사용?**
  - 컴포넌트가 자주 리렌더링될 때
  - props가 거의 변하지 않을 때
  - 렌더링 비용이 큰(무거운) 컴포넌트일 때

### 코드 예시

```jsx
import React from 'react';

const ChildComponent = ({ name }) => {
  console.log('Rendering Child Component');
  return <div>Hello, {name}</div>;
};

export default React.memo(ChildComponent);
```

- name prop이 바뀌지 않으면 ChildComponent는 다시 렌더링되지 않습니다.

## 2. `useMemo` (값 레벨 메모이제이션)

- **역할** : 계산 비용이 큰 값을 메모이제이션해서, 의존성 배열이 바뀔 때만 다시 계산합니다.

- **언제 사용?**
  - 무거운 **연산 결과**를 여러 번 재사용할 때
  - 연산이 props나 state에 따라 자주 바뀔 때
  - 값이 여러 자식 컴포넌트에 전달될 때

### 코드 예시

```jsx
import React, { useMemo } from 'react';

function isPrime(num) {
  // 소수 판별 함수 (무거운 계산 예시)
}

function Counter({ initialCount }) {
  const initialCountIsPrime = useMemo(
    () => isPrime(initialCount),
    [initialCount]
  );
  return <div>{initialCountIsPrime ? '소수' : '소수 아님'}</div>;
}
```

- initialCount가 변할 때만 isPrime 함수가 실행됩니다.

## 3. `useCallback` (함수 레벨 메모이제이션)

- **역할**: 함수를 메모이제이션해서, 의존성 배열이 바뀔 때만 새로운 함수 참조를 만듭니다.

- **언제 사용?**
  - 콜백 함수를 props로 **자식 컴포넌트에 전달**할 때
  - 함수 생성 비용이 클 때
  - 자식 컴포넌트가 React.memo로 감싸져 있을 때 시너지효과

### 코드 예시

```jsx
import React, { useState, useCallback } from 'react';

const Button = React.memo(({ onClick, label }) => {
  console.log('Button rendered');
  return <button onClick={onClick}>{label}</button>;
});

const ParentComponent = () => {
  const [count, setCount] = useState(0);
  const increment = useCallback(() => setCount((c) => c + 1), []);

  return (
    <div>
      <h1>{count}</h1>
      <Button onClick={increment} label="Increment" />
    </div>
  );
};
```

- increment 함수는 동일한 참조를 유지하므로, Button 컴포넌트가 불필요하게 리렌더링되지 않습니다.

- 자식 컴포넌트가 React.memo로 감싸져 있지 않으면, useCallback은 "성능 최적화" 관점에서 거의 소용이 없습니다.
  - 왜냐하면 자식 컴포넌트가 React.memo로 감싸져 있지 않다면,부모 컴포넌트가 리렌더링될 때 자식 컴포넌트도 무조건 리렌더링됩니다.
  - 부모가 useCallback을 써서 함수를 메모이제이션하든 말든, 어차피 자식이 props 비교로 렌더링 여부를 결정하지 않기 때문에, 함수 참조가 같더라도 자식은 리렌더링됩니다.

### 실제 사용 전략 및 주의점

- memo, useMemo, useCallback 모두 메모이제이션 자체에 비용이 듭니다.
- 단순한 연산이나 간단한 컴포넌트에는 오히려 성능이 악화될 수 있습니다.
- React.memo와 useCallback은 함께 써야 효과가 있습니다.
  - 부모 컴포넌트가 리렌더링될 때마다 함수가 새로 만들어지면, 자식 컴포넌트의 memoization이 무의미해집니다.

### 요약 코드

```js
// 1. component memoization
const Counter = memo(function Counter({initialCount)) {

    // 2. value memoization
    const initialCountIsPrime = useMemo(() => isPrime(initialCount),
                                         [initialCount])

    // 3. function memoization
    const handleIncrement = useCallback(() => setCounterChanges(prev => [...prev]),[])

})
```

### 결론

- 메모이제이션은 자체적인 비용이 따르기 때문에, 단지 몇 번의 리렌더링을 피하기 위해 모든 것을 메모이제이션할 필요는 없습니다.
- 무거운 계산이나 렌더링 비용이 큰 컴포넌트를 피해야 할 때 메모이제이션 훅을 사용하는 것이 좋습니다
