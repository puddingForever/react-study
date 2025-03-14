import Header from './components/Header';
import InvestmentCalculator from './components/InvestmentCalculator';

// 페이지 구조 및 레이아웃 관리
// 입력과 결과를 통합
const App = () => {
  return (
    <>
      <Header />
      <InvestmentCalculator />
    </>
  );
}

export default App;