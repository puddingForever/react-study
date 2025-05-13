export default function MenuCard({ menuData }) {
  const { id, description, image, name, price } = menuData;

  return (
    <div className="meal-item">
      <article>
        <img src={`http://localhost:3000/${image}`} alt={name} />
        <h3>{name}</h3>
        <span className="meal-item-price">{price}</span>
        <p className="meal-item-description">{description}</p>
      </article>
    </div>
  );
}
