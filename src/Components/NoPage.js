import React from "react";
import '../Styles/verification.css';

class NoPageFound extends React.Component{
   
    componentDidMount(){
        window.addEventListener('popstate',()=>{
          window.location.reload();
        })
     
      }
   render()
    {
        return(
               <div className="test">
                 <h2>No Page Found</h2>
                 <p>Check the url</p>
                </div>
        )
    }
}
export default NoPageFound;