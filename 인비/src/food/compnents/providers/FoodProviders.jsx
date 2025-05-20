import React, { createContext, useState, useContext, useEffect } from 'react';
import { GetMeals, OrderMeals } from '../api/MealsApi';

const FoodContext = createContext();

export const FoodProvider = ({ children }) => {
    const [meals, setMeals] = useState([]);
    const [cart, setCart] = useState([]);
    const getMeals = async () => {
        try {
            const response = await GetMeals();
            const data = await response.json();
            setMeals(data);
        } catch (error) {
            console.error('Error fetching meals:', error);
        }
    };

    const addCart = (food) => {
        setCart((prevCart) => {
            const existingItemIndex = prevCart.findIndex((item) => item.id === food.id);
            if (existingItemIndex !== -1) {
                const updatedCart = [...prevCart];
                updatedCart[existingItemIndex] = {
                    ...updatedCart[existingItemIndex],
                    count: (updatedCart[existingItemIndex].count || 1) + 1,
                };
                return updatedCart;
            } else {
                return [...prevCart, { ...food, count: 1 }];
            }
        });
    };

    const orderMeals = async (customer) => {
        const response = await OrderMeals(cart, customer);
        const data = await response.json();
        console.log('Response:', response);
        if (response.ok) {
            setCart([]);
            return true;
        } else {
            throw new Error(data.message || 'Failed to place order');
        }
    };
    const increaseItemCount = (itemId) => {
        setCart((prevCart) => {
            const updatedCart = prevCart.map((item) => {
                if (item.id === itemId) {
                    return { ...item, count: item.count + 1 };
                }
                return item;
            });
            return updatedCart;
        });
    };

    const decreaseItemCount = (itemId) => {
        setCart((prevCart) => {
            const updatedCart = prevCart.map((item) => {
                if (item.id === itemId && item.count > 1) {
                    return { ...item, count: item.count - 1 };
                }
                return item;
            });
            return updatedCart;
        });
    };

    useEffect(() => {
        getMeals();
    }, []);
    const value = {
        meals,
        cart,
        addCart,
        increaseItemCount,
        decreaseItemCount,
        orderMeals,
    };

    return <FoodContext.Provider value={value}>{children}</FoodContext.Provider>;
};

export const useFoodContext = () => {
    const context = useContext(FoodContext);
    if (context === undefined) {
        throw new Error('useFoodContext must be used within a FoodProvider');
    }
    return context;
};

export default FoodProvider;
