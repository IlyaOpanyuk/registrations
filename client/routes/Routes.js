import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../views/Home/Home';
import Edit from '../views/Edit/Edit';
import Employees from '../views/Employees/Employees';

export default class Routes extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      data: ''
    }

    this.getDealer = this.getDealer.bind(this);
  }

  getDealer(options){
    this.setState({
      data: options
    });
  }

  render(){
    return (
      <Switch>
        <Route exact name="main" path="/" render={() => <Home getDealer={ this.getDealer } />} />
        <Route name="edit" path="/edit/:id" component={Edit} />
        <Route name="employees" path="/employees" render={() => <Employees dealers={ this.state.data }/>}/>
      </Switch>
    )
  }
} 
  