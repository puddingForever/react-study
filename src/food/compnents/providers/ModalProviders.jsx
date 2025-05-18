import React, { createContext, useState, useContext } from 'react';
import { YourCartModal } from '../modals/YourCartModal';
import { CheckOutModal } from '../modals/CheckoutModal';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [modalId, setModalId] = useState(null);

    const openModal = (id, props = {}) => {
        setModalId(id);
        setIsOpen(true);
    };
    const closeModal = () => {
        setIsOpen(false);
        setModalId(null);
    };

    // Context value to be provided
    const value = {
        isOpen,
        modalId,
        modalContent,
        openModal,
        closeModal,
    };

    return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
};

// Custom hook for using the modal context
export const useModalContext = () => {
    const context = useContext(ModalContext);
    if (context === undefined) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};

export default ModalProvider;
