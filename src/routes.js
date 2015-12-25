import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import Tests from './components/Tests';

const routes = (
  <Route component={App}>
    <Route path="/" component={Home} />
    <Route path="/tests" component={Tests} />
  </Route>
);

export default routes;
