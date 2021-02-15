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
import generatePDF from "../../services/singleDonorReport";

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

export default function DonorVIew(props: any) {
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
                    onClick={() => generatePDF(props.location.state.row)}
                    aria-label="report"
                  >
                    <AssignmentIcon fontSize="large" />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Container>
          <RenderDonor row={props.location.state.row} />
          <RenderRequests row={props.location.state.row} />
        </>
      ) : (
        <h4>Selecet donor</h4>
      )}
    </>
  );
}

const RenderRequests = ({ row }: any) => {
  const classes = useStyles();
  return (
    <>
      <h2>Requests Info...</h2>
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead className={classes.head}>
            <TableRow>
              <TableCell>Request ID</TableCell>
              <TableCell>Blood Type</TableCell>
              <TableCell align="left">amount</TableCell>
            </TableRow>
          </TableHead>
          {row.requests && (
            <TableBody>
              {row.requests.map((historyRow: any) => (
                <TableRow key={historyRow.requestId}>
                  <TableCell align="left" className={classes.uniqueName}>
                    {historyRow.requestId}
                  </TableCell>
                  <TableCell className={classes.uniqueName}>
                    {historyRow.bloodtypes.bloodname}
                  </TableCell>
                  <TableCell align="left">{historyRow.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </>
  );
};

const RenderDonor = ({ row }: any) => {
  console.log(row);
  const classes = useStyles();
  return (
    <>
      <h2>Donor Info...</h2>
      <TableContainer component={Paper}>
        <Table
          size="medium"
          className={classes.table}
          aria-label="a dense table"
        >
          <TableHead className={classes.head}>
            <TableRow>
              <TableCell>Donor Id</TableCell>
              <TableCell align="left">Donor Name</TableCell>
              <TableCell align="left">City</TableCell>
              <TableCell align="left">Contact</TableCell>
              <TableCell align="left">Gender</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key={row.donorId}>
              <TableCell
                component="th"
                scope="row"
                className={classes.uniqueName}
              >
                {row.donorId}
              </TableCell>
              <TableCell align="left" className={classes.uniqueName}>
                {row.firstname} {row.secondname} {row.lastname}
              </TableCell>
              <TableCell align="left" className={classes.uniqueName}>
                {row.city}
              </TableCell>
              <TableCell align="left" className={classes.uniqueName}>
                {row.contact}
              </TableCell>
              <TableCell align="left" className={classes.uniqueName}>
                {row.gender}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
