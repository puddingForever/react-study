import logo from '../assets/investment-calculator-logo.png';

// 헤더만 구성
const Header = () => {
  return (
    <div id="header">
      <img src={logo} />
      <h1>Investment Calculator</h1>
    </div>
  );
}

export default Header;