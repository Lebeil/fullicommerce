import React, {Fragment, useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/auth/Login";
import Register from "./Pages/auth/Register";
import NoPage from "./Pages/NoPage";
import Navbar from "./Components/Navbar";
import ForgotPassword from "./Pages/auth/ForgotPassword";
/*notify*/
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RegisterComplete from "./Pages/auth/RegisterComplete";

import {auth} from './firebase';
import {useDispatch} from "react-redux";


const App = () => {
    const dispatch = useDispatch();

    //to check firebase auth state
    useEffect(()=> {
        const unsubscribe = auth.onAuthStateChanged(async (user)=> {
            if(user) {
                const idTokenResult = await user.getIdTokenResult()
                /*console.log("USER", user)*/
                dispatch({
                    type: 'LOGGED_IN_USER',
                    payload: {
                        email: user.email,
                        token: idTokenResult.token,
                    }
                })
            }
        });
        //function cleanup
        return ()=> unsubscribe();
    }, [])

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
                    <Route exact path='/forgot/password' component={ForgotPassword}/>
                    <Route component={NoPage}/>
                </Switch>
            </Router>
        </Fragment>
    );
};

export default App;


