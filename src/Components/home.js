import React from "react";
import Navbar from "./navbar";
import Ingredients from "./ingredients";
import {withRouter} from 'react-router';
import "../Styles/home.css"


class Home extends React.Component{
  constructor(props)
  {
    super(props);
    this.state={
    }
    
  }
  componentDidMount(){
    window.addEventListener('popstate',()=>{
      window.location.reload();
    })
 
  }
  render()
  {
   
    return(
        <div className="main_block">
        <Navbar/>
       <Ingredients/>
        </div>
    )
  }
}
export default withRouter(Home);