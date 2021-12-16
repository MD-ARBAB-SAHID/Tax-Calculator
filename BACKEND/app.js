const express = require("express");
const fs = require("fs");
const app =express();
const cors = require("cors");
let port =process.env.PORT;
app.use(cors());
app.use(express.static("public"))
app.use(express.json());

const calculateTax = (amount,itemId)=>{
    switch (itemId) {
      case 0:
        return 0.05 * amount;
        break;
      case 1:
        return 0.08 * amount;
        break;
      case 2:
        return 0.12 * amount;
        break;
      default:
        return -1;
    }
  };
app.get("/",(req,res)=>{

    fs.readFile(__dirname+"/public/data.json","utf-8",(err,data)=>{
        if(err)
        {
            return res.status(404).json({message:"Try Again Later"})
        }
        res.json(JSON.parse(data));
    })
  
})

app.post("/calculateTax",(req,res)=>{
    const {itemType,amount} = req.body;
    if(!itemType && !amount)
    {
        return res.status(404).json({message:"Error Try Agin Later"})
    }
  
    const tax = calculateTax(Number(amount),Number(itemType));
    return res.json({tax:tax});

})
if(port===null || port==="")
{
    port=5000;
}

app.listen(port,()=>{
    console.log("server started");
})
