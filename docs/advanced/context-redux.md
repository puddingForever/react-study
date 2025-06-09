# Context API vs Redux

> 출처: [Redux and Context API](https://medium.com/@bytePudding/redux-and-context-api-7d7d4e216d20)

### React와 jQuery의 UI 업데이트 방식 차이

React는 UI를 업데이트하는 방식에서 전통적인 JavaScript 라이브러리(예: jQuery)와 크게 다릅니다. 가장 큰 차이점은 jQuery에서는 DOM 요소를 직접 선택하고 조작하는 반면, React에서는 상태(state)를 업데이트하면 UI가 자동으로 그 변경 사항을 반영한다는 점입니다. <br/>
이러한 선언형 방식은 코드의 예측 가능성을 높이고, 복잡한 UI를 더 깔끔하게 관리할 수 있게 해줍니다. 하지만 이로 인해 **상태를 어떻게 효과적으로 관리할 것인가**라는 새로운 고민이 생기게 됩니다.

### useState와 useReducer의 차이

useState와 useReducer는 모두 특정 React 컴포넌트 내에서 상태를 저장하고 업데이트하는 방법입니다.

useState는 값을 직접 저장하거나 콜백을 사용해 값을 업데이트하는 setter 기반 접근 방식입니다. 반면, useReducer는 액션을 디스패치하고, 별도로 정의된 리듀서 함수가 새로운 상태를 계산하는 이벤트 기반 접근 방식입니다.

이렇게 관리되는 상태는 해당 컴포넌트 인스턴스에 국한된 지역 상태(local state)입니다.

### 상태 전달: props와 Context

컴포넌트의 지역 상태를 자식 컴포넌트에 전달하고자 할 경우, 두 가지 방법이 있습니다. props를 통해 직접 전달하거나, 간접적으로 Context를 통해 전달하는 것입니다. 본질적으로는 상위 컴포넌트의 상태가 트리 구조상 어떤 자식 컴포넌트로든 전달될 수 있다는 것이고, 차이는 전달 방식에 있습니다.

### useReducer + Context 조합의 한계

이론적으로는 useReducer와 Context를 조합하여 모든 상태를 루트 컴포넌트에서 관리할 수도 있습니다. 그러나 이 방식에는 단점도 존재합니다.

첫째, 여러 개의 Provider를 사용하게 되면 상태 관리가 복잡해집니다. 둘째, Context 값을 사용하는 컴포넌트는 Context의 일부 값만 변경되어도 전체가 다시 렌더링됩니다. 그리고 이 렌더링은 React.memo()로 방지할 수 없습니다. 그 이유는 useContext()가 단순히 props가 아니라 외부 값에 구독(subscribe)하기 때문입니다.

결과적으로, 개발자들은 종종 Context를 여러 Provider로 나누게 되며, 이로 인해 코드가 더 복잡해지기도 합니다.

### Context vs Redux

처음 보면 Context와 useReducer 조합은 Redux와 비슷해 보일 수 있습니다. 실제로 일부 기능은 겹치지만, 이 둘은 근본적으로 다른 문제를 해결하고 있습니다.

우선, **Context는 상태 관리 도구가 아닙니다.** Context는 단순히 의존성 주입(dependency injection)을 위한 도구입니다. 트리 구조에서 깊은 위치에 있는 컴포넌트가 어떤 값에 접근할 수 있도록 해주는 역할을 하며, 그 **값이 무엇이고 어떻게 생성되는지는 전적으로 개발자에게 달려 있습니다.** 일반적으로 useState나 useReducer로 생성된 값을 Context를 통해 전달합니다.

즉, 상태 관리는 여전히 개발자의 몫이고, Context는 단지 전달 수단일 뿐입니다.

반면, **Redux는 상태 관리를 전담하는 라이브러리**입니다. Redux는 상태 관리 로직을 앱의 나머지 부분과 분리해주며, 가장 큰 장점은 상태가 언제, 어디서, 왜, 어떻게 변경되었는지를 추적하기 쉬워진다는 점입니다.
