import React from "react";
import Modal from 'react-modal';
import {withRouter} from 'react-router';
import '../Styles/nav.css'
import axios from "axios";
import validator from "validator";


class Navbar extends React.Component{
    constructor(props)
    {
      super(props);
      this.state={
        modalIsOpen:false,
        signUp:false,
        email:"",
        name:"",
        password:"",
        message:"",
        loginData:localStorage.getItem('loginData')?JSON.parse(localStorage.getItem('loginData')):null,
        
      }
    }
    
    validateEmail=(e)=>{
      var email=e.target.value;
      if(validator.isEmail(email))
      {
        this.setState({message:"Valid Email"});
      }
      else{
        this.setState({message:"Enter valid Email!"});
      }
    }
    handleNew=()=>{
      this.setState({email:""});
      this.setState({password:""});
      this.setState({message:""});
      this.setState({name:""});
   }
    handleSignUpForm = (e)=>{
      e.preventDefault();
   let name=this.state.name;
       let   email=this.state.email;
        let  password=this.state.password;
          const config={
            method:"POST",
            url:"http://localhost:3000/loginUser/register",
            data:{
              name,email,password,
            },
           
            };
            axios(config).then((response)=>{
              console.log(response);
                if(response.data.status===401)
                { 
              this.setState({message:"user already exist"});}
              if(response.data.status===201)
              {
              this.setState({message:"email has been sent for verification"});
              }
            }).catch(error=>{
              
              this.setState({message:"internal server error"});
            });
          }
          handleSignInForm=(e)=>{
            e.preventDefault();
        let email=this.state.email;
        let password=this.state.password;
          const config={
            method:"POST",
            url:"http://localhost:3000/loginUser/login",
            data:{
              email,password,
            },
            
            };
            axios(config).then((response)=>{
              console.log(response);
              if(response.data.status===400)
                { 
              this.setState({message:"Password does not match"});}
              if(response.data.status===202)
              {
              this.setState({message:"email has been sent for pending verification"});
              }
              if(response.data.status===200)
              {
              
              localStorage.setItem('loginData',JSON.stringify(response.data));
              
                const user=JSON.parse(localStorage.getItem('loginData'));
                console.log(user.token);
                axios({
                    method:'GET',
                    url:'http://localhost:3000/loginUser/authentication',
                    headers:{
                        Authorization:`Bearer ${user.token}`,
                    },
                }).then((response)=> alert(response.data.message)).catch();
                window.location.reload();
              }
            if(response.data.status===404)
              {
              this.setState({message:"provide correct email or sign up first"});
              }
              
            }).catch((error)=>{
              error=new Error();
            });
          }
          
    
logout=()=>{
alert("Do you want to logout?");
localStorage.removeItem('loginData');
this.setState({loginData:null});

}
render()
{
return(
  <header className="container flex space-between ">
      <div className="container flex space-between navbar" >
      <div className="left align-items center flex logo" onClick={()=>{this.props.history.push('/');}}>PizzaHut</div>
      <button className="viewButton" onClick={()=>{this.props.history.push('/viewOrders');}}>View Orders</button>
      <button className="viewButton" onClick={()=>{this.props.history.push('/viewCart');}}>View Cart</button>
      <nav className="flex ">
        <div className="right flex align-items  ">
          <ul className="flex align-items center">
            
             <li>
              {(this.state.loginData===null) ?
              <button className="loginButton" onClick={()=>this.setState({modalIsOpen:true})}>Login</button>: <ul className="userName"><li>{`Hi ${this.state.loginData.name.toUpperCase()}`}</li></ul>}
              </li>
              {this.state.signUp === false &&
             <Modal
              isOpen={this.state.modalIsOpen}
               onRequestClose={()=>this.setState({modalIsOpen:false})}
              className="Modal"
            overlayClassName="Overlay"
            onAfterOpen={()=>{document.body.style.overflow='hidden'}}
            onAfterClose={()=>{document.body.style.overflow='visible'}}
             >
              <div className="flex direction-column sign">
                  <div className="flex space-between loginHeader"><h2>Login</h2>
                  <button className="cross"onClick={()=>{this.setState({modalIsOpen:false});this.handleNew();}}><span className="crossStyle">&times;</span></button></div>
                  <div className="flex direction-column center align-items ">
                 <form  onSubmit={this.handleSignInForm} className="loginForm flex direction-column ">
                 <input className="marginAbove" type="email" value={this.state.email} onChange={(e)=>this.setState({email:e.target.value})} placeholder="Enter your email" required></input>
                  <input className="marginAbove"type="password"value={this.state.password} onChange={(e)=>this.setState({password:e.target.value})} placeholder="Enter your password" required></input>
                  <button className="marginAbove signInButton" type="submit">Sign In</button>
                 </form>
                 {this.state.message? <p className="marginAbove">{this.state.message}</p>:null}
                 
                 <div><button className="exchange marginAbove" onClick={()=>{this.setState({signUp:true});this.handleNew();}}>Don't have an account?Sign Up</button></div>
                 </div>
                </div>
             </Modal>}
            {this.state.signUp=== true && <Modal
             isOpen={this.state.modalIsOpen}
              onRequestClose={()=>this.setState({modalIsOpen:false})}
             className="Modal"
           overlayClassName="Overlay"
           onAfterOpen={()=>{document.body.style.overflow='hidden'}}
           onAfterClose={()=>{document.body.style.overflow='visible'}}
            >
             <div className="flex direction-column sign">
                 <div className="flex space-between loginHeader"><h2>Sign Up</h2>
                 <button className="cross"onClick={()=>{this.setState({modalIsOpen:false});this.handleNew();}}><span className="crossStyle">&times;</span></button></div>
                 {this.state.message? <p className="marginAbove">{this.state.message}</p>:null}
                 <div className="flex direction-column center align-items ">
                <form onSubmit={this.handleSignUpForm} className="loginForm flex direction-column ">
                <input className="marginAbove" type="text" value={this.state.name} onChange={(e)=>this.setState({name:e.target.value})} placeholder="Enter your name" required></input>
                <input className="marginAbove" type="email" value={this.state.email} onChange={(e)=>{this.setState({email:e.target.value});this.validateEmail(e)}} placeholder="Enter your email" required></input>
                <input className="marginAbove"type="password"value={this.state.password} onChange={(e)=>this.setState({password:e.target.value})} placeholder="Enter your password" required></input>
                <button className="marginAbove signInButton"type="submit">Sign up</button>
                 
                </form>
                <button className="exchange marginAbove"onClick={()=>{this.setState({signUp:false});this.handleNew();}}>Already have an account?Sign In</button>
                </div>
               </div>
            </Modal>
             }
             {this.state.loginData &&
              <li><button className="loginButton"
             onClick={this.logout}
             >Logout</button></li>}
          </ul>
          </div>
      </nav>
      </div>
  </header>
  )
}
}
export default  withRouter(Navbar);