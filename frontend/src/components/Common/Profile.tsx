import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import { green, pink } from "@material-ui/core/colors";
import Chip from "@material-ui/core/Chip";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import auth from "../../services/authServices";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },

  gridRoot: {
    flexGrow: 1,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  avatar: {
    color: theme.palette.getContrastText(green[800]),
    backgroundColor: green[500],
    width: theme.spacing(5),
    height: theme.spacing(5),
    float: "left",
  },
  left: {
    backgroundColor: green[500],
    float: "right",
    color: theme.palette.getContrastText(pink[500]),
  },

  paper: {
    padding: theme.spacing(1),
    textAlign: "left",
    color: theme.palette.text.secondary,
  },
  section1: {
    margin: theme.spacing(3, 2),
    color: theme.palette.getContrastText(green[100]),
  },
}));
const Profile = () => {
  const classes: any = useStyles();
  const userinfo: any = auth.getCurrentUser();
  const { userId, email, username, admin }: any = auth.getCurrentUser();
  console.log(userinfo);
  return (
    <Grid container spacing={3}>
      <Grid item xs={4}>
        <Paper className={classes.paper}>
          <Avatar aria-label="recipe" className={classes.avatar}>
            {username.charAt(0).toUpperCase()}
          </Avatar>
          <Chip label="Current User" className={classes.left} />
          <div className={classes.root}>
            <div className={classes.section1}>
              <Grid container alignItems="center">
                <Grid item xs>
                  <List
                    component="nav"
                    className={classes.root}
                    aria-label="mailbox folders"
                  >
                    <ListItem>
                      <ListItemText primary={userId} secondary="User Id" />
                    </ListItem>

                    <Divider />
                    <ListItem>
                      <ListItemText primary={username} secondary="User Name" />
                    </ListItem>
                    <Divider />

                    <ListItem>
                      <ListItemText primary={email} secondary="Email" />
                    </ListItem>
                    <Divider />
                  </List>
                </Grid>
              </Grid>
            </div>
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Profile;
