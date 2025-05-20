import { BASE_URL } from "./base";

export const getMealsData = async () => {
  const res = await fetch(`${BASE_URL}/meals`);
  if (!res.ok) {
    throw new Error("데이터를 불러오지 못했음");
  }
  return await res.json();
};
