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
import {
  getBloodTypes,
  postBloodTypes,
  deleteBloodtypes,
  updateBloodtypes,
} from "../../services/bloodtypeServices";
import BloodTypeForm from "../Forms/bloodtypeform";
import Progress from "../Loading/progress";
import BloodTypePopForm from "../Forms/PopUpForms/BloodTypePopForm";
import DeletePopUp from "../Forms/PopUpForms/deletePop";
import SnackPar from "../Common/snackpar";
import Search from "../Search/search";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "",
  },
  table: {
    minWidth: 100,
  },
  gridRoot: {
    flexGrow: 1,
  },

  paper: {
    padding: theme.spacing(2),
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

  fab: {
    margin: theme.spacing(2),
    color: theme.palette.getContrastText(pink[500]),
    backgroundColor: blue[600],
  },
}));

const isSearched = (value: string) => ({ bloodname }: any) =>
  bloodname.toLowerCase().includes(value.toLowerCase());

export function BloodTypeTable() {
  const classes = useStyles();
  const [bloodtypes, setBloodTypes] = useState<Array<{}>>([]);
  const [isLoading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const [value, setValue] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [size, setSize] = useState(5);

  useEffect(() => {
    const fetchBloodTypes = async (page: number, size: number) => {
      const { data } = await getBloodTypes(page, size);
      setTotalItems(data.totalItems);
      setTotalPages(data.totalPages);
      setBloodTypes(data.bloodtypes);
      setLoading(false);
    };
    fetchBloodTypes(page - 1, size);
  }, [page, size]);

  const handleSubmit = async ({ row }: any) => {
    try {
      const { data } = await postBloodTypes(row);
      const newbloodtypes = [...bloodtypes, data];
      setBloodTypes(newbloodtypes);
      handleClick("Sucessfully posted!");
    } catch (err) {
      handleClick("err!");
      setErrors(err.message);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const clonebloodtypes = [...bloodtypes];
      const newbloodtypes = clonebloodtypes.filter(
        (bloodtype: any) => bloodtype.bloodtypeId !== id
      );
      setBloodTypes(newbloodtypes);
      await deleteBloodtypes(id);
      handleClick("Sucessfully deleted!");
    } catch (err) {
      handleClick("err!");
      setErrors(err.message);
      const clonebloodtypes = [...bloodtypes];
      setBloodTypes(clonebloodtypes);
    }
  };
  const fetchPaginatedData = (e: any, page: number) => {
    setPage(page);
  };
  const handleUpdate = async ({ row, id, bloodtypeData }: any) => {
    try {
      const { data } = await updateBloodtypes({ row, id });
      const clonebloodtypes = [...bloodtypes];
      const index = clonebloodtypes.indexOf(bloodtypeData);
      clonebloodtypes[index] = { ...data };
      setBloodTypes(clonebloodtypes);
      handleClick("Sucessfully updated!");
    } catch (err) {
      handleClick("err!");
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

  // function Alert(props: any) {
  //   return <MuiAlert elevation={6} variant="filled" {...props} />;
  // }

  // const handleClick = () => {
  //   setOpen(true);
  // };

  // const handleClose = (event: any, reason: any) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }

  //   setOpen(false);
  // };

  return (
    <Fragment>
      <SnackPar
        errors={errors}
        handleClose={handleClose}
        success={message}
        open={open}
      />
      <Container style={{ width: "100%", marginBottom: 20 }}>
        <Box display="flex" p={1}>
          <Box p={1} flexGrow={1}>
            <Search value={value} onChange={handleChange} by="bloodtype Name" />
          </Box>
        </Box>
      </Container>

      <div className={classes.gridRoot}>
        <Grid container spacing={3}>
          <Grid item xs={5}>
            {isLoading ? (
              <Progress />
            ) : (
              <TableContainer component={Paper} className={classes.root}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead className={classes.head}>
                    <TableRow>
                      <TableCell>#ID</TableCell>
                      <TableCell>Blood Name</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  {bloodtypes && (
                    <TableBody>
                      {bloodtypes.filter(isSearched(value)).map((bloodtype: any) => (
                        <TableRow key={bloodtype.bloodtypeId}>
                          <TableCell component="th" scope="row">
                            {bloodtype.bloodtypeId}
                          </TableCell>
                          <TableCell>{bloodtype.bloodname}</TableCell>
                          <TableCell style={{ display: "flex" }}>
                            <BloodTypePopForm
                              onSubmit={handleUpdate}
                              bloodtype={bloodtype}
                            />

                            <DeletePopUp
                              item={bloodtype.bloodtypeId}
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
          <Grid item xs={7}>
            <Paper elevation={0} variant="outlined" className={classes.paper}>
              <h3>bloodtype Form</h3>
              <BloodTypeForm bloodtype="bloodtype" name="add" onSubmit={handleSubmit} />
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Fragment>
  );
}
