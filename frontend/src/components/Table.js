import React from "react"
import Rows from "./Rows"
import "./Table.css"
const Table  = ({invoices})=>{
   return( <table className="Table" >


<thead>
  <tr>
    <th>S.No</th>
    <th>Amount</th>
    <th>Item_Type</th>
    <th>Tax</th>
  </tr>
  </thead>
  <tbody>
  {
      invoices.map((invoice)=>{
          return <Rows data={invoice} key={invoice.sno}/>
      })
  }
  

</tbody>

</table>)
}

export default Table;