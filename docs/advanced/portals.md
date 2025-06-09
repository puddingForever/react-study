# Portals

> Source: [Section 8: Refs, Portals 활용하기](https://purple-reward-505.notion.site/React-1-a230a5fa52b04962adc1f80082341a94#1be727fe695f80a597acedaaa98b1e4d)

**1.Portals란?**

- **React Portal**은 컴포넌트의 자식요소를 **부모 컴포넌트의 DOM 계층 밖**의 특정 DOM노드로 랜더링 하는 기능

**2.사용예시**

```js
import { createPortal } from 'react-dom';

export default function CustomModal({ ref, result }) {
  return createPortal(
    <dialog ref={ref}>
      <h2> You {result} </h2>
    </dialog>,
    document.getElementById('modal') // 랜더링 위치 지정
  );
}
```

**3.왜 사용하는가?**

- 부모 컴포넌트와는 **별도의 DOM 계층**에서 랜더링이 필요할 때 (예: 모달, 드롭다운, 토스트알림 등)
- **스타일 상속 이슈** 방지 (부모의 overflow, z-index, position 등 스타일에 영향을 받지 않게 하려는 목적)
