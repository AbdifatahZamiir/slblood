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
  deleteRequest,
  getRequests,
  postRequests,
  updateRequest,
} from "../../services/requestServices";
import { getBloodTypes } from "../../services/bloodtypeServices";
import { getDonors } from "../../services/donorServices";
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

const isSearched = (value: string) => ({ bloodtypes }: any) =>
  bloodtypes.examCode.toLowerCase().includes(value.toLowerCase());

export default function RequestTable() {
  const classes = useStyles();
  const [requests, setRequests] = useState<Array<{}>>([]);
  const [donors, setDonors] = useState<Array<{}>>([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState(null);
  const [value, setValue] = useState<string>("");
  const [bloodtypes, setBloodTypes] = useState<Array<{}>>([]);
  const [isLoading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [size, setSize] = useState(5);
  const [subItems, setSubItems] = useState(0);
  const [studItems, setStudItems] = useState(0);
  const [gradeItems, setGradeItems] = useState(0);

  useEffect(() => {
    const fetchrequests = async (page: number, size: number) => {
      const { data } = await getRequests(page, size);
      setTotalPages(data.totalPages);
      setTotalItems(data.totalItems);
      setRequests(data.requests);
      setLoading(false);
    };

    fetchrequests(page - 1, size);
  }, [page, size]);

  useEffect(() => {
    const fetchdonors = async (page: number, size: number) => {
      const { data } = await getDonors((page = 0), size);
      setStudItems(data.totalItems);
      setDonors(data.donors);
    };

    fetchdonors(page - 1, studItems);
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
    const fetchbloodtypes = async (page: number, size: number) => {
      const { data } = await getBloodTypes((page = 0), size);
      setGradeItems(data.totalItems);
      setBloodTypes(data.bloodtypes);
    };
    fetchbloodtypes(page - 1, gradeItems);
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
      const { data } = await postRequests(row);
      const newrequests = [...requests, data];
      setRequests(newrequests);
      handleClick("Sucessfully posted!");
    } catch (err) {
      handleClick("Sucessfully posted!");
      setErrors(err.message);
    }
  };
  const handleDelete = async (id: number) => {
    try {
      const clonerequests = [...requests];
      const newrequests = clonerequests.filter(
        (grade: any) => grade.gradeId !== id
      );
      setRequests(newrequests);
      await deleteRequest(id);
      handleClick("Sucessfully deleted!");
    } catch (err) {
      handleClick("Sucessfully deleted!");
      setErrors(err.message);
      const clonerequests = [...requests];
      setRequests(clonerequests);
    }
  };

  const handleUpdate = async ({ row, id, gradeData }: any) => {
    try {
      const { data } = await updateRequest({ row, id });
      const clonerequests = [...requests];
      const index = clonerequests.indexOf(gradeData);
      clonerequests[index] = { ...data };
      setRequests(clonerequests);
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
                  {requests && (
                    <TableBody>
                      {requests.filter(isSearched(value)).map((grade: any) => (
                        <TableRow key={grade.gradeId}>
                          <TableCell component="th" scope="row">
                            {grade.gradeId}
                          </TableCell>
                          <TableCell>
                            {grade.donors.firstname}{" "}
                            {grade.donors.secondname}{" "}
                            {grade.donors.lastname}
                          </TableCell>
                          <TableCell>{grade.subjects.subjectname}</TableCell>
                          <TableCell>{grade.bloodtypes.examCode}</TableCell>
                          <TableCell>{grade.grade}</TableCell>

                          <TableCell style={{ display: "flex" }}>
                            <GradePopForm
                              onSubmit={handleUpdate}
                              grade={grade}
                              donors={donors}
                              subjects={subjects}
                              bloodtypes={bloodtypes}
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
                donors={donors}
                subjects={subjects}
                bloodtypes={bloodtypes}
              />
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Fragment>
  );
}
