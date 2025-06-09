# useImperativeHandle

> Source: [Dev Notes - React_useRef 참조, useImperativeHandle](https://kyoungjooo.github.io/react/250320/)

**1. 정의**

- **useImperativeHandle**은 자식 컴포넌트가 부모에게 ref를 통해 **특정 함수나 값만 노출**하고 싶을 때 사용하는 React Hook입니다.
- 주로 **forwardRef**와 함께 사용합니다.

**2. 왜 필요한가?**

- 부모 컴포넌트가 자식 컴포넌트의 ref를 통해 자식의 DOM이나 내부 요소에 직접 접근하게 되면,
  부모가 자식의 내부 구현 방식에 의존하게 됩니다.
- 예를 들어, 부모가 자식의 특정 DOM 메서드(showModal 등)에 직접 접근하면, 자식 구조가 바뀔 때마다 부모도 수정해야 합니다.

**3. 어떻게 동작하는가?**

- **자식 컴포넌트**에서 useImperativeHandle(ref, () => ({ ... }))을 사용해, 부모가 **ref.current**로 접근할 수 있는 값/메서드를 **직접 지정**할 수 있습니다.
- 이렇게 하면 자식 내부의 DOM 구조가 바뀌어도, 부모는 노출된 메서드(예: open, close 등)만 사용하면 되므로 **구현이 분리**됩니다.

**4. 예시코드**

```js
// 부모 컴포넌트
const dialogRef = useRef();
return <ResultModal ref={dialogRef} />;

// 자식 컴포넌트
import { forwardRef, useImperativeHandle, useRef } from 'react';

const ResultModal = forwardRef((props, ref) => {
  const dialog = useRef(); // dialog DOM요소에 접근하기위한 로컬 ref

  useImperativeHandle(ref, () => ({
    // 부모가 전달한 ref에 커스텀동작(open/close) 연결
    open() {
      dialog.current.showModal();
    },
    close() {
      dialog.current.close();
    },
  }));

  return <dialog ref={dialog}>내용</dialog>;
});
```

**5. 장점**

- 부모는 자식의 내부 구현을 몰라도, 오직 **노출된** 메서드만 사용하면 됨
- 자식 컴포넌트의 재사용성과 유지보수성 향상

**6. 한 줄 요약**

- **useImperativeHandle**은 자식 컴포넌트가 ref를 통해 부모에게 원하는 메서드만 노출할 수 있게 해, **부모-자식 간 결합도를 낮추고 유지보수를 쉽게** 해주는 Hook입니다.
