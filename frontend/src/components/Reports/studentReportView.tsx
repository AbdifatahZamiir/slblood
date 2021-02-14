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
import generatePDF from "../../services/singleStudentReport";

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

export default function StudentView(props: any) {
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
          <RenderStudent row={props.location.state.row} />
          <RenderGrades row={props.location.state.row} />
        </>
      ) : (
        <h4>Selecet student</h4>
      )}
    </>
  );
}

const RenderGrades = ({ row }: any) => {
  console.log(row);
  const classes = useStyles();
  return (
    <>
      <h2>Grades Info...</h2>
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead className={classes.head}>
            <TableRow>
              <TableCell>Grade ID</TableCell>
              <TableCell>Subject Name</TableCell>
              <TableCell>Exam Code</TableCell>
              <TableCell align="left">Grade(%)</TableCell>
            </TableRow>
          </TableHead>
          {row.grades && (
            <TableBody>
              {row.grades.map((historyRow: any) => (
                <TableRow key={historyRow.gradeId}>
                  <TableCell align="left" className={classes.uniqueName}>
                    {historyRow.gradeId}
                  </TableCell>
                  <TableCell className={classes.uniqueName}>
                    {historyRow.subjects.subjectname}
                  </TableCell>
                  <TableCell className={classes.uniqueName}>
                    {historyRow.exams.examCode}
                  </TableCell>
                  <TableCell align="left">{historyRow.grade}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </>
  );
};

const RenderStudent = ({ row }: any) => {
  console.log(row);
  const classes = useStyles();
  return (
    <>
      <h2>Student Info...</h2>
      <TableContainer component={Paper}>
        <Table
          size="medium"
          className={classes.table}
          aria-label="a dense table"
        >
          <TableHead className={classes.head}>
            <TableRow>
              <TableCell>Student Id</TableCell>
              <TableCell align="left">Student Name</TableCell>
              <TableCell align="left">Country</TableCell>
              <TableCell align="left">Contact</TableCell>
              <TableCell align="left">Gender</TableCell>
              <TableCell align="left">Teacher</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key={row.studentId}>
              <TableCell
                component="th"
                scope="row"
                className={classes.uniqueName}
              >
                {row.studentId}
              </TableCell>
              <TableCell align="left" className={classes.uniqueName}>
                {row.firstname} {row.secondname} {row.lastname}
              </TableCell>
              <TableCell align="left" className={classes.uniqueName}>
                {row.country}
              </TableCell>
              <TableCell align="left" className={classes.uniqueName}>
                {row.contact}
              </TableCell>
              <TableCell align="left" className={classes.uniqueName}>
                {row.gender}
              </TableCell>
              <TableCell align="left">
                {row.teachers.firstname} {row.teachers.secondname}
                {row.teachers.lastname}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
