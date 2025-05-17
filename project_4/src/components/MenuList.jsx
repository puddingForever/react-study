import { useEffect, useState } from "react";
import MenuCard from "./MenuCard";
import { getMealsData } from "../api/meals";

/**
 * 메뉴 리스트를 렌더링하는 컴포넌트
 * @param {Function} getMealsData - 주문 가능한 메뉴리스트 불러오기
 */

export default function MenuList() {
  //메뉴별 데이터 목록
  const [meals, setMeals] = useState([]);
  const { mealsData } = getMealsData();

  //서버에서 메뉴별 데이터 불러오기
  useEffect(() => setMeals(mealsData), []);

  return (
    <>
      <div id="meals">
        {meals.map((meal) => {
          return <MenuCard key={meal.id} menuData={meal} />;
        })}
      </div>
    </>
  );
}
