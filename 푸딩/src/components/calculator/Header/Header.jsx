import styles from '../calculator.module.css';
import Logo from '../../../assets/investment-calculator-logo.png';

const Header = () => {
  return (
    <header id={styles.header}>
      <img src={Logo} aria-hidden="true" />
      <h1>Investment Calculator</h1>
    </header>
  );
};

export default Header;