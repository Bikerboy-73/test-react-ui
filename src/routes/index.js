import React from "react";
import { Switch, Route } from "react-router-dom";
import { RouteWithLayout } from "./helper";
import IndexPage from "../app/components/index/indexPage"
import UserLogin from "../app/users/login/user-login"
import Add from "../app/components/main/add";
import List from "../app/components/main/list"
import Edit from "../app/components/main/edit"
import Test from "../app/components/main/test"
import Dashboard from "../app/components/dashboard/dashboard" 
import Register from "../app"

const RoutDictionary = ({ location, ...rest }) => {
  return (
    <Switch>
      <Route exact path="/" component={IndexPage} />
      <Route exact path="/add" component={Add} />
      <Route exact path="/edit" component={Edit} />
      <Route exact path="/test" component={Test} />
      <Route exact path="/login" component={UserLogin} />
      <Route exact path="/dashboard" component={Dashboard} />
    </Switch>
  );
};

export default RoutDictionary;
