import React from "react";
import {withRouter} from 'react-router';
import '../Styles/verification.css';

class Success extends React.Component{
   
   render()
    {
        return(
               <div className="test">
                 <h1>Thank you for your order</h1>
                 <p>Your Payment was Successful</p>
                 <button className="sButton" onClick={()=>this.props.history.push('/')}>Continue Order</button>
                 
               </div>
        )
    }
}
export default withRouter(Success);