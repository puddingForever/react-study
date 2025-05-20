import { API_URL } from './CommonApi';

const GetMeals = async () => {
    return await fetch(`${API_URL}/meals`, {
        method: 'GET',
    });
};

const OrderMeals = async (items, customer) => {
    return await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            order: {
                customer: customer,
                items: items,
            },
        }),
    });
};
export { GetMeals, OrderMeals };
