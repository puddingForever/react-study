# Context API

> Source: [Mumu-Kim - Prop Drilling, Context API](https://mumu-kim.tistory.com/m/entry/%EB%A6%AC%EC%95%A1%ED%8A%B8-%EA%B8%B0%EC%B4%88-%EA%B0%95%EC%9D%98-%EC%A0%95%EB%A6%AC-3-Prop-Drilling-useEffect)

**1. Props Drilling**

**1.1. 문제정의**

- Prop Drilling이란, 상위 컴포넌트의 상태(state)나 함수를 하위 컴포넌트로 전달할 때,
  중간의 여러 컴포넌트가 실제로는 필요하지 않은 props를 단순 전달만 하게 되는 현상.
- 문제점
  - 컴포넌트 재사용성 저하
  - 불필요한 상용구(boilerplate) 코드 증가
  - 코드 유지보수 어려움
  - 컴포넌트 간 의존성 증가
  - 불필요한 리렌더링 발생

**1.2 해결책 1 : 컴포넌트 합성 (Component Composition)**

- children prop이나 slot 패턴을 활용해, 중간 컴포넌트가 불필요하게 props를 받지 않게 함

- 장점:
  - 중간 컴포넌트가 props를 전달하지 않아도 됨
  - 컴포넌트의 책임 분리, 재사용성 증가
- 한계:
  - 모든 상황에서 prop drilling을 완전히 해결하지는 못함
  - 상위 컴포넌트가 비대해질 수 있음
  - 복잡한 상태 관리에는 한계

**1.3. 해결책 2 : Context API**

- **Context API**를 사용하면 컴포넌트 트리 전체에서 데이터를 직접 전달하지 않고 공유 가능
- 주요 특징:
  - 전역 상태 관리 도구
  - Provider/Consumer 패턴, useContext 훅으로 간단하게 사용
- 장점:
  - prop drilling 문제 효과적으로 해결
  - 컴포넌트 결합도 감소, 코드 가독성 향상, 불필요한 리렌더링 감소
- 고려사항:
  - **잦은 업데이트**에는 최적화 필요 (상태 분리 권장)
  - 대규모 앱에서는 Redux 등 외부 상태 관리 도구가 더 적합할 수 있음

**기본 사용법 예시**

```js
// context 생성
import { createContext } from 'react';
const ThemeContext = createContext('light');

// Provider로 값제공
<ThemeContext.Provider value={{ theme, setTheme }}>
  <MainContext />
</ThemeContext.Provider>;

//하위 컴포넌트에서 사용
import { useContext } from 'react';
const { theme, setTheme } = useContext(ThemeContext);
```

- Provider의 value 속성에 상태와 setter를 담아 전달해야 동적 상태 관리 가능

**1.4. useReducer와 Context의 결합**

- 복잡한 상태 관리에는 useReducer와 Context를 함께 사용
- useReducer는 상태(state)와 dispatch 함수를 제공
- Context로 전역 상태와 dispatch를 하위 컴포넌트에 전달

**Context + useReducer 결합예시**

```js
// CounterContext.jsx
import { createContext, useReducer, useContext } from 'react';

const CounterContext = createContext(null);

function CounterProvider({ children }) {
  const [state, dispatch] = useReducer(counterReducer, initialState);
  return (
    <CounterContext.Provider value={{ state, dispatch }}>
      {children}
    </CounterContext.Provider>
  );
}

function useCounter() {
  const context = useContext(CounterContext);
  if (context) throw new Error('useCounter must be iwthin a CounterProvider');
  return context;
}
```

```js
// counterReducer.js
export const initialState = { count, isLoading: false, error: null };

export function counterReducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    case 'DECREMENT':
      return { ...state, count: state.count - 1 };
    case 'LOADING':
      return { ...state, isLoading: true };
    case 'SUCCESS':
      return { ...state, isLoading: false, count: action.payload };
    case 'ERROR':
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error(`Unsupported action type: ${action.type}`);
  }
}
```
