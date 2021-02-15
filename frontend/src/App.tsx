import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/Common/protectedRoute";
import SignIn from "./components/SignIn";
import SignUp from './components/SignUp'
import NotFound from "./components/Common/NotFound";

const App = () => {
  return (
    <>
      <Switch>
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <ProtectedRoute path="/dashboard" component={Dashboard} />
        <Route exact path="/not-found" component={NotFound} />
        <Redirect from="/" to="/signup" />
        <Redirect to="/not-found" />
      </Switch>
    </>
  );
};

export default App;
