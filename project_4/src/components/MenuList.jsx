import { useEffect, useState } from "react";
import MenuCard from "./MenuCard";
import { BASE_URL } from "../api/base";

/**
 * 메뉴 리스트를 렌더링하는 컴포넌트
 *
 */

export default function MenuList() {
  //메뉴별 데이터 목록
  const [meals, setMeals] = useState([]);

  //서버에서 메뉴별 데이터 불러오기
  useEffect(() => {
    const getMealsData = async () => {
      const res = await fetch(`${BASE_URL}/meals`);
      if (!res.ok) {
        throw new Error("데이터를 불러오지 못했음");
      }
      const mealsData = await res.json();
      setMeals(mealsData);
    };
    getMealsData();
  }, []);

  return (
    <div id="meals">
      {meals.map((meal) => {
        return <MenuCard key={meal.id} menuData={meal} />;
      })}
    </div>
  );
}
