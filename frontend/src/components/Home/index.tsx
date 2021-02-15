import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { LevelGraph } from "../Graphs";
import Typography from "@material-ui/core/Typography";
import Cards from "./Cards";
import Progress from "../Loading/progress";
import { getRequests } from "../../services/requestServices";
import { getBloodTypes } from "../../services/bloodtypeServices";
import { getDonors } from "../../services/donorServices";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    width: "100%",
    padding: theme.spacing(1),
    textAlign: "left",
    color: theme.palette.text.secondary,
  },
}));

const Home = () => {
  const classes = useStyles();
  const [donorItems, setDonorItems] = useState(0);
  const [requestItems, setRequests] = useState(0);
  const [bloodtypeItems, setBloodTypesItems] = useState(0);
  const [bloodtypes, setBloodTypes] = useState<Array<{}>>([]);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    const fetchRequests = async () => {
      const { data } = await getRequests();
      const { totalItems } = data;
      setRequests(totalItems);
      setLoading(false);
    };
    const fetchDonors = async (page: number, size: number) => {
      const { data } = await getDonors(page, size);
      const { totalItems, donors } = data;
      setDonorItems(totalItems);
      setLoading(false);
    };
    const fetchBloodTypes = async () => {
      const { data } = await getBloodTypes();
      const { totalItems, bloodtypes } = data;
      setBloodTypes(bloodtypes);
      setBloodTypesItems(totalItems);
      setLoading(false);
    };
    fetchRequests();
    fetchDonors(0, donorItems);
    fetchBloodTypes();
  }, [donorItems]);
  return (
    <>
      {isLoading ? (
        <Progress />
      ) : (
        <div className={classes.root}>
          <Cards
            requestItems={requestItems}
            donorItems={donorItems}
            bloodtypeItems={bloodtypeItems}
          />
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Typography
                  variant="h6"
                  align="left"
                  style={{ marginBottom: 20 }}
                  gutterBottom
                >
                  Blood Level
                </Typography>
                <LevelGraph bloodtypes={bloodtypes} />
              </Paper>
            </Grid>
            <Grid item xs={3}></Grid>
          </Grid>
        </div>
      )}
    </>
  );
};

export default Home;
