import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import { green, pink } from "@material-ui/core/colors";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import VisibilityIcon from "@material-ui/icons/Visibility";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import React from "react";
import StudentForm from "../Forms/donorForm";
import DeletePopUp from "../Forms/PopUpForms/deletePop";
import { Link } from "react-router-dom";
import auth from "../../services/authServices";
import Chip from "@material-ui/core/Chip";

const useRowStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  avatar: {
    color: theme.palette.getContrastText(pink[500]),
    backgroundColor: green[500],
  },
  greenLight: {
    color: green[600],
    height: "24px",
  },
  red: {
    backgroundColor: pink[500],
    color: theme.palette.getContrastText(pink[500]),
  },
  button: {
    cursor: `pointer`,
  },
}));

interface Props {
  key: number;
  bloodtypes: any;
  row: any;
  onDelete: (id: number) => void;
  onUpdate: (data: object) => void;
}

const Row: React.FC<Props> = (props) => {
  const { row, onDelete, bloodtypes, onUpdate } = props;
  const [open, setOpen] = React.useState<boolean>(false);
  const classes: any = useRowStyles();
  const { admin }: any = auth.getCurrentUser();

  return (
    <React.Fragment>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            className={classes.greenLight}
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>
          <Avatar aria-label="recipe" className={classes.avatar}>
            {row.firstname.charAt(0).toUpperCase()}
          </Avatar>
        </TableCell>
        <TableCell align="left">{row.firstname}</TableCell>
        <TableCell align="left">{row.secondname}</TableCell>
        <TableCell align="left">{row.lastname}</TableCell>
        <TableCell align="left">{row.city}</TableCell>
        <TableCell align="left">{row.gender}</TableCell>
        <TableCell align="left">
          {" "}
          <Chip label={row.bloodtypes.bloodname} className={classes.red} />
        </TableCell>
        {admin && (
          <TableCell style={{ display: "flex" }}>
            <StudentForm
              onSubmit={onUpdate}
              bloodtypes={bloodtypes}
              name="edit"
              row={row}
            />
            <DeletePopUp item={row.donorId} onDelete={onDelete} />
            <Tooltip title="View Report">
              <IconButton aria-label="report">
                <Link
                  className={classes.greenLight}
                  to={{
                    pathname: "/dashboard/donorview",
                    state: {
                      row,
                    },
                  }}
                >
                  <VisibilityIcon />
                </Link>
              </IconButton>
            </Tooltip>
          </TableCell>
        )}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Container style={{ width: "100%" }}>
                <Box display="flex" p={1}>
                  <Box p={1} flexGrow={1}>
                    <Typography variant="h6" gutterBottom component="div">
                      Requests
                    </Typography>
                  </Box>
                  <Box p={1}></Box>
                </Box>
              </Container>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Request ID</TableCell>
                    <TableCell>Blood Name</TableCell>
                    <TableCell align="left">Amount</TableCell>
                  </TableRow>
                </TableHead>
                {row.requests && (
                  <TableBody>
                    {row.requests.map((request: any) => (
                      <TableRow key={request.requestId}>
                        <TableCell align="left">{request.requestId}</TableCell>
                        <TableCell>{request.bloodtypes.bloodname}</TableCell>
                        <TableCell align="left">{request.amount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                )}
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default Row;
