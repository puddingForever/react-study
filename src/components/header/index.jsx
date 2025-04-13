import quizlogo from '../../assets/quiz-logo.png';
const Header = () => {
    return (
        <header className="header">
            <img src={quizlogo} alt="Quiz Logo" />
            <h1>REACTQUIZ</h1>
        </header>
    );
};

export default Header;
