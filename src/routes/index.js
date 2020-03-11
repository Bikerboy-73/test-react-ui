import React from "react";
import { Switch, Route } from "react-router-dom";
import { RouteWithLayout } from "./helper";
import Add from "../app/components/main/add";
import List from "../app/components/main/list"
import Edit from "../app/components/main/edit"
import Test from "../app/components/main/test"
import Login from "../app/components/login/login"
import Dashboard from "../app/components/dashboard/dashboard" 

const RoutDictionary = ({ location, ...rest }) => {
  return (
    <Switch>
      <Route exact path="/" component={List} />
      <Route exact path="/add" component={Add} />
      <Route exact path="/edit" component={Edit} />
      <Route exact path="/test" component={Test} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/dashboard" component={Dashboard} />
    </Switch>
  );
};

export default RoutDictionary;
