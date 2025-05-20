import logoImg from '../../../assets/logo.jpg';
import { useFoodContext } from '../providers/FoodProviders';
import { useModalContext } from '../providers/ModalProviders';
const Header = () => {
    const { cart } = useFoodContext();
    const { openModal } = useModalContext();

    const handleCartClick = () => {
        openModal('YOUR_CART');
    };
    return (
        <header id="main-header">
            <div id="title">
                <img src={logoImg} alt="Logo" />
                <h1>REACTFOOD </h1>
            </div>
            <button className="text-button" onClick={() => handleCartClick()}>{`Cart (${
                cart && cart?.length
            })`}</button>
        </header>
    );
};
export { Header };
