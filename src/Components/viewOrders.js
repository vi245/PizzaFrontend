import React from "react";
import axios from "axios";
import {withRouter} from 'react-router';
import '../Styles/orders.css';

class Order extends React.Component{
    constructor(props)
    {
        super(props);
       this.state={
        orderData:[],
        mesg:"",
        name:"",
        open:false,
       }
    }
    componentDidMount(){
        window.addEventListener('popstate',()=>{
            window.location.reload();
          })
          const user=JSON.parse(localStorage.getItem('loginData'));
          if(!user)
          {
            this.setState({mesg:"Please Login first to view your orders"})
            this.setState({open:true});
          }
          else{
          const userEmail=user.email;
          axios({
            method:'GET',
            url:`https://pizzaorderms.herokuapp.com/order/getOrderDetailsByUser?userEmail=${userEmail}`,
            headers:{'Content-Type':'application/json'} 
          }
          ).then(response=> {this.setState({orderData:response.data});this.setState({open:false});
                   this.setState({name:user.name});
        }).catch();
         } 
    }
   render()
    {
        return(

             <div className="order_page">
                {!this.state.open ?
                    <div className="order_info">
                   {this.state.orderData.length===0 ?  
                   <div>
                    <h2>Hi {this.state.name.toUpperCase()},you have not ordered anything yet</h2>
                    <button className="vButton" onClick={()=>{this.props.history.push('/')}}>Goto Home</button>
                   </div> 
                   
                   
                   :    
                <h2>Hi {this.state.name.toUpperCase()}, Your Orders are</h2>}
                {this.state.orderData.map((item)=>{
                    return(
             <div className="order_det">
              <h4 className="line_margin">CustomerId</h4>
              <h5 className="line_margin">{item.customerId}</h5>
             <table className="orderTable">
               <tbody>
                   <tr>
                       <td>PizzaType</td>
                       <td>Quantity</td>
                   </tr>
                    {
                        item.meals.map((curr)=>{
                            return(
                                <tr>
                                    <td>{curr.pizzaType}</td>
                                    <td>{curr.quantity}</td>
                                </tr>
                            )
                        })
                    }
                    <tr>
                       <td>Total Amount</td>
                       <td>Rs.{item.total}</td>
                   </tr>
                   </tbody>
             </table>
             <h4 className="line_margin">Address</h4>
              <h5 className="line_margin">{`${item.shipping.address.line1},
              ${item.shipping.address.city},
              ${item.shipping.address.postal_code},
              ${item.shipping.address.state},
              ${item.shipping.address.country}`}</h5>
              <h5 className="line_margin">{item.shipping.phone}</h5>
              <h4 className="line_margin">Payment Status</h4>
              <h5 className="line_margin">{item.payment_status}</h5>
             </div>
                    )
                })} 
               
                </div>
           
                :
                <div className="order_info">
                    <h3>{this.state.mesg}</h3>
                    <button className="vButton" onClick={()=>{this.props.history.push('/')}}>Goto Home</button>
                </div>
                }
                
                </div>
        )
    }
}
export default withRouter(Order);