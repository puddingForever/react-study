const CustomInput = ({ label, value, setValue }) => {
    return (
        <div className="custom-iniput">
            <label>{label}</label>
            <input type="number" value={value} onChange={setValue} />
        </div>
    );
};

export default CustomInput;
