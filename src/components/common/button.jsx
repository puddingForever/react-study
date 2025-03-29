const Button = ({ label, onClick = () => {}, className, type = 'button' }) => {
    return (
        <button
            className={`py-2 px-6 rounded-lg font-semibold ${className} cursor-pointer `}
            onClick={onClick}
            type={type}
        >
            {label}
        </button>
    );
};

export default Button;
