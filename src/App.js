import React, {Fragment} from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/auth/Login";
import Register from "./Pages/auth/Register";
import NoPage from "./Pages/NoPage";
import Navbar from "./Components/Navbar";
/*notify*/
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RegisterComplete from "./Pages/auth/RegisterComplete";

const App = () => {
    return (
        <Fragment>
            <Router>
                <Navbar/>
                <ToastContainer />
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route exact path='/login' component={Login}/>
                    <Route exact path='/register' component={Register}/>
                    <Route exact path='/register/complete' component={RegisterComplete}/>
                    <Route component={NoPage}/>
                </Switch>
            </Router>
        </Fragment>
    );
};

export default App;

