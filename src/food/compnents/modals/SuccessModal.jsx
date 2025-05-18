import { useModalContext } from '../providers/ModalProviders';

const SuccessModal = () => {
    const { isOpen, modalId, closeModal, openModal } = useModalContext();

    return (
        <>
            {isOpen && modalId === 'SUCCESS' && (
                <div className="modal-layout">
                    <div className="modal">
                        <div className="cart">
                            <h2>Success!</h2>
                            <div>
                                <p>{`Your order was submitted successfully`}</p>
                                <p>{`We will get back to you with more details via email within the next few minutes`}</p>
                            </div>

                            <div className="cart-total ">
                                <button className="button cart-item-actions" onClick={() => closeModal()}>
                                    Okay
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export { SuccessModal };
