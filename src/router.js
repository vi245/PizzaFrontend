import './App.css';
import React from "react";
import { BrowserRouter,Route, Switch} from "react-router-dom";
import Home from './Components/home' ;
import ViewCart from './Components/viewCart';
import Verification from './Components/VerificationPage';
import Success from './Components/success';
import Cancel from './Components/cancel';
import NoPageFound from './Components/NoPage';
import Order from './Components/viewOrders';

 function Router() {
     
    return(
        <BrowserRouter forceRefresh={true}>
        <Switch >
            <Route   exact path='/'  component={Home} />
           <Route path='/viewCart' component={ViewCart} />
           <Route   path='/viewOrders'  component={Order}/>
           <Route  exact path='/verify/:token'  component={Verification}/>
            <Route   path='/success'  component={Success}/>
            <Route   path='/cancel'  component={Cancel}/>
            <Route component={NoPageFound}/>
            </Switch> 
        </BrowserRouter>
    )
    
}
export default Router;