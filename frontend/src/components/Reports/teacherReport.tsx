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
import generateTeacherPDF from "../../services/singleTeacherReport";

const useStyles = makeStyles((theme) => ({
  table: {
    width: "99.9999%",
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

export default function TeacherView(props: any) {
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
                    onClick={() =>
                      generateTeacherPDF(props.location.state.teacher)
                    }
                    aria-label="report"
                  >
                    <AssignmentIcon fontSize="large" />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Container>
          <RenderTeacher teacher={props.location.state.teacher} />
          <RenderStudents teacher={props.location.state.teacher} />
        </>
      ) : (
        <h4>Selecet student</h4>
      )}
    </>
  );
}

const RenderStudents = ({ teacher }: any) => {
  const classes = useStyles();
  return (
    <>
      <h2>Student Info...</h2>
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead className={classes.head}>
            <TableRow>
              <TableCell>Student ID</TableCell>
              <TableCell>Student Name</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell align="left">Gender</TableCell>
            </TableRow>
          </TableHead>
          {teacher.students && (
            <TableBody>
              {teacher.students.map((historyRow: any) => (
                <TableRow key={historyRow.studentId}>
                  <TableCell align="left" className={classes.uniqueName}>
                    {historyRow.studentId}
                  </TableCell>
                  <TableCell className={classes.uniqueName}>
                    {historyRow.firstname} {historyRow.secondname}{" "}
                    {historyRow.lastname}
                  </TableCell>
                  <TableCell className={classes.uniqueName}>
                    {historyRow.country}
                  </TableCell>
                  <TableCell className={classes.uniqueName}>
                    {historyRow.contact}
                  </TableCell>
                  <TableCell align="left">{historyRow.gender}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </>
  );
};

const RenderTeacher = ({ teacher }: any) => {
  const classes = useStyles();
  return (
    <>
      <h2>Teacher Info...</h2>
      <TableContainer component={Paper}>
        <Table
          size="medium"
          className={classes.table}
          aria-label="a dense table"
        >
          <TableHead className={classes.head}>
            <TableRow>
              <TableCell>Teacher Id</TableCell>
              <TableCell align="left">Teacher Name</TableCell>
              <TableCell align="left">Contact</TableCell>
              <TableCell align="left">Gender</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key={teacher.teacherId}>
              <TableCell
                component="th"
                scope="row"
                className={classes.uniqueName}
              >
                {teacher.teacherId}
              </TableCell>
              <TableCell align="left" className={classes.uniqueName}>
                {teacher.firstname} {teacher.secondname} {teacher.lastname}
              </TableCell>
              <TableCell align="left" className={classes.uniqueName}>
                {teacher.contact}
              </TableCell>
              <TableCell align="left" className={classes.uniqueName}>
                {teacher.gender}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
