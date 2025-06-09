# React Router

> 출처: [Mumu kim - React Router](https://mumu-kim.tistory.com/m/entry/%EB%A6%AC%EC%95%A1%ED%8A%B8-%EB%9D%BC%EC%9A%B0%ED%84%B0)

## 1. React Router 개요

- React Router는 SPA(싱글 페이지 애플리케이션)에서 다중 페이지처럼 보이는 탐색을 구현하는 표준 라이브러리.
- SPA는 새 HTML 요청 없이 현재 페이지 내에서 컴포넌트를 교체함.
- URL에 따라 적절한 컴포넌트를 렌더링해 여러 페이지 경험을 제공.

---

### 1.1 라우팅의 필요성

- SPA도 여러 페이지처럼 보이는 UI와 탐색 필요.
- URL 북마크, 공유 가능해야 함.
- 브라우저 뒤로가기/앞으로가기 버튼 정상 작동 필요.

---

### 1.2 라우터 설치 및 기본 설정 (React Router v6 기준)

```jsx
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ErrorPage from './pages/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
```

- App 컴포넌트는 레이아웃 역할
- App.js 내 Outlet 사용해 자식 라우트 렌더링 위치 지정

```jsx
import { Outlet } from 'react-router-dom';
import MainNavigation from './components/MainNavigation';

function App() {
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}
export default App;
```

## 2. 페이지 간 이동 방법

### 2.1 Link 컴포넌트

- 페이지 새로고침 없이 클라이언트 사이드 라우팅 제공.

```jsx
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <Link to="/">홈</Link>
      <Link to="/about">소개</Link>
      <Link to="/products">제품</Link>
    </nav>
  );
}
```

### 2.2 NavLink 컴포넌트

- 활성화된 링크에 스타일 적용 가능

```jsx
import { NavLink } from 'react-router-dom';

function MainNavigation() {
  return (
    <nav>
      <NavLink
        to="/"
        end
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        홈
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        소개
      </NavLink>
    </nav>
  );
}
```

### 3.2 동적 라우트와 URL 파라미터

```jsx
import { useParams } from 'react-router-dom';

function ProductDetailPage() {
  const { productId } = useParams();
  return <h1>제품 상세: {productId}</h1>;
}
```

### 3.3 오류 처리와 errorElement

```jsx
import { useRouteError } from 'react-router-dom';

function ErrorPage() {
  const error = useRouteError();

  let title = '오류 발생';
  let message = '알 수 없는 오류가 발생했습니다.';

  if (error.status === 404) {
    title = '페이지를 찾을 수 없습니다';
    message = '존재하지 않는 페이지입니다.';
  }

  return (
    <div>
      <h1>{title}</h1>
      <p>{message}</p>
    </div>
  );
}
```

### 3.4 인덱스 라우트

부모 경로에 정확히 일치할 때 렌더링되는 기본 자식 라우트

```
{ index: true, element: <HomePage /> }
```

## 4. 데이터 가져오기 (Fetching)

### 4.1 loader 함수

```jsx
{
  path: 'products',
  element: <ProductsPage />,
  loader: async () => {
    const res = await fetch('https://api.example.com/products');
    if (!res.ok) throw new Response('상품 로딩 실패', { status: 500 });
    return res.json();
  }
}

// ProductList.jsx
import { useLoaderData } from 'react-router-dom';

function ProductsPage() {
  const products = useLoaderData();
  return (
    <ul>
      {products.map(p => (
        <li key={p.id}>{p.title}</li>
      ))}
    </ul>
  );
}

```

### 4.3 상위 라우트 데이터 접근

```jsx
import { useRouteLoaderData } from 'react-router-dom';

function ProductDetailPage() {
  const products = useRouteLoaderData('products-loader');
  // ...
}
```

## 5. 데이터 제출 (Submission)

### 5.1 action 함수

```jsx
{
  path: 'new-product',
  element: <NewProductPage />,
  action: async ({ request }) => {
    const formData = await request.formData();
    const product = {
      title: formData.get('title'),
      price: formData.get('price'),
      description: formData.get('description'),
    };

    // 유효성 검사
    if (!product.title) return { error: '제품명 필요' };

    // API 요청
    const res = await fetch('https://api.example.com/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });

    if (!res.ok) throw new Response('등록 실패', { status: 500 });

    return redirect('/products');
  },
}
```

```jsx
import { Form, useActionData } from 'react-router-dom';

function NewProductPage() {
  const errors = useActionData();

  return (
    <Form method="post">
      <input name="title" required />
      {errors?.error && <p>{errors.error}</p>}
      <button type="submit">추가</button>
    </Form>
  );
}
```

### 5.2 프로그래밍 방식 데이터 제출

```jsx
import { useSubmit } from 'react-router-dom';

function ProductItem({ product }) {
  const submit = useSubmit();

  function handleDelete() {
    if (confirm('삭제할까요?')) {
      submit(
        { id: product.id },
        { method: 'delete', action: `/products/${product.id}/delete` }
      );
    }
  }

  return (
    <article>
      <h2>{product.title}</h2>
      <button onClick={handleDelete}>삭제</button>
    </article>
  );
}
```
