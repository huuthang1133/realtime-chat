import React from 'react';
import { Home, Chat} from '../components'
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
  

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route path='/' exact component={Home}/>
                <Route path='/chat' exact component={Chat}/>
            </Switch>
        </Router>        
)}

export default Routes;