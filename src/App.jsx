import { useState } from 'react';
import './App.css';
import Header from './components/header';
import UserInput from './components/user-input';
import Result from './components/result';

const initialInvestments = {
    initialInvestment: {
        value: 10000,
        label: 'INITIAL INVESTMENT',
    },
    annualInvestment: {
        value: 1200,
        label: 'ANNUAL INVESTMENT',
    },
    expectedReturn: {
        value: 6,
        label: 'EXPECTED RETURN',
    },
    duration: {
        value: 10,
        label: 'DURATION',
    },
};

function App() {
    const [investments, setInvestments] = useState(initialInvestments);

    return (
        <>
            <Header />
            <UserInput investments={investments} setInvestments={setInvestments} />
            <Result investments={investments} />
        </>
    );
}

export default App;
