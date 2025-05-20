import { useFoodContext } from '../providers/FoodProviders';
import { useModalContext } from '../providers/ModalProviders';

const CheckOutModal = () => {
    const { cart, increaseItemCount, decreaseItemCount, orderMeals } = useFoodContext();
    const { isOpen, modalId, closeModal, openModal } = useModalContext();
    const totalPrice = cart.reduce((total, item) => total + item.price * item.count, 0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const customer = {
            name: e.target[0].value,
            email: e.target[1].value,
            street: e.target[2].value,
            postalCode: e.target[3].value,
            city: e.target[4].value,
        };
        try {
            // const response = await orderMeals(customer);
            // if (response) {
            openModal('SUCCESS');
            // }
        } catch (error) {
            openModal('SUCCESS');
            console.error('Error:', error);
        }
    };
    return (
        <>
            {isOpen && modalId === 'CHECK_OUT' && (
                <div className="modal-layout">
                    <div className="modal">
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <div className="cart">
                                <h2>CheckOut</h2>
                                <div>
                                    <p>{`Total Amount : $${totalPrice}`}</p>
                                </div>
                                <div className="control ">
                                    <label>Full Name</label>
                                    <input type="text" placeholder="Enter your full name" />
                                </div>
                                <div className="control ">
                                    <label>E-mail Address</label>
                                    <input type="email" placeholder="Enter your email address" />
                                </div>
                                <div className="control ">
                                    <label>Street</label>
                                    <input type="text" placeholder="Enter your street address" />
                                </div>
                                <div className="control-row">
                                    <div className="control ">
                                        <label>Postal Code</label>
                                        <input type="text" placeholder="Enter your postal code" />
                                    </div>
                                    <div className="control ">
                                        <label>City</label>
                                        <input type="text" placeholder="Enter your city" />
                                    </div>
                                </div>
                                <div className="cart-total ">
                                    <button className="close-button cart-item-actions" onClick={() => closeModal()}>
                                        Close
                                    </button>
                                    <button className="button cart-item-actions" type="submit">
                                        Submit Order
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export { CheckOutModal };
