# React Router와 React Query 통합하기

> 출처: [ React Router와 React Query 통합하기](https://medium.com/@bytePudding/react-router%EC%99%80-react-query-%ED%86%B5%ED%95%A9%ED%95%98%EA%B8%B0-f0a263a688b3)

## 1. 기본 설정

React Query와 React Router를 함께 사용할 때는 두 Provider를 함께 감싸주어야 합니다.

```jsx
/import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
```

- **QueryClientProvider**: React Query의 컨텍스트를 제공합니다.
- **queryClient**: 애플리케이션 전체에서 공유되는 Query Client 인스턴스입니다.
- **RouterProvider**: React Router의 라우팅 기능을 제공합니다.
- 두 Provider를 함께 사용하면 데이터 관리(React Query)와 라우팅(React Router)을 통합할 수 있습니다

## 2. 데이터 로딩 패턴

React Router의 loader와 React Query의 fetchQuery를 결합해 데이터를 미리 로드하고 캐시에 저장할 수 있습니다.

```jsx
export function loader({ params }) {
  return queryClient.fetchQuery({
    queryKey: ['events', params.id],
    queryFn: ({ signal }) => fetchEvent({ signal, id: params.id }),
  });
}
```

- loader: 페이지가 렌더링되기 전에 실행되는 React Router의 함수입니다.
- queryClient.fetchQuery: React Query를 통해 데이터를 가져오고, 캐시에 저장하는 메서드입니다. 이렇게 결합하면 페이지 전환 시 데이터를 미리 로드해 빠르게 보여줄 수 있습니다.

### 문제점

동일한 데이터를 loader와 useQuery가 동시에 요청할 수 있습니다.

```jsx
// 1. 컴포넌트가 로드되기 전 React Router의 loader
loader({ params }) => queryClient.fetchQuery({...});

// 2. 컴포넌트 안
useQuery({ queryKey: ['events', params.id], queryFn: ... });
```

- **loader**: 페이지 진입 전에 데이터를 fetch합니다.
- **useQuery**: 컴포넌트가 mount되면 데이터를 fetch합니다.

→ 이 둘이 같은 데이터를 동시에 요청할 가능성이 있습니다.

### 해결책: staleTime 설정

컴포넌트 내부의 useQuery에 staleTime을 설정해 중복 요청을 방지할 수 있습니다.

```jsx
const { data } = useQuery({
  queryKey: ['events', params.id],
  queryFn: ({ signal }) => fetchEvent({ signal, id: params.id }),
  staleTime: 1000, // 1초 동안은 fresh 상태로 간주
});
```

- React Query의 기본 staleTime은 0입니다. 즉, 항상 데이터를 낡았다고(stale) 가정하고, 컴포넌트가 마운트될 때마다 네트워크 요청을 보냅니다.

- staleTime을 설정하면, React Query는 해당 데이터가 fresh하다고 판단해 loader에서 받아온 캐시된 데이터를 즉시 사용하고, 네트워크 요청을 다시 보내지 않습니다

> **참고**: stale 상태가 되었다고 해서 곧바로 재요청이 발생하는 것은 아닙니다. 보통 컴포넌트가 다시 마운트되거나 queryKey가 변경되는 등, 특정 상황에서만 재요청이 발생합니다.
