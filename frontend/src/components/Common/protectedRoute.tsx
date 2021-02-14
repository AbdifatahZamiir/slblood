import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../../services/authServices";

interface Props {
  path: string;
  component: any;
  render?: any;
}

const ProtectedRoute = ({
  path,
  component: Component,
  render,
  ...rest
}: Props) => {
  return (
    <Route
      exact
      {...rest}
      render={(props: any) => {
        if (!auth.getCurrentUser()) return <Redirect to="/signin" />;
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
