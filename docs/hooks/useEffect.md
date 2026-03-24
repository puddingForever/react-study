# Side Effects & useEffect

> Source: [안나의 전두엽 어딘가 🧠 - [React] Side Effects / useEffect 훅 / useCallback 훅](https://dksek3050.tistory.com/168)

**Side Effect(부수 효과)란?**

- 컴포넌트가 **렌더링되는 과정과는 직접적인 관련이 없지만**, 애플리케이션이 정상적으로 작동하기 위해 반드시 수행되어야 하는 작업을 의미합니다.

**예시코드**

```jsx
function App() {
  // 위치정보 찾기
  navigator.geolocation.getCurrentPosition((position) => {
    const sortedPlaces = sortPlacesByDistance(
      AVAILABLE_PLACES,
      position.coords.latitude,
      position.coords.longitude
    );
  });

  return (
    <>
      <Modal ref={modal}>{/* ... */}</Modal>
      <header>{/* ... */}</header>
      <main>{/* ... */}</main>
    </>
  );
}
```

- 이 코드는 브라우저에게 현재 위치 정보를 요청하는 작업을 하고 있습니다.
- 컴포넌트는 기본적으로 "입력(props) → 출력(UI)"처럼 순수하게 동작하는 것이 이상적입니다.
- 하지만 navigator.geolocation.getCurrentPosition()처럼 외부 환경(브라우저, 서버 등)과 상호작용하는 작업은 UI를 직접 변경하지는 않지만, 앱이 정상적으로 동작하기 위해 꼭 필요한 작업이며, 이러한 작업은 컴포넌트의 순수성에 영향을 주는 부수 효과(Side Effect)로 분류됩니다.

**Side Effect로 인한 문제: 무한 루프**

```jsx
function App() {
  const [avaliablePlaces, setAvaliablePlaces] = useState();

  navigator.geolocation.getCurrentPosition((position) => {
    const sortedPlaces = sortPlacesByDistance(
      AVAILABLE_PLACES,
      position.coords.latitude,
      position.coords.longitude
    );
    setAvaliablePlaces(sortedPlaces);
  });

  return <>{/* ... */}</>;
}
```

렌더링 → 위치 정보 요청 → 상태 변경 → 다시 렌더링 → ... 무한 루프 발생

# useEffect로 Side Effect 안전하게 처리하기

### useEffect란?

React 컴포넌트가 **렌더링된 후** 실행되는 부수 효과(예: API 호출, 타이머 설정 등)를 처리하는 Hook입니다.

```js
useEffect(() => {
  // 실행할 부수 효과 코드
}, [의존성]);
```

- 첫 번째 인자: 실행할 함수
- 두 번째 인자: 의존성 배열
- []이면 컴포넌트 최초 렌더링 시 한 번만 실행됨

### 예제1: 무한 루프 방지

```jsx
function App() {
  const [avaliablePlaces, setAvaliablePlaces] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        AVAILABLE_PLACES,
        position.coords.latitude,
        position.coords.longitude
      );
      setAvaliablePlaces(sortedPlaces);
    });
  }, []); // 최초 한 번만 실행

  return <>{/* ... */}</>;
}
```

- []를 사용해 위치 정보 요청을 최초 한 번만 실행, 무한 루프 방지.

### 예제2: 브라우저 API 동기화

```jsx
function Modal({ open, children }) {
  const dialog = useRef();

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]); // open 값이 바뀔 때마다 실행

  return createPortal(
    <dialog className="modal" ref={dialog}>
      {children}
    </dialog>,
    document.getElementById('modal')
  );
}
```

- JSX 렌더링 이후에 dialog.current에 접근해야 하므로 useEffect 사용이 필수. open 값에 따라 showModal/close 동기화.

### 예제3: 클린업(Cleanup) 함수로 타이머 제어

```jsx
function DeleteConfirmation({ onConfirm, onCancel }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onConfirm();
    }, 5000);

    return () => {
      clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
    };
  }, []);

  return (
    <div>
      <button onClick={onCancel} className="button-text">
        No
      </button>
      <button onClick={onConfirm} className="button">
        Yes
      </button>
    </div>
  );
}
```

- 타이머 실행 후 컴포넌트가 사라지면 clearTimeout()으로 정리해 불필요한 삭제 실행 방지.

### 정리

- useEffect는 DOM이 렌더링된 뒤에 실행됨 (useState는 랜더링과정에 실행됨) 
- 의존성 배열을 잘 설정하면 불필요한 실행을 막고 성능 향상
- 클린업 함수는 리소스 정리, 메모리 누수 방지 등에 꼭 필요함
