import React from "react";
import {withRouter} from 'react-router';
import '../Styles/verification.css';

class Cancel extends React.Component{
   
   render()
    {
        return(
               <div className="test">
                 <h1>Payment failed</h1>
                 <p>Your Payment was not Successful</p>
                 <button className="sButton" onClick={()=>this.props.history.push('/')}>Try to order again</button>
                 
               </div>
        )
    }
}
export default withRouter(Cancel);