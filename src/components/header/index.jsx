import logo from '../../assets/logo.png';

const Header = () => {
    return (
        <header>
            <img src={logo} className="logo" alt="logo" />
            <h1>Investment Calculator</h1>
        </header>
    );
};

export default Header;
