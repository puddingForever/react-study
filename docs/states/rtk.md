# Redux Toolkit (RTK)

> 출처: [Mumu kim - Redux](https://mumu-kim.tistory.com/m/entry/Redux)

## Redux Toolkit(RTK)

Redux Toolkit(RTK)은 Redux의 공식 툴킷으로, Redux의 복잡한 설정과 반복되는 코드를 크게 줄여주고, 불변성 관리와 타입 지원을 강화한 라이브러리입니다.

### RTK의 주요 특징

- **보일러플레이트 코드 감소**: 액션, 리듀서, 스토어 설정을 간단하게 처리
- **불변성 자동 관리**: Immer 내장으로 불변성 유지가 쉬움
- **TypeScript 지원**: 타입 지원이 강화됨
- **비동기 로직 간소화**: createAsyncThunk로 비동기 작업 처리 간편
- **Redux DevTools 등 개발 도구 기본 지원**

### RTK 기본 사용법

1. Slice 생성

```jsx
// counterSlice.js 카운터 관련 slice 정의
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
```

2. Store 설정 후 전달

```jsx
// store.js Redux store를 설정하는 중앙 파일
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';

const store = configureStore({
  reducer: { counter: counterReducer },
});

export default store;

// main.jsx  (App.jsx 또는 main.jsx에 store 전달)
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './app/store'; // store 파일 import

ReactDOM.createRoot(document.getElementById('root')).render(
  <React>
    <Provider store={store}>
      <App />
    </Provider>
  </React>
);
```

3. RTK와 createAsyncThunk를 활용한 유저 데이터 관리

```js
// userThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit'; // 비동기

export const fetchUser = createAsyncThunk('user/fetch', async (userId) => {
  const res = await fetch(`/api/user/${userId}`);
  return res.json();
});
```

이 thunk를 디스패치하면 다음과 같은 액션들이 자동 발생합니다:

- **pending** – API 호출 시작할 때
- **fulfilled** – API 호출이 성공해서 응답을 받았을 때
- **rejected** – API 호출 중 에러가 발생했을 때

```js
// userSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchUser } from './userThunks'; // 비동기 thunk 액션 import

const userSlice = createSlice({
  name: 'user',
  initialState: { data: null, loading: false, error: null },
  reducers: {},
  // 비동기 액션에 대한 리듀서 정의
  extraReducers: (builder) => {
    builder
      // fetchUser가 시작됐을 때 실행
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      // fetchUser가 성공적으로 완료됐을 때 실행
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      // fetchUser가 실패했을 때 실행
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
```

컴포넌트에서는 다음과 같이 사용합니다.

```jsx
// UserInfo.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from './store/userThunks';

export default function UserInfo({ userId }) {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.user);

  // 컴포넌트 마운트 시 유저 정보 fetch
  useEffect(() => {
    dispatch(fetchUser(userId));
  }, [dispatch, userId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>User Info</h2>
      {data && (
        <div>
          <p>Name: {data.name}</p>
          <p>Email: {data.email}</p>
        </div>
      )}
    </div>
  );
}
```
