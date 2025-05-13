import { useSelector } from "react-redux";
import Input from "./common/Input";

export default function Checkout() {
  //name,email,street,postal-code,city
  const totalAmount = useSelector((state) => state.cart.totalPrice);

  return (
    <div>
      <h2>Your Cart</h2>
      <p>Total Amount: $ {totalAmount}</p>
      <Input label="Full Name" name="name" />
      <Input label="E-Mail Address" name="email" />
      <Input label="Street" name="street" />
      <div className="control-row ">
        <Input label="Post Code" name="postal-code" />
        <Input label="City" name="city" />
      </div>
    </div>
  );
}
