import React from "react";
import Navbar from "./navbar";
import {withRouter} from 'react-router';
import "../Styles/home.css";
import axios from "axios";
import "../Styles/cart.css";

class ViewCart extends React.Component{
  constructor(props)
  {
    super(props);
    this.state={
      cartItems:[],
      TotalAmount:0,
    }
    }
    componentDidMount(){
        window.addEventListener('popstate',()=>{
          window.location.reload();
        })
       axios({
        method:'GET',
        url:'https://pizzaorderms.herokuapp.com/cart/getCartItems',
        headers:{'Content-Type':'application/json'},
       }).then((response)=>{
              // Add quantity for each item
            const mcart=[];
            response.data.forEach(cart => {
            cart["quantity"]=1;
            cart["desc"]="Delicious and mouth watering pizza";
             mcart.push(cart);
   });
   mcart.map((item)=>{
    return console.log(item["quantity"]*item["amount"]);
   })
   this.setState({cartItems:mcart});
   const Total=this.totalAmount(mcart);
   //set the amount
   this.setState({TotalAmount:Total});
   }).catch(err=>console.log(err))
    }
 //Place the order only if user is logged  in
    handleUserDetail=()=>{
      const user=JSON.parse(localStorage.getItem('loginData'));
      if(!user){
        alert("Please Login first to place the order");
      }
      else{
        const arr=[];
        this.state.cartItems.forEach((item)=>{
          if(item.quantity>0)
          {
            arr.push({
              quantity:item.quantity,
             pizzaType:item.pizzaType,
             amount:item.amount,
              desc:item.desc,
              id:item._id,
            })}})
        const cartItems=arr;
        const userEmail=user.email;
       const userId=user._id;
        const config={
              method:"POST",
              url:"https://pizzaorderms.herokuapp.com/api/create-checkout-session",
              data:{
                  userId,userEmail,cartItems,
              },
             };
             axios(config).then((response)=>{
              
                window.location.href=response.data.url;
               
             }).catch((err)=>console.log(err.message));
      }
    
    }
    totalAmount=(cart)=>{
      const total=cart.reduce((sum,b)=>{
        return sum + b["amount"] * b["quantity"];
      },0);
      return total;
  }
  //Increment the quantity
  increment=(e,id)=>{
    const {cartItems}=this.state;
    const selectCartIndex=cartItems.findIndex((cart)=>cart._id===id);
    const selectCart=cartItems[selectCartIndex];
    const mqty=selectCart.quantity+1;
   selectCart["quantity"]=mqty;
   cartItems[selectCartIndex]=selectCart;
  
   this.setState({cartItems:cartItems});
   
   const Total=this.totalAmount(cartItems);
   this.setState({TotalAmount:Total});
  }
  //decrement the quantity
  decrement=(e,id)=>{
    const {cartItems}=this.state;
       const selectCartIndex=cartItems.findIndex((cart)=>cart._id===id);
       const selectCart=cartItems[selectCartIndex];
       const mqty=selectCart.quantity-1;
       if(mqty>=0)
      {
       selectCart["quantity"]=mqty;
      cartItems[selectCartIndex]=selectCart;
    
      this.setState({cartItems:cartItems});
      
      const Total=this.totalAmount(cartItems);
      this.setState({TotalAmount:Total});
     }
     //delete the item if user not want to buy
     if(mqty<0)
     {
      axios({
        method:'DELETE',
        url:`https://pizzaorderms.herokuapp.com/cart/removeCartItem?id=${id}`,
      }).then(response=>console.log(response)).catch(err=>console.log(err));
      cartItems.splice(selectCartIndex,1);
      this.setState({cartItems:cartItems});
   }
  }
  render()
  {
    let{cartItems}=this.state;
    return(
        <div className="main_block">
        <Navbar/>
        <div className="ingredientBlock">
      <div className="optionsBlock">
      <h1 style={{"textAlign":"center"}}>View Cart Items</h1>
      {
        (cartItems && cartItems.map(item=>{
          return( <div key={item._id} className="cartItem">
        <div className="cartItemDetails">
          <h1>{item.pizzaType}</h1>
          <h3>Crust:{item.crustType}</h3>
          <h3>Chesse:{item.cheeseType}</h3>
          <h3>VegToppings:
          {
            item.vegToppingsType.map(element=>{
             return(
              <span>{element}</span>
             )
            })
          }
          </h3>
          <h3>NonVegToppings:
         {
            item.NonVegToppingsType.map(element=>{
             return(
              <span>{element}</span>
             )
            })
          }
          </h3>
          <h3>SauceType:
          {
            item.SauceType.map(element=>{
             return(
              <span>{element}</span>
             )
            })
          }
          </h3>
          <h3>Amount:{item.amount}</h3>
        </div>
        <div>
           <button  onClick={(e)=>this.decrement(e,item._id)}className="dimension">-</button>
            <input type="text" value={item.quantity} readOnly></input>
            <button  onClick={(e)=>this.increment(e,item._id)} className="dimension">+</button>
        </div>
      </div>)
        }))
      } 
        <h1 className="amt">{this.state.TotalAmount}</h1>
        <button className="pay" onClick={()=>{this.handleUserDetail()}}>Pay Now</button>
      </div>
    </div>
    </div>
    )
  }
}
export default withRouter(ViewCart);