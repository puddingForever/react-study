import { BASE_URL } from "./base";

export const postOrderData = async (order) => {
  const res = await fetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ order }),
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }
  return await data;
};
