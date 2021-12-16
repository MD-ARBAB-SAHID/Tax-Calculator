import React,{useState,useEffect}from "react";
import Modal from "../UI/Modal";
import Table from "../components/Table";
import LoadingSpinner from "../UI/LoadingSpinner";
import Card from "../UI/Card";
const Tax = ()=>{
    const [isLoading,setIsLoading] = useState(false);
    const [data,setData] = useState(null);
    const[isError,setError] = useState(false);
    const onClose = ()=>{
        setData(null);
        setError(null)
    }
    useEffect(()=>{
        const recieveData = async ()=>{
                setIsLoading(true);
            try{
                const response = await fetch(`${process.env.REACT_APP_URL}`);
                if(!response.ok)
                {
                    throw new Error("Something went wrong,Try Again later");
                }
                const data = await response.json();
            setIsLoading(false);
                setData(data.invoices);

                
            }catch(err)
            {
              setIsLoading(false);
                setError(err.message)
            }
        }
        recieveData();

    },[])
  

    return (

       <div className="container">
            <h1>Tax Calculator</h1>
            {!isLoading && isError && <Modal onClose={onClose}><p>{isError}</p></Modal>}
            {isLoading && <LoadingSpinner>Loading Data </LoadingSpinner>}
            {!isLoading && !isError &&  data && data.length===0 && <p>No data available</p>}
            {!isLoading && !isError && data && data.length>0 && <Table invoices={data}/>}
            
       </div>
    
    )
}

export default Tax;