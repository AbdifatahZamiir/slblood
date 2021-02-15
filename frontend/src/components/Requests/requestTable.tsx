import Box from "@material-ui/core/Box";
import { green, pink } from "@material-ui/core/colors";
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
import RequestForm from "../Forms/requestForm";
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
import RequestPopForm from "../Forms/PopUpForms/requestPop";
import FilterSize from "../Common/filter";
import Search from "../Search/search";
import DeletePopUp from "../Forms/PopUpForms/deletePop";
import auth from "../../services/authServices";
import moment from "moment";

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
    color: green[600],
    cursor: `pointer`,
  },
  fab: {
    margin: theme.spacing(2),
    color: theme.palette.getContrastText(pink[500]),
    backgroundColor: green[600],
  },
}));

const isSearched = (value: string) => ({ donors }: any) =>
  donors.contact.toLowerCase().includes(value.toLowerCase());

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
  const [donorItems, setDonorItems] = useState(0);
  const [bloodtypeItems, setBloodTypeItems] = useState(0);
  const { admin }: any = auth.getCurrentUser();
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
    const fetchDonors = async (page: number, size: number) => {
      const { data } = await getDonors((page = 0), size);
      setDonorItems(data.totalItems);
      setDonors(data.donors);
    };

    fetchDonors(page - 1, donorItems);
  }, [page, donorItems]);

  useEffect(() => {
    const fetchBloodTypes = async (page: number, size: number) => {
      const { data } = await getBloodTypes((page = 0), size);
      setBloodTypeItems(data.totalItems);
      setBloodTypes(data.bloodtypes);
    };
    fetchBloodTypes(page - 1, bloodtypeItems);
  }, [page, bloodtypeItems]);

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
        (request: any) => request.requestId !== id
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

  const handleUpdate = async ({ row, id, requestData }: any) => {
    try {
      const { data } = await updateRequest({ row, id });
      const clonerequests = [...requests];
      const index = clonerequests.indexOf(requestData);
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
            <Search value={value} onChange={handleChange} by="Phone Number" />
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
                      <TableCell>Donor Name</TableCell>
                      <TableCell>Blood Name</TableCell>
                      <TableCell>Phone Number</TableCell>
                      <TableCell>Donation Date</TableCell>
                      <TableCell>Amount</TableCell>

                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  {requests && (
                    <TableBody>
                      {requests
                        .filter(isSearched(value))
                        .map((request: any) => (
                          <TableRow key={request.requestId}>
                            <TableCell>
                              {request.donors.firstname}{" "}
                              {request.donors.secondname}{" "}
                              {request.donors.lastname}
                            </TableCell>
                            <TableCell>
                              {request.bloodtypes.bloodname}
                            </TableCell>
                            <TableCell>
                              {request.donors.contact}
                            </TableCell>
                            <TableCell>
                              {moment(request.donors.createdAt).format(
                                "DD/MM/YYYY"
                              )}
                            </TableCell>
                            <TableCell>{`${request.amount} unit`}</TableCell>

                            {admin && (
                              <TableCell style={{ display: "flex" }}>
                                <RequestPopForm
                                  onSubmit={handleUpdate}
                                  request={request}
                                  donors={donors}
                                  bloodtypes={bloodtypes}
                                />

                                <DeletePopUp
                                  item={request.requestId}
                                  onDelete={handleDelete}
                                />
                              </TableCell>
                            )}
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
              <h3>request Form</h3>
              <RequestForm
                onSubmit={handleSubmit}
                name="add"
                request="request"
                donors={donors}
                bloodtypes={bloodtypes}
              />
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Fragment>
  );
}
