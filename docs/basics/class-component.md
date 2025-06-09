# React 클래스 컴포넌트

> Source: [Section 14: 클래스 컴포넌트 ](https://purple-reward-505.notion.site/React-1-a230a5fa52b04962adc1f80082341a94#1d9727fe695f8058b6bfeb1614fe1328)

React에서 **클래스 컴포넌트(Class Component)** 는 React 16.8 이전의 주요 컴포넌트 작성 방식이었습니다. 현재는 함수형 컴포넌트와 Hook을 사용하는 것을 권장하지만, 레거시 코드나 특수한 상황에서 여전히 사용됩니다.

## 1. 클래스 컴포넌트 기본 구조

- React 16.8 이전에는 상태 관리와 사이드 이펙트 처리를 위해 클래스 컴포넌트를 사용해야 했음
- 함수형 컴포넌트에는 Hook 개념이 없어 상태를 다룰 수 없었음
- 클래스 컴포넌트에는 Hook이 없음
- 함수형 컴포넌트와 함께 사용해도 문제 없음(동일한 React 컴포넌트이기 때문)

```jsx
import { Component } from 'react';

class User extends Component {
  render() {
    return <li>{this.props.name}</li>;
  }
}
```

## 2. State와 Event 처리

클래스 컴포넌트에서 상태 관리는 `this.state`와 `this.setState()`를 통해 이루어집니다.

```jsx
import { Component } from 'react';

class User extends Component {
  constructor() {
    super();
    this.state = {
      isShow: true,
      status: 'active',
    };
  }

  setShowHandler() {
    this.setState({ isShow: false });
  }

  render() {
    return (
      <li onClick={this.setShowHandler.bind(this)}>
        {this.state.isShow ? 'Visible' : 'Hidden'}
      </li>
    );
  }
}
```

> **Note**: `bind(this)`는 함수 내부의 `this`를 현재 컴포넌트 인스턴스로 고정시킵니다.

## 3. 생명주기 메서드 (Lifecycle Methods)

클래스 컴포넌트는 다양한 생명주기 메서드를 제공합니다. 각 메서드는 컴포넌트의 특정 시점에 실행됩니다.

| 메서드                 | 설명                                  | Hook 대응                                  |
| ---------------------- | ------------------------------------- | ------------------------------------------ |
| `componentDidMount`    | 컴포넌트가 처음 렌더링된 직후 실행    | `useEffect(() => {}, [])`                  |
| `componentDidUpdate`   | 컴포넌트가 갱신될 때마다 실행         | `useEffect(() => {}, [deps])`              |
| `componentWillUnmount` | 컴포넌트가 DOM에서 제거되기 직전 실행 | `useEffect(() => { return () => {} }, [])` |

```jsx
class ExampleComponent extends Component {
  componentDidMount() {
    console.log('Mounted');
  }
}
```

## 4. Context 사용법

클래스 컴포넌트에서 Context를 사용하는 방법입니다.

```jsx
import React from 'react';

const UsersContext = React.createContext({ users: [] });

class User extends Component {
  static contextType = UsersContext;

  componentDidMount() {
    console.log(this.context.users);
  }

  render() {
    return <li>{this.props.name}</li>;
  }
}
```

## 5. 오류 경계 (Error Boundary)

오류 경계는 React 컴포넌트 트리 내에서 발생하는 예기치 못한 오류를 잡아 UI가 전체적으로 멈추지 않도록 합니다.

> **Important**: 오류 경계는 클래스 컴포넌트에서만 지원됩니다.

```jsx
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    console.error('Error caught:', error);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <h2>문제가 발생했어요.</h2>;
    }
    return this.props.children;
  }
}

class User extends Component {
  render() {
    return (
      <ErrorBoundary>
        <li>{this.props.name}</li>
      </ErrorBoundary>
    );
  }
}
```

## 결론

- 클래스 컴포넌트는 상태, 이벤트, 생명주기 메서드를 관리할 수 있으며, Hook 도입 전 React의 핵심 방식이었습니다.
- 현재는 함수형 컴포넌트와 Hook 사용을 권장하지만, 레거시 코드나 특수한 상황에서는 클래스 컴포넌트 사용이 필요할 수 있습니다.
- 오류 경계(Error Boundary)는 클래스 컴포넌트만 지원한다는 점에 유의해야 합니다.
