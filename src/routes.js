import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// import PrivateRoute from './auth';

// import Login from './pages/login';
import Dashboard from './pages/dashboard';
import Logout from './pages/logout';

const Routes = () => (
    <Router>
        <Switch>
            <Route path="/" component={Dashboard} />
            <Route exact path="/logout" component={Logout} />
        </Switch>
    </Router>
);

export default Routes;