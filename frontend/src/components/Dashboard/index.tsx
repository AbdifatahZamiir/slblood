import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import ProtectedRoute from "../Common/protectedRoute";
import { Route, Switch, Redirect } from "react-router-dom";
import AppBar from "../AppBar";
import Home from "../Home/index";
import { Drawer } from "../SideBar";
import Profile from "../Common/Profile";
import Grades from "../Requests";
import NotFound from "../Common/NotFound";
import Donors from "../Donors";
import Requests from "../Requests";
import BloodTypes from "../BloodTypes";
import AlldonorView from "../Reports/alldonorsview";
import DonorVIew from "../Reports/donorReportView";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    button: {
      marginTop: 30,
    },
    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
    },

    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: "100vh",
      overflow: "auto",
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
  })
);

const Dashboard = () => {
  const [open, setOpen] = useState(true);
  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const handleDrawerClose = () => {
    setOpen(!open);
  };
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />

      <AppBar open={open} onHandleDrawerOpen={handleDrawerOpen} />

      <Drawer open={open} onHandleDrawerClose={handleDrawerClose} />

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Switch>
            <ProtectedRoute path="/dashboard/donors" component={Donors} />
            <ProtectedRoute path="/dashboard/requests" component={Requests} />
            <ProtectedRoute path="/dashboard/bloodtypes" component={BloodTypes} />
            <ProtectedRoute path="/dashboard/profile" component={Profile} />
            <Route path="/dashboard/not-found" component={NotFound} />
            <ProtectedRoute
              path="/dashboard/donorview"
              component={DonorVIew}
            />
            <ProtectedRoute
              path="/dashboard/alldonorsview"
              component={AlldonorView}
            />
            <ProtectedRoute path="/dashboard/grades" component={Grades} />
            <ProtectedRoute path="/dashboard" component={Home} />
            <Redirect to="/dashboard/not-found" />
          </Switch>
        </Container>
      </main>
    </div>
  );
};

export default Dashboard;
