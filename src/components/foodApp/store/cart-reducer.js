// 장바구니
export const initialState = {
  meals: [],
  totalPrice: 0,
};

export const CartReducer = (state, action) => {
  switch (action.type) {
    // 음식 추가
    case "ADD_MEAL": {
      const isExist = state.meals.some((meal) => meal.id === action.payload.id);
      if (isExist) {
        // 장바구니에 있으면 count,priceSum 증가
        const meals = state.meals.map((meal) => {
          return {
            ...meal,
            priceSum: meal.priceSum + Number(action.payload.price), // 한 메뉴의 총합
            count: meal.count + 1,
          };
        });

        // 총금액
        const totalPrice = meals.reduce((sum, meal) => sum + meal.priceSum, 0);

        return { meals, totalPrice };
      } else {
        // 새로운 메뉴는 items 배열을 증가
        const newMeal = {
          id: action.payload.id,
          name: action.payload.name,
          price: Number(action.payload.price),
          priceSum: Number(action.payload.price), // 한 메뉴의 총합
          count: 1,
        };
        const meals = [...state.meals, newMeal];
        // 총금액
        const totalPrice = meals.reduce((sum, meal) => sum + meal.priceSum, 0);

        return { meals, totalPrice };
      }
    }
    // 음식삭제
    case "REMOVE_MEAL": {
      // 계산 후 , 총 수량이 0 이하로 떨어지면 filter로 배열에서 삭제시킴
      const meals = state.meals
        .map((meal) => {
          if (meal.id === action.payload.id) {
            return {
              ...meal,
              count: meal.count - 1,
              priceSum: meal.priceSum - Number(action.payload.price),
            };
          }
          return meal;
        })
        .filter((meal) => meal.count > 0);

      let totalPrice = state.totalPrice - Number(action.payload.price);
      if (totalPrice < 0) {
        totalPrice = 0;
      }

      return { meals, totalPrice };
    }
  }
};
