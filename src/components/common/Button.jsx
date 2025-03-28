// 공통으로 사용하는 버튼
const Button = ({ children, variant = "default", onClick, className = "" }) => {

  // 세가지 스타일을 사용하길래 미리 생성해둠
  const variants = {
    default: "bg-transparent text-black hover:bg-black hover:text-white",
    black: "bg-black text-white hover:bg-gray-800",
    cancel: "bg-transparent text-black hover:bg-gray-200",
    primary: "bg-blue-500 text-white hover:bg-blue-600",
  };

  return (
    <button
      className={`py-2 px-4 rounded-md transition-colors h-10 ${variants[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;