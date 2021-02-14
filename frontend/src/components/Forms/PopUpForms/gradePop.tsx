import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";
import EditIcon from "@material-ui/icons/Edit";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import GradeForm from "../gradeForm";
import { IconButton } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme) => ({
  editButton: {
    color: blue[600],
    cursor: `pointer`,
  },
}));

export default function GradePopForm({
  grade,
  onSubmit,
  students,
  subjects,
  exams,
}: any) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyles();
  return (
    <div>
      <Tooltip title="Edit">
        <IconButton aria-label="edit" onClick={handleClickOpen}>
          <EditIcon className={classes.editButton} />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Update Grade</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <GradeForm
              onSubmit={onSubmit}
              grade={grade}
              subjects={subjects}
              students={students}
              exams={exams}
              name="edit"
              onClick={handleClose}
            />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
