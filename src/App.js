import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from "./Components/Home";
import Login from "./Components/auth/Login";
import Register from "./Components/auth/Register";
import NoPage from "./Components/NoPage";

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route exact path='/login' component={Login}/>
                <Route exact path='/register' component={Register}/>
                <Route component={NoPage}/>
            </Switch>
        </Router>
    );
};

export default App;
