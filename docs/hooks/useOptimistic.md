# useOptimistic

> 출처: [Adding Optimistic UI with useOptimistic](https://medium.com/@bytePudding/adding-optimistic-ui-with-useoptimistic-0f170f685547)

## useOptimistic이란?

useOptimistic은 React 19에서 도입된 새로운 훅으로, 비동기 작업이 완료되기 전에 UI를 낙관적으로(optimistically) 업데이트할 수 있게 해주는 훅입니다. 이는 사용자 경험을 향상시키는 중요한 기능입니다.

## 기본 사용법

```jsx
const [optimisticState, addOptimisticUpdate] = useOptimistic(state, updateFn);
```

### 매개변수

- **state**: 초기 상태 값
- **updateFn**: (state, value) => newState 형태의 업데이트 함수

### 반환값

- **optimisticState**: 현재 상태 (낙관적 업데이트 포함)
- **addOptimisticUpdate**: 낙관적 업데이트를 트리거하는 함수

## 사용 예시

### 투표 시스템

- React의 useOptimistic 훅을 활용하여, 사용자가 투표 버튼을 클릭했을 때 즉시 UI에 반영되고, 서버 요청은 백그라운드에서 처리되는 구조입니다. 사용자 경험(UX)을 개선할 수 있습니다.

```jsx
import { useOptimistic } from 'react';

function OpinionList({ opinions }) {
  const [optimisticVotes, addOptimisticVote] = useOptimistic(
    opinions,
    (state, opinionId) => {
      return state.map((opinion) =>
        opinion.id === opinionId
          ? { ...opinion, votes: opinion.votes + 1 }
          : opinion
      );
    }
  );

  async function handleVote(opinionId) {
    addOptimisticVote(opinionId); // 서버에 요청을 보내기 전에 사용자에게 즉시 투표 반영된 것처럼 보여줌 (Optimistic UI 처리)
    await upvoteOpinion(opinionId); // 실제 서버에 투표 요청을 보내고 응답을 기다림
  }

  return (
    <ul>
      {optimisticVotes.map((opinion) => (
        <li key={opinion.id}>
          {opinion.text} - Votes: {opinion.votes}
          <button onClick={() => handleVote(opinion.id)}>Upvote</button>
        </li>
      ))}
    </ul>
  );
}
```

## 동작 방식

1. addOptimisticVote(opinionId) 호출 시, UI가 즉시 반영됩니다.
2. upvoteOpinion(opinionId)는 실제 서버 요청을 보내는 함수입니다. (비동기적으로 서버에 처리 요청을 보냅니다.)
3. 서버 응답이 정상적으로 오면, React는 내부적으로 상태를 실제 서버 상태로 대체합니다.
4. 만약 오류가 발생하면, 이전 상태로 자동 롤백되어 UI가 원래대로 복원됩니다. ( 이 동작은 useOptimistic 훅의 기본 동작이며, 별도 오류 처리를 통해 사용자에게 메시지를 보여줄 수도 있습니다.)

## useOptimistic vs 일반 상태 관리

| 비교 항목   | useOptimistic  | 일반 상태 관리        |
| ----------- | -------------- | --------------------- |
| UI 업데이트 | 즉시           | 서버 응답 후          |
| 사용자 경험 | 더 나은 반응성 | 지연된 반응성         |
| 구현 복잡성 | 낮음           | 높음 (수동 구현 필요) |
| 에러 처리   | 자동 롤백      | 수동 처리 필요        |
