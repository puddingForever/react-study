import { useContext, useState } from 'react';
import useHttp from '../../hooks/useHttp';
import Button from '../UI/Button';
import CartContext from '../../store/CartContext';
import Modal from '../UI/Modal';

// 사용자 정보 입력 및 주문 제출

const Checkout = (props) => {
  const cartCtx = useContext(CartContext);
  const { isLoading, error, sendRequest } = useHttp();
  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    email: true,
    street: true,
    postalCode: true,
    city: true
  });
  const [didSubmit, setDidSubmit] = useState(false);

  const submitOrderHandler = async (event) => {
    event.preventDefault();

    // Form validation
    const enteredName = event.target.name.value;
    const enteredEmail = event.target.email.value;
    const enteredStreet = event.target.street.value;
    const enteredPostalCode = event.target.postalCode.value;
    const enteredCity = event.target.city.value;

    const nameIsValid = enteredName.trim() !== '';
    const emailIsValid = enteredEmail.includes('@');
    const streetIsValid = enteredStreet.trim() !== '';
    const postalCodeIsValid = enteredPostalCode.trim() !== '';
    const cityIsValid = enteredCity.trim() !== '';

    setFormInputValidity({
      name: nameIsValid,
      email: emailIsValid,
      street: streetIsValid,
      postalCode: postalCodeIsValid,
      city: cityIsValid
    });

    const formIsValid =
      nameIsValid &&
      emailIsValid &&
      streetIsValid &&
      postalCodeIsValid &&
      cityIsValid;

    if (!formIsValid) {
      return;
    }

    // Submit order data
    const orderData = {
      order: {
        items: cartCtx.items,
        customer: {
          name: enteredName,
          email: enteredEmail,
          street: enteredStreet,
          'postal-code': enteredPostalCode,
          city: enteredCity
        }
      }
    };

    const submitOrder = () => {
      setDidSubmit(true);
      cartCtx.clearCart();
    };

    sendRequest(
      {
        url: 'http://localhost:3000/orders',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: orderData
      },
      submitOrder
    );
  };

  const nameControlClasses = `control ${formInputValidity.name ? '' : 'invalid'
    }`;
  const emailControlClasses = `control ${formInputValidity.email ? '' : 'invalid'
    }`;
  const streetControlClasses = `control ${formInputValidity.street ? '' : 'invalid'
    }`;
  const postalCodeControlClasses = `control ${formInputValidity.postalCode ? '' : 'invalid'
    }`;
  const cityControlClasses = `control ${formInputValidity.city ? '' : 'invalid'
    }`;

  const checkoutContent = (
    <form onSubmit={submitOrderHandler}>
      <h2>Checkout</h2>
      <div className={nameControlClasses}>
        <label htmlFor="name">Full Name</label>
        <input type="text" id="name" />
        {!formInputValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={emailControlClasses}>
        <label htmlFor="email">E-Mail Address</label>
        <input type="text" id="email" />
        {!formInputValidity.email && <p>Please enter a valid email!</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" />
        {!formInputValidity.street && <p>Please enter a valid street!</p>}
      </div>
      <div className="control-row">
        <div className={postalCodeControlClasses}>
          <label htmlFor="postalCode">Postal Code</label>
          <input type="text" id="postalCode" />
          {!formInputValidity.postalCode && <p>Please enter a valid postal code!</p>}
        </div>
        <div className={cityControlClasses}>
          <label htmlFor="city">City</label>
          <input type="text" id="city" />
          {!formInputValidity.city && <p>Please enter a valid city!</p>}
        </div>
      </div>
      <div className="modal-actions">
        <Button text onClick={props.onCancel}>
          Close
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Submit Order'}
        </Button>
      </div>
    </form>
  );

  const isSubmittingContent = <p>Sending order data...</p>;

  const didSubmitContent = (
    <>
      <h2>Success!</h2>
      <p>Successfully sent the order!</p>
      <div className="modal-actions">
        <Button onClick={props.onCancel}>Close</Button>
      </div>
    </>
  );

  const errorContent = (
    <>
      <h2>Error!</h2>
      <p>{error}</p>
      <div className="modal-actions">
        <Button onClick={props.onCancel}>Close</Button>
      </div>
    </>
  );

  const modalContent = (
    <>
      {!isLoading && !didSubmit && !error && checkoutContent}
      {isLoading && isSubmittingContent}
      {!isLoading && didSubmit && !error && didSubmitContent}
      {!isLoading && error && errorContent}
    </>
  );

  return (
    <Modal onClose={props.onCancel}>
      {modalContent}
    </Modal>
  );
};

export default Checkout;