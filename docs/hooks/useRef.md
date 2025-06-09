# useRef

> Source: [Mumu-Kim - useRef](https://mumu-kim.tistory.com/m/entry/useRef)

**1. useRef**

- 함수형 컴포넌트에서 **참조(Ref) 객체를 생성하고 유지**하는 Hook
- 주 용도 :
  - DOM 요소 직접 접근 (ex, input focus)
  - 리렌더링 없이 값 저장 (ex, 이전 값, 타이머ID 등)

**2. 특징**

- useRef(initialValue)는 **{ current : initialValue }** 형태의 객체 반환
- **컴포넌트 생명주기 전체** 동안 동일한 객체를 유지
- .current 값을 변경해도 리렌더링이 발생하지 **않음**
- 값의 변경을 React가 감지하지 **않음** (따라서 **UI갱신에는 사용불가**)

**3. DOM 직접 조작**

- useRef로 참조하는 DOM 요소는 가상DOM이 아닌, **실제 DOM 요소**임
- 그렇기 때문에 React의 선언적 패러다임을 벗어나 **명령형으로 DOM**을 직접 조작할 수 있음
- 선언적 모델로 처리하기 어려운 작업이나 외부 라이브러리 연동에 유용

```js
const inputRef = useRef(null);
<input ref={inputRef}>
// inputRef.current.focus() 돔에 직접 접근
```

**4.useState와의 차이**

- **useState** : 값이 바뀌면 컴포넌트 리랜더링
- **useRef** : 값이 바뀌어도 리랜더링되지 않음
- 값 저장만 필요하고 화면 갱신이 필요없을 때 useRef 사용

```js
const [count, setCount] = useState(0);
const increment = () => setCount(count + 1); // 리렌더링 발생

const countRef = useRef(0);
const incrementRef = () => {
  countRef.current += 1;
}; // 리렌더링 없음
```

**5.커스텀 컴포넌트에 ref 전달**

- **forwardRef**로 ref를 하위 컴포넌트에 전달 가능 (React19부터는 forwardRef 없이도 가능예정)

```js
const CustomInput = forwardRef((props,ref)
    => <input ref={ref} {...props}>
)
```

**6. 주의사항**

- 초기값을 null로 주면 null 체크 필수

```js
const doSomething = () => {
  if (inputRef.current) {
    inputRef.current.focus();
  }
};
```

- 불필요한 DOM 조작은 피하기 (React의 선언적 흐름을 해침)
- DOM요소는 **렌더링 후**에 ref에 할당됨.
  - 랜더링 중에는 ref가 아직 할당되지 않음에 유의
