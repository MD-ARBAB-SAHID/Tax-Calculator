import Modal from "../UI/Modal";
import { useState } from "react";
import LoadingSpinner from "../UI/LoadingSpinner";
const Rows = ({data})=>{
    const [result,setResult] = useState(null);
    const [isLoading,setIsLoading] = useState(false);
    const [isError,setIsError] = useState(null);
    const onClose=()=>{
        setResult(null);
        setIsError(null);
    }
    const taxCalculateHandler = async()=>{
        setIsLoading(true); 
        try{
                const response = await fetch(`${process.env.REACT_APP_URL}calculateTax`,{method:"POST",body:JSON.stringify({
                    itemType:data.item_type,
                    amount:data.amount
                }),
            headers:{
                'Content-Type':'application/json'
            }})
              if(!response.ok)
              {
                  throw new Error("Something Went Wrong , Try Again");
              }
              const taxResult = await response.json();
              
              setIsLoading(false);
              setResult(taxResult.tax);

        }catch(err)
        {   setIsError(err.message);
            setIsLoading(false);
        }
    }
   
    return (
        <>
        {isLoading && !isError && <LoadingSpinner>Loading Data</LoadingSpinner>}
        {!isLoading && !isError && result && result===-1 && <Modal onClose={onClose}><p>Cannot calculate tax for this item</p></Modal>}
        {!isLoading && isError && <Modal onClose={onClose}><p>{isError}</p></Modal>}
        {!isLoading && !isError && result && result!==-1 && <Modal onClose={onClose}><h3>Tax : Rs {result}</h3></Modal>}
        <tr>
            <td>{data.sno}</td>
            <td>{data.amount}</td>
            <td>{data.item_type}</td>
            <td><button onClick={taxCalculateHandler}>Calculate Tax</button></td>
        </tr>
        </>
    )
}

export default Rows