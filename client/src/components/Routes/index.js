import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Home from '../../pages/Home';
import Connexion from '../../pages/Connexion';
import Trending from '../../pages/Trending';

const index = () => {
    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/Connexion" exact component={Connexion} />
                    <Route path="/trending" exact component={Trending} />
                    <Redirect to="/"/>
                </Switch>
            </Router>
        </div>
    );
};

export default index;