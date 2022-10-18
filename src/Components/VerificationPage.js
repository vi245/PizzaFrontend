import React from "react";
import axios from "axios";
import {withRouter} from 'react-router';
import '../Styles/verification.css';

class Verification extends React.Component{
    constructor(props)
    {
        super(props);
        this.state={
             heading:"",
             message:"",
             verified:false,
             data:[],
        }
    }
    componentDidMount()
    {
        const token=this.props.match.params.token;
        axios({
            method:'PUT',
            url:`http://localhost:3000/loginUser/confirm/${token}`,
        }).then((response)=>{console.log(response)
       if(response.data.status===200)
       {
        this.setState({heading:"Welcome"})
        this.setState({message:"The account has been verified"});
        this.setState({verified:true});
       }
       if(response.data.status===201)
       {
        this.setState({heading:"Great"})
        this.setState({message:"Account has already been verified"});
        this.setState({verified:true});
       }
       if(response.data.status===400)
       {
        this.setState({heading:"Oops"})
        this.setState({message:"Unable to find Token or token may have expired"});
        this.setState({verified:false});
       }
       if(response.data.status===500)
       {
        this.setState({message:"Something went wrong!"});
        this.setState({verified:false});
       }}).catch();
    }
    render()
    {
        return(
               <div className="test">
                 <h2>{this.state.heading}</h2>
                 <p>{this.state.message}</p>
                 {this.state.verified && 
                 <button className="sButton" onClick={()=>this.props.history.push('/')}>Go to Home Page</button>
                 }
               </div>
        )
    }
}
export default withRouter(Verification);