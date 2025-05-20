/**
 * 버튼 컴포넌트
 * @param {ReactNode} children - 버튼명 텍스트 
 * @param {Function} onClick - 버튼 클릭 이벤트
 * @param {string} className - 개별적 CSS 클래스
 */
import clsx from 'clsx';

const Button = ({ children, onClick, className }) => {
  return (
    <button
      className={clsx('p-2 rounded-sm cursor-pointer', className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;