import { BASE_URL } from "../api/base";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/cart-slice";
/**
 * 메뉴 카드 UI 컴포넌트
 * @param {Object} menuData - 메뉴 데이터
 * @param {Function} handleAddtoCart - 장바구니 담기
 */

export default function MenuCard({ menuData }) {
  const { id, description, image, name, price } = menuData;
  const dispatch = useDispatch();

  const handleAddtoCart = () => {
    dispatch(cartActions.addItemToCart(menuData));
  };
  return (
    <div className="meal-item">
      <img src={`${BASE_URL}/${image}`} alt={name} />
      <h3>{name}</h3>
      <span className="meal-item-price">$ {price}</span>
      <p className="meal-item-description">{description}</p>
      <button className="meal-item-actions button" onClick={handleAddtoCart}>
        add To Cart
      </button>
    </div>
  );
}
