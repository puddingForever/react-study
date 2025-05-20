import { useFoodContext } from '../providers/FoodProviders';
import { API_URL } from '../api/CommonApi';

const Meals = () => {
    const { meals, addCart } = useFoodContext();
    const handleAddToCart = (meal) => {
        addCart(meal);
    };
    return (
        <div id="meals">
            {meals?.length > 0 ? (
                meals.map((meal) => (
                    <div key={meal.id} className="meal-item">
                        <img src={`${API_URL}/${meal.image}`} alt={meal.name} />
                        <h3>{meal.name}</h3>
                        <p className="meal-item-price">{meal.price}</p>
                        <p className="meal-item-description">{meal.description}</p>
                        <button className="button meal-item-actions" onClick={() => handleAddToCart(meal)}>
                            Add to Cart
                        </button>
                    </div>
                ))
            ) : (
                <p>No meals available</p>
            )}
        </div>
    );
};
export { Meals };
