import { memo } from "react";
import { useFetch } from "../hooks/useFetch";
import { fetchAllMeals } from "../../../http";
import { useCartContext } from "../store/cart-provider";

// 바탕화면의 메뉴들 
const Meals = memo(() => {
    // context
    const {dispatch:cartDispatch} = useCartContext();
    // fetching api
    const { isFetching, fetchedData, error } = useFetch(fetchAllMeals,[]);
    // 장바구니 추가 
    const addCartHandler = (meal) => {
        cartDispatch({type : "ADD_MEAL", payload : meal }) 
     }
    return <div id="meals">
        {isFetching && <div> Fetching Data.. </div>}
        { fetchedData && fetchedData.map((meal) => (
                <div className="meal-item" key={meal.id}> 
                    <article>
                        {/* 음식 정보 */}
                        <img src={`http://localhost:3000/${meal.image}`} />
                        <h1>{meal.name}</h1>
                        <div className="meal-item-price">{meal.price}</div>
                        <div className="meal-item-description">{meal.description}</div>
                        {/* 카트담기 */}
                        <div className="meal-item-actions"> 
                           <button onClick={() => addCartHandler(meal)}>Add to Cart</button>
                        </div>
                    </article>
                </div>
        ))
        }
        {error && <div>Error occured fetching data</div>}
    </div>
})

export default Meals;