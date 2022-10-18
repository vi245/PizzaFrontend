import React from "react";
import "../Styles/ingredients.css";
import axios from "axios";

class Ingredients extends React.Component{
  constructor(props)
  {
    super(props);
    this.state={
      ingredients:[],
      message:"",
      message1:"",
      message2:"",
      message3:[],
      message4:[],
      message5:[],
      vegTopping:0,
      nonVegTopping:0,
      sauce:0,
      cheese:0,
      totalPrice:0,
      priceVegTopping:[],
      priceNonVegTopping:[],
      priceSauce:[],
      crust:0,
    }
    
  }

  componentDidMount()
  {
     
      
    axios(
      {
        method:'GET',
        url:'http://localhost:3000/ingredient/getIngredient',
        headers:{'Content-Type':'application/json'},
      }
    ).then(response=> this.setState({ingredients:response.data})).catch();
   }
   //Post selected Pizza
   AddToCart =()=>{
    let {message,message1,message2,message3,message4,message5,totalPrice}=this.state;
    if(message===""){
      alert("Please select the fields");
    }
    else if(message1===""){
      alert("Please select the fields");
    }
    else if(message2===""){
      alert("Please select the fields");
    }
    else if(message5.length===0){
      alert("Please select the fields sauce");
    }
    else if(message3.length===0 && message4.length===0)
    {
      alert("Please select the fields");
    }
    
    else{
      let   vegToppingsType=message3;
      let  NonVegToppingsType=message4;
      let  SauceType=message5;
      let pizzaType=message;
      let crustType=message1;
      let cheeseType=message2;
      let amount=totalPrice;
         const config={
           method:"POST",
           url:"http://localhost:3000/cart/addCartItem",
           data:{
             pizzaType,crustType,cheeseType,vegToppingsType,NonVegToppingsType,SauceType,amount
           },
          
           };
           axios(config).then((response)=>{
             if(response.data.status===200)
             {
              alert("Selected Pizza Added Successfully");
             }
             if(response.data.status===500)
             {
              alert("Please select atleast one Type");
             }
           }).catch(error=>{
             console.log(error);
           });
    }
    
   }
 //add pizza Type
  handleTypeClick=(e)=>{
      this.setState({message:e.target.value},()=>{console.log(this.state.message)});
  }
  
  // Add Crust

  handleCrustClick=(e,price)=>{
    // Destructuring state variables
    let{nonVegTopping,sauce,vegTopping,cheese}=this.state; 
    // Show current selection 
    this.setState({message1:e.target.value});
    var price_crust=0;
    // Add current price
    price_crust=price_crust+price;
    // update the state
    this.setState({crust:price_crust});
    // Add price of all selections
    let tprice=nonVegTopping+price_crust+sauce+vegTopping+cheese;
    // update the state
    this.setState({totalPrice:tprice});
}
handleCheeseClick=(e,price)=>{
  let{nonVegTopping,sauce,vegTopping,crust}=this.state;  // Destructuring state variables
  this.setState({message2:e.target.value});  // Show current selection 
  var price_cheese=0;
  price_cheese=price_cheese+price; // Add current price
        this.setState({cheese:price_cheese});  // update the state
        let tprice=nonVegTopping+price_cheese+sauce+vegTopping+crust; // Add price of all selections
       this.setState({totalPrice:tprice}); // update the state
}
handleVegToppingClick=(e,price)=>{
  let{nonVegTopping,sauce,cheese,crust,message3,priceVegTopping}=this.state; // Destructuring state variables
  var updatedList=[...message3]; 
  var total_vegToppings=0; 
  var updatedPrice=[...priceVegTopping];
  if(e.target.checked)
  {
    //Add the current selection
    updatedList=[...message3,e.target.value]; 
    updatedPrice=[...priceVegTopping,Number(e.target.value.split('Rs')[1])];
   
  }
  else{
    //Remove the current selection
    updatedList.splice(message3.indexOf(e.target.value),1);
    updatedPrice.splice(priceVegTopping.indexOf(Number(e.target.value.split('Rs')[1])),1);
}
this.setState({message3:updatedList}); // Show current selection 
  this.setState({priceVegTopping:updatedPrice});
    updatedPrice.forEach(item=>{ 
       total_vegToppings=total_vegToppings+item;
    }
    )
        this.setState({vegTopping:total_vegToppings});
        let tprice=nonVegTopping+total_vegToppings+sauce+cheese+crust;
       this.setState({totalPrice:tprice});
}

handleNonVegToppingClick=(e,price)=>{
  const{message4,priceNonVegTopping}=this.state;
  let{vegTopping,sauce,cheese,crust}=this.state;
  var updatedList=[...message4];
  var total_vegToppings=0;
  var updatedPrice=[...priceNonVegTopping];
  if(e.target.checked)
  {
    updatedList=[...message4,e.target.value];
    updatedPrice=[...priceNonVegTopping,Number(e.target.value.split('Rs')[1])];
   
  }
  else{
    updatedList.splice(message4.indexOf(e.target.value),1);
    updatedPrice.splice(priceNonVegTopping.indexOf(Number(e.target.value.split('Rs')[1])),1);
}

  this.setState({priceNonVegTopping:updatedPrice});
  this.setState({message4:updatedList});
    updatedPrice.forEach(item=>{ 
       total_vegToppings=total_vegToppings+item;
    }
    )
        this.setState({nonVegTopping:total_vegToppings});
        let tprice=vegTopping+total_vegToppings+sauce+cheese+crust;
       this.setState({totalPrice:tprice});

}
handleSauceClick=(e,price)=>{
  const{message5,priceSauce}=this.state;
   let{vegTopping,nonVegTopping,cheese,crust}=this.state;
  var updatedList=[...message5];
  var total_vegToppings=0;
  var updatedPrice=[...priceSauce];
  if(e.target.checked)
  {
    updatedList=[...message5,e.target.value];
    updatedPrice=[...priceSauce,Number(e.target.value.split('Rs')[1])];
  }
  else{
    updatedList.splice(message5.indexOf(e.target.value),1);
    updatedPrice.splice(priceSauce.indexOf(Number(e.target.value.split('Rs')[1])),1);
}
this.setState({priceSauce:updatedPrice});
this.setState({message5:updatedList});
updatedPrice.forEach(item=>{ 
   total_vegToppings=total_vegToppings+item;
})
this.setState({sauce:total_vegToppings},()=>{console.log(this.state.sauce)});
let tprice=vegTopping+nonVegTopping+total_vegToppings+cheese+crust;
this.setState({totalPrice:tprice});

}

  render()
  {
    const ingredients=this.state.ingredients;
    return(
      <div className="ingredientBlock">
      <div className="optionsBlock">
      <h1 style={{"textAlign":"center"}}>Welcome to PizzaHut<br></br>
      You can now customize your own Pizza
      </h1>  
        <div className="pizzaType">
          <h1>Select Pizza Type</h1>
          <div className="pizzaTypeMenu">
          { (ingredients[0] &&
          ingredients[0].type_pizza.map((item,index)=>{
             return(
             <label key={item._id} htmlFor={item._id} className="pizzaName">
             <input id={item._id}type="radio" value={item.name} onClick={(e)=>{this.handleTypeClick(e)}}  name="pizzatype"></input> 
             {item.name}
             </label>
             )
          }))}
          </div>
         <p>{this.state.message}</p>
              
        </div>
        <div className="pizzaCrust">
        <h1>Select Crust Type</h1>
          <div className="pizzaTypeMenu">
          { (ingredients[0] &&
          ingredients[0].type_crust.map((item,index)=>{
             return(
             <label key={item._id} htmlFor={item._id} className="pizzaName">
             <input id={item._id}type="radio" value={`${item.name} Rs${item.price}`} onClick={(e)=>{this.handleCrustClick(e,item.price)}}  name="crustType"></input> 
             {item.name}
             </label>
             )
          }))}
          </div>
         <p>{this.state.message1}</p>
        </div>
        <div className="pizzaCheese">
        <h1>Select Cheese Type</h1>
          <div className="pizzaTypeMenu">
          { (ingredients[0] &&
         ingredients[0].type_cheese.map((item,index)=>{
             return(
             <label key={item._id} htmlFor={item._id} className="pizzaName">
             <input id={item._id}type="radio" value={`${item.name} Rs${item.price}`} onClick={(e)=>{this.handleCheeseClick(e,item.price)}}  name="cheeseType"></input> 
             {item.name}
             </label>
             )
          }))}
          </div>
         <p>{this.state.message2}</p>
        </div>
        <div className="pizzaVegToppings">
        <h1>Add Veg Topings</h1>
          <div className="pizzaTypeMenu">
          { (ingredients[0] &&
          ingredients[0].type_vegToppings.map((item,index)=>{
             return(
             <label key={item._id} htmlFor={item._id} className="pizzaName">
             <input id={item._id}type="checkbox" value={`${item.name} Rs${item.price}`} onClick={(e)=>{this.handleVegToppingClick(e,item.price)}}></input> 
             {item.name}
             </label>
             )
          }))}
          </div>
          <div className="toppingList">
          {this.state.message3.map((item,index)=>{
            return(
              <span key={index}>{item}&nbsp;&nbsp;&nbsp;</span>
            )
          })}
          </div>
          
        
        </div>
        <div className="pizzaNonVegToppings">
        <h1>Add Non-Veg Topings</h1>
          <div className="pizzaTypeMenu">
          { (ingredients[0] &&
          ingredients[0].type_NonVegToppings.map((item,index)=>{
             return(
             <label key={item._id} htmlFor={item._id} className="pizzaName">
             <input id={item._id}type="checkbox" value={`${item.name} Rs${item.price}`} onClick={(e)=>{this.handleNonVegToppingClick(e,item.price)}}></input> 
             {item.name}
             </label>
             )
          }))}
          </div>
          <div className="toppingList">
          {this.state.message4.map((item,index)=>{
            return(
              <span key={index}>{item}&nbsp;&nbsp;&nbsp;</span>
            )
          })}
          </div>
          
        
        </div>
        <div className="pizzaSauce">
        <h1>Add Sauces</h1>
          <div className="pizzaTypeMenu">
          { (ingredients[0] &&
          ingredients[0].type_Sauce.map((item,index)=>{
             return(
             <label key={item._id} htmlFor={item._id} className="pizzaName">
             <input id={item._id}type="checkbox" value={`${item.name} Rs${item.price}`} onClick={(e)=>{this.handleSauceClick(e,item.price)}}></input> 
             {item.name}
             </label>
             )
          }))}
          </div>
          <div className="toppingList">
          {this.state.message5.map((item,index)=>{
            return(
              <span key={index}>{item}&nbsp;&nbsp;&nbsp;</span>
            )
          })}
          </div> 
          <h1>{this.state.totalPrice}</h1>
          <button onClick={()=>{this.AddToCart()}}>Add To cart</button>
        </div>

      </div>
    </div>
    )
  }
}
export default Ingredients;