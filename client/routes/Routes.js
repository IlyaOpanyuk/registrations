import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../views/Home/Home';
import Edit from '../views/Edit/Edit';
import Employees from '../views/Employees/Employees';

export default () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/edit" component={Edit} />
    <Route path="/employees" component={Employees} />
  </Switch>
);