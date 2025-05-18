export const fetchAllMeals = async () => {
  const response = await fetch("http://localhost:3000/meals");
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Failed to fetch all meals");
  }

  return data;
};

export const submitOrder = async (order) => {
  const response = await fetch("http://localhost:3000/orders", {
    method: "POST",
    body: JSON.stringify({ order }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to update orders");
  }

  return resData.message;
};
