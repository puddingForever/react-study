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

  //서버에서 메뉴별 데이터 불러오기
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const data = await getMealsData();
        setMeals(data);
      } catch (error) {
        throw new Error("메뉴를 불러오지 못했습니다.");
      }
    };
    fetchMeals();
  }, []);

  return (
    <>
      <div id="meals">
        {meals?.map((meal) => (
          <MenuCard key={meal.id} menuData={meal} />
        ))}
      </div>
    </>
  );
}
