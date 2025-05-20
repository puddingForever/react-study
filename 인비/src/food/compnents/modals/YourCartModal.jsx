import { useFoodContext } from '../providers/FoodProviders';
import { useModalContext } from '../providers/ModalProviders';

const YourCartModal = () => {
    const { cart, increaseItemCount, decreaseItemCount } = useFoodContext();
    const { isOpen, modalId, closeModal, openModal } = useModalContext();
    const totalPrice = cart.reduce((total, item) => total + item.price * item.count, 0);

    return (
        <>
            {isOpen && modalId === 'YOUR_CART' && (
                <div className="modal-layout">
                    <div className="modal">
                        <div className="cart">
                            <h2>Your Cart</h2>
                            {cart && cart.length > 0 ? (
                                <div>
                                    {cart.map((item) => (
                                        <div key={item.id} className="cart-item">
                                            <div className="cart-item">
                                                <p>{`${item.name} - `}</p>
                                                <p className="cart-item-price">{`${item.count} x $${item.price}`}</p>
                                            </div>
                                            <div className="cart-item-actions">
                                                <button
                                                    style={{ padding: '0px' }}
                                                    className="button"
                                                    onClick={() => decreaseItemCount(item.id)}
                                                >
                                                    -
                                                </button>
                                                <h2>{item.count}</h2>
                                                <button
                                                    className="button"
                                                    onClick={() => increaseItemCount(item.id)}
                                                    style={{ padding: '0px' }}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p>Your cart is empty</p>
                            )}
                            <div className="cart-total ">
                                <h2>{`$${totalPrice}`}</h2>
                            </div>
                            <div className="cart-total ">
                                <button className="close-button cart-item-actions" onClick={() => closeModal()}>
                                    Close
                                </button>
                                <button className="button cart-item-actions" onClick={() => openModal('CHECK_OUT')}>
                                    Go to Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export { YourCartModal };
