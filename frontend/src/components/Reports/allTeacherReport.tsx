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
import generatePDF from "../../services/teacherReport";

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

export default function AllTeacherView(props: any) {
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
                    onClick={() => generatePDF(props.location.state.teachers)}
                    aria-label="report"
                  >
                    <AssignmentIcon fontSize="large" />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Container>
          <RenderTeachers teachers={props.location.state.teachers} />
        </>
      ) : (
        <h4>Select Report</h4>
      )}
    </>
  );
}

const RenderTeachers = ({ teachers }: any) => {
  const classes = useStyles();
  return (
    <>
      <h2>Teachers Report</h2>
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead className={classes.head}>
            <TableRow>
              <TableCell>Teacher ID</TableCell>
              <TableCell align="left">Teacher Name</TableCell>
              <TableCell align="left">Contact</TableCell>
              <TableCell align="left">Gender</TableCell>
            </TableRow>
          </TableHead>
          {teachers && (
            <TableBody>
              {teachers.map((teacher: any) => (
                <TableRow key={teacher.teacherId}>
                  <TableCell align="left" className={classes.uniqueName}>
                    {teacher.teacherId}
                  </TableCell>
                  <TableCell className={classes.uniqueName}>
                    {teacher.firstname} {teacher.secondname} {teacher.lastname}
                  </TableCell>
                  <TableCell className={classes.uniqueName}>
                    {teacher.contact}
                  </TableCell>
                  <TableCell align="left">{teacher.gender}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </>
  );
};
