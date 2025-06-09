# React Core

> Source: [React Fundamentals](https://medium.com/@bytePudding/reactplanet-edcf8e8e615d)

**1. Component**

- 재사용 가능한 UI 구성 단위로, HTML·JS·CSS를 한 파일에 묶어 관리할 수 있음. → 코드 재사용, 유지보수, 구조화에 유리.

**2. JSX**

- 브라우저는 JSX를 이해 못하므로 빌드 과정(예: Babel)에서 JS로 변환됨.

```js
const element = <h1>Hello</h1>;
```

위의 JSX는 바로 실행되지 않고, Babel 같은 도구가 아래와 같이 변환해줌

```js
const element = React.createElement('h1', null, 'hello');

console.log(element);

/* React Element 
{
  type: 'h1',
  props: { children: 'Hello' },
  ...
}
*/
```

컴포넌트를 확인하면 위와 같은 자바스크립트 객체가 나오며 이를 **React Element**라고 부름. <br/>React는 이 엘리먼트를 **Virtual DOM**(가상 DOM)에 저장.<br/>
컴포넌트의 **state**나 **props**가 변경되면, React는:

1. 새로운 Virtual DOM 트리를 생성하고
2. 이전 Virtual DOM과 비교(diffing) 작업을 수행한 뒤
3. 실제 DOM에서는 변경된 부분만 업데이트(Reconciliation)함

**3. Props**

- 부모 컴포넌트가 자식 컴포넌트에 데이터를 전달하는 읽기 전용(read-only) 속성.
- 다양한 타입(문자열, 숫자, 객체, 함수 등) 전달 가능.
