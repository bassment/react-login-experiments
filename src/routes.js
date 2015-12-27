import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import Tests from './components/Tests';
import { LoginRoute, LogoutRoute, AuthenticatedRoute } from 'react-stormpath';
import LoginPage from './loginProcess/components/pages/LoginPage';
import ProfilePage from './loginProcess/components/pages/ProfilePage';

const routes = (
  <Route component={App}>
    <Route path="/" component={Home} />
    <Route path="/tests" component={Tests} />
    <LoginRoute path='/login' component={LoginPage} />
    <AuthenticatedRoute path='/profile' component={ProfilePage} />
  </Route>
);

export default routes;
