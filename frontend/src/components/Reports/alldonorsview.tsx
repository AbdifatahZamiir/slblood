import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import { blue } from "@material-ui/core/colors";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import AssignmentIcon from "@material-ui/icons/Assignment";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Box, Container, IconButton, Tooltip } from "@material-ui/core";
import generatePDF from "../../services/donorReports";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  report: {
    margin: theme.spacing(1),
    color: blue[600],
    cursor: `pointer`,
  },
  head: {
    backgroundColor: `#f5f5f5`,
    color: theme.palette.common.white,
    fontStyle: "fontWeightBold",
  },
  uniqueName: {
    border: `1px solid rgba(224, 224, 224, 1)`,
  },
}));

export default function AlldonorView(props: any) {
  const classes = useStyles();
  return (
    <>
      {props.location.state !== undefined ? (
        <>
          <Container style={{ marginBottom: "-40px" }}>
            <Box display="flex" p={1}>
              <Box p={1} flexGrow={1}></Box>
              <Box p={1}>
                <Tooltip title="Create Report">
                  <IconButton
                    className={classes.report}
                    onClick={() => generatePDF(props.location.state.donors)}
                    aria-label="report"
                  >
                    <AssignmentIcon fontSize="large" />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Container>
          <RenderDOnors donors={props.location.state.donors} />
        </>
      ) : (
        <h4>Select Report</h4>
      )}
    </>
  );
}

const RenderDOnors = ({ donors }: any) => {
  const classes = useStyles();
  return (
    <>
      <h2>Donors Report</h2>
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead className={classes.head}>
            <TableRow>
              <TableCell>Donor ID</TableCell>
              <TableCell align="left">Donor Name</TableCell>
              <TableCell align="left">Contact</TableCell>
              <TableCell align="left">City</TableCell>
              <TableCell align="left">Gender</TableCell>
              <TableCell align="left">Aids</TableCell>
              <TableCell align="left">Weight</TableCell>
              <TableCell align="left">Pressure</TableCell>

            </TableRow>
          </TableHead>
          {donors && (
            <TableBody>
              {donors.map((donor: any) => (
                <TableRow key={donor.donorId}>
                  <TableCell align="left" className={classes.uniqueName}>
                    {donor.donorId}
                  </TableCell>
                  <TableCell className={classes.uniqueName}>
                    {donor.firstname} {donor.secondname} {donor.lastname}
                  </TableCell>
                  <TableCell className={classes.uniqueName}>
                    {donor.contact}
                  </TableCell>
                  <TableCell className={classes.uniqueName}>
                    {donor.city}
                  </TableCell>
                  <TableCell align="left">{donor.gender}</TableCell>
                  <TableCell align="left">{donor.aids}</TableCell>
                  <TableCell align="left">{donor.weight}</TableCell>
                  <TableCell align="left">{donor.pressure}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </>
  );
};
