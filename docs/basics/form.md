# React 폼 다루기 핵심 요약

> Source: [안나의 전두엽 어딘가 - React에서 폼(form) 다루기](https://dksek3050.tistory.com/181)

## 1. 입력 데이터 추출 방법

### useState로 입력 상태 관리 (양방향 바인딩)

```jsx
const [username, setUsername] = useState('');

<input value={username} onChange={(e) => setUsername(e.target.value)} />;
```

- 리액트에서 가장 많이 사용하는 방식
- 실시간으로 상태를 추적하고 활용 가능
- 단점: 코드가 조금 길어질 수 있음

### useRef로 DOM 요소 접근

```jsx
const inputRef = useRef();

function handleSubmit(event) {
  event.preventDefault();
  const input = inputRef.current.value;
}

<input ref={inputRef} />;
```

- 값이 필요할 때만 추출하면 되는 경우 사용
- 렌더링을 발생시키지 않음 (퍼포먼스 유리)
- 단점: 리액트의 상태 흐름에서 벗어날 수 있음

### FormData API로 한 번에 추출

```jsx
function handleSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());
}
```

- form 전체 데이터를 한 번에 가져올 수 있음
- input에 name 속성이 필수
- 체크박스처럼 여러 값을 가지는 경우는 formData.getAll() 사용 필요

## 2. 유효성 검증 (Validation)

### 실시간 검증 (onChange)

```jsx
<input
  value={email}
  onChange={(e) => {
    setEmail(e.target.value);
    setError(!validateEmail(e.target.value));
  }}
/>
```

- 입력할 때마다 검증
- ❌ 문제: 사용자가 입력을 마치기도 전에 에러가 떠버리는 UX

### 포커스 해제 시 검증 (onBlur)

```jsx
<input onBlur={() => setTouched(true)} />
```

- 사용자가 입력 후 포커스를 벗어나면 검증
- ✅ UX 관점에서 가장 적절한 타이밍

### HTML의 내장 속성 사용

```jsx
<input required minLength={5} />
```

- 브라우저 기본 유효성 검사가 작동
- 간단한 유효성에는 매우 유용

## 3. 폼 초기화 처리

### useState로 초기값 설정

```jsx
setUsername(''); // 다시 빈 문자열로
```

- 가장 일반적인 리액트 방식

### useRef 초기화

```jsx
inputRef.current.value = '';
```

- DOM을 직접 조작하는 방식이라 권장되진 않지만, 간단한 경우 사용 가능

### event.target.reset() 사용

```jsx
function handleSubmit(e) {
  e.preventDefault();
  e.target.reset(); // form 전체 초기화
}
```

- 한 줄로 폼 전체를 초기화 가능
- 상태를 쓰지 않는 경우 특히 유용

## 4. 양식 제출 제어 (submit 제어)

### HTML의 기본 동작

- `<form>` 태그는 원래 **서버로 데이터 제출 + 전체 페이지 새로고침**을 유발
- 이건 전통적인 **SSR(Server-Side Rendering)** 방식에 맞춘 설계

### 리액트에선 왜 문제가 될까?

- 리액트는 **CSR(Client-Side Rendering)** 기반
- 페이지 전체를 새로고침하면:
  - 리액트가 관리하던 상태가 날아가고
  - 앱 흐름이 깨지며
  - 사용자 경험이 떨어지게 됨
- 그래서 반드시 기본 submit 동작을 **막아야** 함

### 해결 방법

#### 1. type="button" 사용

```jsx
<form>
  <button type="button">제출</button>
</form>
```

- `<button>`의 기본값은 type="submit"이므로 명시적으로 설정해야 함

#### 2. onSubmit + preventDefault()

```jsx
<form
  onSubmit={(e) => {
    e.preventDefault();
    // 사용자 입력 처리 로직
  }}
>
  <button type="submit">제출</button>
</form>
```

- 가장 일반적인 방식

#### 3. formAction (React 19 이상)

```jsx
<form>
  <button formAction={handleAction}>제출</button>
</form>
```

- 서버 액션과 연동되는 새로운 방식
- React 19에서만 사용 가능

---

**핵심 요약**

- 폼 입력값 추출은 useState, useRef, FormData 등 상황에 맞게 선택
- 유효성 검사는 onBlur 타이밍이 UX에 가장 적합
- 폼 초기화는 상태/DOM/reset() 등 활용
- 제출 시 반드시 preventDefault()로 새로고침 방지
