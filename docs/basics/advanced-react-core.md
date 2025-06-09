# Advanced React Core

> Source: [Section 4: React 핵심 - 심화 단계](https://purple-reward-505.notion.site/React-1-a230a5fa52b04962adc1f80082341a94#1a8727fe695f80e3ba08df5b78a0dfb1)

**1. JSX는 필수가 아니다**

- JSX없이도 React.createElement로 컴포넌트 작성가능
- 빌드시 JSX는 JS 코드로 변환되므로 결과는 동일

```js
function MyComponent() {
  return React.createElement('h1', null, 'Hello, world!');
}
```

**2. Fragment 사용**

- 컴포넌트는 반드시 **하나의** 부모 요소로 감싸야 함
- 불필요한 div 생성 없이 **<`Fragment`>** 또는 <> </>로 여러 요소를 그룹화 가능

```js
<>
  <button>Test</button>
  <button>Test2</button>
</>
```

**3. 컴포넌트 분리와 Props 전달**

- 컴포넌트가 너무 많은 역할을 할 때, 하위 컴포넌트로 분리
- Props는 {...props}로 여러 개 전달 가능

```js
function Section({ title, children, ...props }) {
  return <section {...props}>{children}</section>;
}
```

**4. 동적 컴포넌트 타입**

- 컴포넌트의 태그(타입)를 동적으로 지정 가능 (대문자 변수)

```js
예시 ) <Section tabContainer="menu" /> → <menu>Context</menu>

function Section({ tabContainer }) {
  const TabContainer = tabContainer;
  return <TabContainer>Context</TabContainer>;
}
```

**5. 이미지 관리**

- public/: 정적 파일 직접 접근 가능 (예: /some-image.jpg)
- src/assets/: 빌드시 public으로 복사, 직접 접근 불가

**6. 올바른 State 업데이트**

- 상태 변경 시 이전 상태를 기반으로 업데이트 필요

```js
setIsEditing((prev) => !prev);
```

- 연속적으로 상태 변경할 때 현재 상태만 참조하면 버그 발생 가능
