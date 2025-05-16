import { useContext } from 'react';
import Card from '../UI/Card';
import Button from '../UI/Button';
import CartContext from '../../store/CartContext';

// 개별 음식 항목 카드 구현

const MealItem = (props) => {
  const cartCtx = useContext(CartContext);
  const price = `${props.price}`;

  const imageUrl = `http://localhost:3000/${props.image}`;

  const addToCartHandler = () => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: 1,
      price: props.price
    });
  };

  return (
    <li className="meal-item">
      <Card>
        <article>
          <img src={imageUrl} alt={props.name} />
          <h3>{props.name}</h3>
          <div className="meal-item-price">${price}</div>
          <div className="meal-item-description">{props.description}</div>
          <div className="meal-item-actions">
            <Button onClick={addToCartHandler}>Add to Cart</Button>
          </div>
        </article>
      </Card>
    </li>
  );
};

export default MealItem;