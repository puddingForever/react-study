import { useSelector } from "react-redux";
import Input from "./common/Input";

/**
 * 사용자 데이터를 입력하는 컴포넌트
 *
 */

export default function Checkout() {
  const totalAmount = useSelector((state) => state.cart.totalPrice);

  return (
    <>
      <h2>Checkout</h2>
      <p>Total Amount: $ {totalAmount.toFixed(2)}</p>
      <Input label="Full Name" name="name" />
      <Input label="E-Mail Address" name="email" />
      <Input label="Street" name="street" />
      <div className="control-row ">
        <Input label="Post Code" name="postal-code" />
        <Input label="City" name="city" />
      </div>
    </>
  );
}
