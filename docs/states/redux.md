# Redux

> 출처: [Mumu kim - Redux](https://mumu-kim.tistory.com/m/entry/Redux)

## 1. React 상태 관리

상태는 사용자 입력, 서버 응답, 시간 경과 등에 따라 변경되는 애플리케이션의 데이터를 말합니다. 상태 관리란 이러한 데이터의 생성, 저장, 변경, 사용을 체계적으로 다루는 방법입니다.

### 1.1. 상태의 종류

React 애플리케이션에서 상태는 범위와 영향력에 따라 분류할 수 있습니다.

#### 1) 로컬 상태(Local State)

- 단일 컴포넌트 내에서만 사용되는 상태
- 주로 useState 또는 useReducer 훅으로 관리
- 예: 폼 입력 값, 토글 버튼 상태, 로컬 UI 상태 등

#### 2) 크로스 컴포넌트 상태(Cross-Component State)

- 여러 관련 컴포넌트에서 공유되는 상태
- 상위 컴포넌트의 상태를 props로 전달하거나 Context API를 사용하여 관리
- 예: 모달 창의 열림/닫힘 상태, 탭 선택 상태 등

#### 3) 앱 와이드 상태(App-Wide State)

- 애플리케이션 전체에서 사용되는 글로벌 상태
- Context API, Redux 같은 상태 관리 라이브러리를 사용하여 관리
- 예: 사용자 인증 정보, 테마 설정, 전역 환경 설정 등

### 1.2. Context API의 장단점

#### 장점

- 간편한 데이터 공유: 컴포넌트 트리 어디서나 데이터에 접근 가능
- 내장 기능: 별도의 라이브러리 없이 React만으로 사용 가능
- 명확한 데이터 흐름: Provider와 Consumer 구조로 데이터 흐름이 명확

#### 단점

- 성능 최적화의 어려움: Context 값이 변경되면 모든 소비자 컴포넌트가 리렌더링
- 복잡한 상태 관리: 여러 Context를 중첩해서 사용할 경우 코드가 복잡해질 수 있음
- 디버깅의 어려움: 데이터 흐름을 추적하기 어려울 수 있음

## 2. Redux를 이용한 상태 관리

### 2.1. Redux의 핵심 개념

Redux는 JavaScript 앱을 위한 예측 가능한 상태 컨테이너입니다.

#### 1) 리듀서(Reducer)

- 현재 상태와 액션을 인자로 받아 새로운 상태를 반환하는 순수 함수
- 순수 함수여야 함 (동일 입력에 항상 동일 출력)
- 부수 효과가 없어야 함 (API 호출, 랜덤 값 생성 등 금지)
- 기존 상태를 변경하지 않고 새 상태를 반환해야 함 (불변성)

```jsx
(currentState, action) => newState;
```

#### 2) 액션(Action)

- 애플리케이션에서 스토어로 보내는 정보 패킷
- 상태 변경을 설명하는 객체로, type 속성을 필수로 가짐

```jsx
{
  type: 'counter/incremented', // 필수
  payload: 5 // 선택적 데이터
}
```

#### 3) 디스패치(Dispatch)

- 스토어의 메서드로, 액션을 스토어로 보내는 과정
- 액션이 디스패치되면 스토어는 리듀서를 호출하여 상태를 업데이트
- 애플리케이션에서 상태 변경을 트리거하는 유일한 방법

```jsx
store.dispatch({ type: 'counter/incremented' });
// 또는 액션 생성자 사용
store.dispatch(incrementCounter(5));
```

#### 4) 스토어(Store)

- 애플리케이션의 상태 트리를 보관하는 객체
- Redux 애플리케이션에는 단 하나의 스토어만 존재

주요 메서드:

- getState(): 현재 상태를 반환
- dispatch(action): 상태 변경을 위한 액션 디스패치
- subscribe(listener): 상태 변화를 감지할 리스너 등록

```jsx
import { createStore } from 'redux';

// 스토어 생성
const store = createStore(counterReducer);

// 구독 설정
const unsubscribe = store.subscribe(() => {
  console.log('상태 변경됨:', store.getState());
});

// 액션 디스패치
store.dispatch({ type: 'counter/incremented' });
// 출력: 상태 변경됨: { value: 1 }

// 구독 해제
unsubscribe();
```

### 2.2. Redux의 원칙

1. **단일 진실 소스(Single source of truth)**

   - 애플리케이션의 모든 상태는 하나의 스토어에 객체 트리 형태로 저장
   - 디버깅을 용이하게 하고, 서버 상태와 클라이언트 상태를 쉽게 직렬화 가능

2. **상태는 읽기 전용(State is read-only)**

   - 상태를 변경하는 유일한 방법은 액션을 발생시키는 것
   - 상태 변경이 명시적이고 추적 가능

3. **변경은 순수 함수로만(Changes are made with pure functions)**
   - 리듀서는 이전 상태와 액션을 받아 새로운 상태를 반환하는 순수 함수
   - 예측 가능한 상태 변경을 보장

### 2.3. Redux의 작동과정

1. 사용자 인터랙션 또는 시스템 이벤트가 액션을 발생
2. 액션은 디스패치되어 스토어로 전달
3. 스토어는 액션을 리듀서에 전달
4. 리듀서는 이전 상태와 액션을 기반으로 새로운 상태를 반환
5. 스토어는 새로운 상태를 저장하고, 구독 중인 모든 컴포넌트에 변경을 알림
6. 컴포넌트는 새로운 상태를 반영하여 UI를 업데이트
