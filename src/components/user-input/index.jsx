import CustomInput from './components/custom-input';

const UserInput = ({ investments, setInvestments }) => {
    const investmentFields = Object.keys(investments);

    const handleInputChange = (key, value) => {
        const numericValue = value.includes('.') ? parseFloat(value) : parseInt(value);
        setInvestments({
            ...investments,
            [key]: { ...investments[key], value: numericValue },
        });
    };

    return (
        <div id="user-input" className="input-group">
            {investmentFields.map((field) => (
                <CustomInput
                    key={field}
                    label={investments[field].label}
                    value={investments[field].value}
                    setValue={(event) => handleInputChange(field, event.target.value)}
                />
            ))}
        </div>
    );
};

export default UserInput;
