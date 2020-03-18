import React from "react";
import { Switch, Route } from "react-router-dom";
import { RouteWithLayout } from "./helper";
import IndexPage from "../app/index/indexPage"
import UserLogin from "../app/users/login/user-login"
import Add from "../app/components/main/add";
import List from "../app/components/main/list"
import Edit from "../app/components/main/edit"
import Test from "../app/components/main/test"
import UserDashboard from "../app/users/dashboard/user-dashboard" 
import Register from "../app/users/login/register"
import AdminLogin from "../app/admin/login/admin-login"
import AdminDashboard from "../app/admin/dashboard/admin-dashboard"


const RoutDictionary = ({ location, ...rest }) => {
  return (
    <Switch>
      <Route exact path="/" component={IndexPage} />
      <Route exact path="/login" component={UserLogin} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/dashboard" component={UserDashboard} />
      <Route exact path="/admin-login" component={AdminLogin} />
      <Route exact path="/admin-dashboard" component={AdminDashboard} />

      <Route exact path="/add" component={Add} />
      <Route exact path="/edit" component={Edit} />
      <Route exact path="/test" component={Test} />
    </Switch>
  );
};

export default RoutDictionary;
