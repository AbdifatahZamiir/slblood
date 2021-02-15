import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  button: {
    cursor: `pointer`,
  },
}));

interface Props {
  item: number;
  onDelete: (id: number) => void;
}
export default function DeletePopUp({ item, onDelete }: Props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDelete = (item: number) => {
    onDelete(item);
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Tooltip title="Delete">
        <IconButton aria-label="delete" onClick={handleClickOpen}>
          <DeleteIcon color="secondary" className={classes.button} />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Ma Hubtaa inaad masaxdo`}
        </DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => handleDelete(item)}
            color="secondary"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
