import { useState, useEffect } from 'react';
import useHttp from '../../hooks/useHttp';
import MealItem from './MealItem';

// 서버에서 음식 메뉴 데이터 로드 및 표시

const MealList = () => {
  const [meals, setMeals] = useState([]);
  const { isLoading, error, sendRequest } = useHttp();

  useEffect(() => {
    const transformMeals = (mealsData) => {
      setMeals(mealsData);
    };

    sendRequest(
      { url: 'http://localhost:3000/meals' },
      transformMeals
    );
  }, [sendRequest]);

  if (isLoading) {
    return <p className="meals-loading">Loading meals...</p>;
  }

  if (error) {
    return <p className="meals-error">{error}</p>;
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
      image={meal.image}
    />
  ));

  return (
    <section>
      <ul id="meals">{mealsList}</ul>
    </section>
  );
};

export default MealList;