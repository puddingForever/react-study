import { Header } from './compnents/header/Header';
import { Meals } from './compnents/meals/Meals';
import { YourCartModal } from './compnents/modals/YourCartModal';
import FoodProvider from './compnents/providers/FoodProviders';
import ModalProvider from './compnents/providers/ModalProviders';
import { CheckOutModal } from './compnents/modals/CheckoutModal';
import { SuccessModal } from './compnents/modals/SuccessModal';
const FoodPage = () => {
    return (
        <div>
            <ModalProvider>
                <FoodProvider>
                    <Header />
                    <Meals />
                    <YourCartModal />
                    <CheckOutModal />
                    <SuccessModal />
                </FoodProvider>
            </ModalProvider>
        </div>
    );
};

export { FoodPage };
