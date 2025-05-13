import { useSelector } from "react-redux";
import Header from "./components/common/Header";
import MenuList from "./components/MenuList";
import Cart from "./components/Cart";
import Modal from "./components/common/Modal";
import Checkout from "./components/Checkout";

function App() {
  const { isShow, view } = useSelector((state) => state.ui);

  /*
  1. 사용자가 음식 목록을 볼 수 있는 리스트 페이지
  2. 카트에 사용자가 선택한 음식 담을 수 있는 기능
  3. 카트에는 사용자가 담은 음식, 각각의 수량, 총 합계 표시
  4. 카트에서 gotocheckout 버튼 누르면 주문양식 모달창
  5. 주문 검토 후 백엔드로 제출
  */

  return (
    <>
      {isShow && (
        <Modal currentView={view}>
          {view === "cart" && <Cart />}
          {view === "checkout" && <Checkout />}
        </Modal>
      )}
      <Header />
      <MenuList />
    </>
  );
}

export default App;
