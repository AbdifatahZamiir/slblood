import Box from "@material-ui/core/Box";
import { blue, pink } from "@material-ui/core/colors";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Pagination from "@material-ui/lab/Pagination";
import React, { Fragment, useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import GradeForm from "../Forms/gradeForm";
import Progress from "../Loading/progress";
import {
  deleteGrade,
  getGrades,
  postGrade,
  updateGrade,
} from "../../services/gradeServices";
import { getExams } from "../../services/examServices";
import { getStudents } from "../../services/studentServices";
import { getSubjects } from "../../services/subjectService";
import SnackPar from "../Common/snackpar";
import GradePopForm from "../Forms/PopUpForms/gradePop";
import FilterSize from "../Common/filter";
import Search from "../Search/search";
import DeletePopUp from "../Forms/PopUpForms/deletePop";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "table-cell",
  },
  table: {
    minWidth: 200,
  },
  gridRoot: {
    flexGrow: 1,
  },

  paper: {
    padding: theme.spacing(3),
    textAlign: "left",
    color: theme.palette.text.secondary,
  },
  button: {
    cursor: `pointer`,
  },
  head: {
    backgroundColor: `#f5f5f5`,
    color: theme.palette.common.white,
    fontStyle: "fontWeightBold",
  },
  pagination: {
    margin: theme.spacing(2),
    marginTop: theme.spacing(5),
  },

  editButton: {
    color: blue[600],
    cursor: `pointer`,
  },
  fab: {
    margin: theme.spacing(2),
    color: theme.palette.getContrastText(pink[500]),
    backgroundColor: blue[600],
  },
}));

const isSearched = (value: string) => ({ exams }: any) =>
  exams.examCode.toLowerCase().includes(value.toLowerCase());

export default function GradeTable() {
  const classes = useStyles();
  const [grades, setGrades] = useState<Array<{}>>([]);
  const [subjects, setSubjects] = useState<Array<{}>>([]);
  const [students, setStudents] = useState<Array<{}>>([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState(null);
  const [value, setValue] = useState<string>("");
  const [exams, setExams] = useState<Array<{}>>([]);
  const [isLoading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [size, setSize] = useState(5);
  const [subItems, setSubItems] = useState(0);
  const [studItems, setStudItems] = useState(0);
  const [gradeItems, setGradeItems] = useState(0);

  useEffect(() => {
    const fetchGrades = async (page: number, size: number) => {
      const { data } = await getGrades(page, size);
      setTotalPages(data.totalPages);
      setTotalItems(data.totalItems);
      setGrades(data.grades);
      setLoading(false);
    };

    fetchGrades(page - 1, size);
  }, [page, size]);

  useEffect(() => {
    const fetchStudents = async (page: number, size: number) => {
      const { data } = await getStudents((page = 0), size);
      setStudItems(data.totalItems);
      setStudents(data.students);
    };

    fetchStudents(page - 1, studItems);
  }, [page, studItems]);

  useEffect(() => {
    const fetchSubjects = async (page: number, size: number) => {
      const { data } = await getSubjects((page = 0), size);
      setSubItems(data.totalItems);
      setSubjects(data.subjects);
    };
    fetchSubjects(page - 1, subItems);
  }, [page, subItems]);

  useEffect(() => {
    const fetchExams = async (page: number, size: number) => {
      const { data } = await getExams((page = 0), size);
      setGradeItems(data.totalItems);
      setExams(data.exams);
    };
    fetchExams(page - 1, gradeItems);
  }, [page, gradeItems]);

  const fetchPaginatedData = (e: any, page: number) => {
    setPage(page);
  };
  const handleSize = (size: number) => {
    setSize(size);
    setPage(1);
  };

  const handleSubmit = async ({ row }: any) => {
    console.log(row);
    try {
      const { data } = await postGrade(row);
      const newGrades = [...grades, data];
      setGrades(newGrades);
      handleClick("Sucessfully posted!");
    } catch (err) {
      handleClick("Sucessfully posted!");
      setErrors(err.message);
    }
  };
  const handleDelete = async (id: number) => {
    try {
      const cloneGrades = [...grades];
      const newGrades = cloneGrades.filter(
        (grade: any) => grade.gradeId !== id
      );
      setGrades(newGrades);
      await deleteGrade(id);
      handleClick("Sucessfully deleted!");
    } catch (err) {
      handleClick("Sucessfully deleted!");
      setErrors(err.message);
      const cloneGrades = [...grades];
      setGrades(cloneGrades);
    }
  };

  const handleUpdate = async ({ row, id, gradeData }: any) => {
    try {
      const { data } = await updateGrade({ row, id });
      const cloneGrades = [...grades];
      const index = cloneGrades.indexOf(gradeData);
      cloneGrades[index] = { ...data };
      setGrades(cloneGrades);
      handleClick("Sucessfully updated!");
    } catch (err) {
      handleClick("Sucessfully updated!");
      setErrors(err.message);
    }
  };

  const handleClick = (msg: string) => {
    setMessage(msg);
    setOpen(true);
  };

  const handleClose = (event: any, reason: any) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const handleChange = (e: any) => {
    if (e.target.value) {
      setValue(e.target.value);
      setSize(totalItems);
    } else {
      setValue(e.target.value);
      setSize(5);
    }
  };

  return (
    <Fragment>
      <SnackPar
        errors={errors}
        handleClose={handleClose}
        success={message}
        open={open}
      />
      <Container style={{ width: "100%", marginBottom: 10 }}>
        <Box display="flex" p={1}>
          <Box p={1} flexGrow={1}>
            <Search value={value} onChange={handleChange} by="Exam Code" />
          </Box>
          <Box p={0}>
            <FilterSize onSize={handleSize} totalItems={totalItems} />
          </Box>
        </Box>
      </Container>

      <div className={classes.gridRoot}>
        <Grid container spacing={1}>
          <Grid item xs={7}>
            {isLoading ? (
              <Progress />
            ) : (
              <TableContainer component={Paper} className={classes.root}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead className={classes.head}>
                    <TableRow>
                      <TableCell>Grade ID</TableCell>
                      <TableCell>Student Name</TableCell>
                      <TableCell>Subject Name</TableCell>
                      <TableCell>Exam Code</TableCell>
                      <TableCell>Grade</TableCell>

                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  {grades && (
                    <TableBody>
                      {grades.filter(isSearched(value)).map((grade: any) => (
                        <TableRow key={grade.gradeId}>
                          <TableCell component="th" scope="row">
                            {grade.gradeId}
                          </TableCell>
                          <TableCell>
                            {grade.students.firstname}{" "}
                            {grade.students.secondname}{" "}
                            {grade.students.lastname}
                          </TableCell>
                          <TableCell>{grade.subjects.subjectname}</TableCell>
                          <TableCell>{grade.exams.examCode}</TableCell>
                          <TableCell>{grade.grade}</TableCell>

                          <TableCell style={{ display: "flex" }}>
                            <GradePopForm
                              onSubmit={handleUpdate}
                              grade={grade}
                              students={students}
                              subjects={subjects}
                              exams={exams}
                            />

                            <DeletePopUp
                              item={grade.gradeId}
                              onDelete={handleDelete}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            )}
            {totalPages !== 0 ? (
              <Pagination
                className={classes.pagination}
                count={totalPages}
                page={page}
                onChange={fetchPaginatedData}
                color="primary"
              />
            ) : null}
          </Grid>
          <Grid item xs={5}>
            <Paper elevation={0} variant="outlined" className={classes.paper}>
              <h3>Grade Form</h3>
              <GradeForm
                onSubmit={handleSubmit}
                name="add"
                grade="grade"
                students={students}
                subjects={subjects}
                exams={exams}
              />
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Fragment>
  );
}
