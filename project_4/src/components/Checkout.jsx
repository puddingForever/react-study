import Input from "./common/Input";

export default function Checkout() {
  //name,email,street,postal-code,city
  return (
    <div>
      <h2>Your Cart</h2>
      <Input label="Full Name" />
      <Input label="E-Mail Address" />
      <Input label="Street" />
      <div className="control-row ">
        <Input label="Post Code" />
        <Input label="City" />
      </div>
    </div>
  );
}
