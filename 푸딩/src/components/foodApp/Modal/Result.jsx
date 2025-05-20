const Result = ({onCloseModal}) => {

    return <>
         <h1>Success!</h1>
         <h1>Your order was submitted successfully</h1> 
         <button onClick={onCloseModal}>Okay</button>
    </>
}

export default Result;