import { useEffect, useState } from "react";
import MenuCard from "./MenuCard";
/**
 * 메뉴 리스트를 렌더링하는 컴포넌트
 *
 */
export default function MenuList() {
  const [meals, setMeals] = useState([]);
  useEffect(() => {
    const getMealsData = async () => {
      const res = await fetch("http://localhost:3000/meals");
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
