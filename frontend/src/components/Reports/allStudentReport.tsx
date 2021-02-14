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
import generatePDF from "../../services/studentReports";

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

export default function AllStudentView(props: any) {
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
                    onClick={() => generatePDF(props.location.state.students)}
                    aria-label="report"
                  >
                    <AssignmentIcon fontSize="large" />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Container>
          <RenderStudents students={props.location.state.students} />
        </>
      ) : (
        <h4>Select Report</h4>
      )}
    </>
  );
}

const RenderStudents = ({ students }: any) => {
  const classes = useStyles();
  return (
    <>
      <h2>Students Report</h2>
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead className={classes.head}>
            <TableRow>
              <TableCell>Student ID</TableCell>
              <TableCell align="left">Student Name</TableCell>
              <TableCell align="left">Contact</TableCell>
              <TableCell align="left">Country</TableCell>
              <TableCell align="left">Gender</TableCell>
            </TableRow>
          </TableHead>
          {students && (
            <TableBody>
              {students.map((student: any) => (
                <TableRow key={student.studentId}>
                  <TableCell align="left" className={classes.uniqueName}>
                    {student.studentId}
                  </TableCell>
                  <TableCell className={classes.uniqueName}>
                    {student.firstname} {student.secondname} {student.lastname}
                  </TableCell>
                  <TableCell className={classes.uniqueName}>
                    {student.contact}
                  </TableCell>
                  <TableCell className={classes.uniqueName}>
                    {student.country}
                  </TableCell>
                  <TableCell align="left">{student.gender}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </>
  );
};
