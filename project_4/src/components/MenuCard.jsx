import { BASE_URL } from "../api/base";
export default function MenuCard({ menuData }) {
  const { id, description, image, name, price } = menuData;

  return (
    <div className="meal-item">
      <article>
        <img src={`${BASE_URL}/${image}`} alt={name} />
        <h3>{name}</h3>
        <span className="meal-item-price">{price}</span>
        <p className="meal-item-description">{description}</p>
      </article>
    </div>
  );
}
