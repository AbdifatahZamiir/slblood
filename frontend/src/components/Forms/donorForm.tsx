import React from "react";
import * as Yup from "yup";
import { Field, Form, Formik, FormikProps } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import { green, pink } from "@material-ui/core/colors";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "35ch",
      height: "10ch",
    },
  },
  formControl: {
    marginRight: theme.spacing(1),
    minWidth: 200,
  },
  blueLight: {
    color: green[600],
  },
  selectEmpty: {
    marginTop: theme.spacing(1),
  },
  fab: {
    margin: theme.spacing(2),
    backgroundColor: green[600],
    color: theme.palette.getContrastText(pink[500]),
  },
}));

interface Props {
  bloodtypes: any;
  onSubmit: (data: any) => void;
  row?: any;
  name: string;
}

const DonorForm: React.FC<Props> = ({ bloodtypes, onSubmit, row, name }) => {
  const validationSchema: any = Yup.object({
    firstname: Yup.string().required("firstname is required"),
    secondname: Yup.string().required("secondname is required"),
    lastname: Yup.string().required("lastname is required"),
    city: Yup.string().required("city is required"),
    contact: Yup.number().required("contact is required"),
    bloodtypeId: Yup.number().required("bloodtype name is required"),
    gender: Yup.string().required("Gender is required"),
    weight: Yup.number().required().min(60),
    aids: Yup.string().required(),
    pressure: Yup.number().required().max(180)
  });
  const InputField = ({ field, form, ...props }: any) => {
    return <TextField {...props} {...field} />;
  };
  const BloodTypeField = ({ field, form, ...props }: any) => {
    return (
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">
          bloodtypeId
        </InputLabel>
        <Select {...props} {...field}>
          {bloodtypes.map((bloodtype: any) => (
            <MenuItem key={bloodtype.bloodtypeId} value={bloodtype.bloodtypeId}>
              {bloodtype.bloodname}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };

  const genderSelect = ({ field, form, ...props }: any) => {
    return (
      <FormControl component="fieldset">
        <FormLabel component="legend">Gender</FormLabel>
        <RadioGroup {...props} {...field}>
          {["male", "female"].map((option) => (
            <div>
              <FormControlLabel
                value={option}
                control={<Radio />}
                label={option}
              />
            </div>
          ))}
        </RadioGroup>
      </FormControl>
    );
  };
  const AidsSelect = ({ field, form, ...props }: any) => {
    return (
      <FormControl component="fieldset">
        <FormLabel component="legend">Aids</FormLabel>
        <RadioGroup {...props} {...field}>
          {["negative", "positive"].map((option) => (
            <div>
              <FormControlLabel
                value={option}
                control={<Radio />}
                label={option}
              />
            </div>
          ))}
        </RadioGroup>
      </FormControl>
    );
  };
  const addValues = {
    firstname: "",
    secondname: "",
    lastname: "",
    weight: undefined,
    pressure: undefined,
    aids: "",
    city: "",
    contact: undefined,
    gender: "",
    bloodtypeId: undefined,
  };

  const editValues = row && {
    firstname: row.firstname,
    secondname: row.secondname,
    lastname: row.lastname,
    weight: row.weight,
    pressure: row.pressure,
    aids: row.aids,
    city: row.city,
    contact: row.contact,
    gender: row.gender,
    bloodtypeId: row.bloodtypeId,
  };

  const values = name === "edit" ? editValues : addValues;
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <div>
        {name === "edit" ? (
          <Tooltip title="Edit">
            <IconButton onClick={handleClickOpen} aria-label="edit">
              <EditIcon className={classes.blueLight} />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Add" aria-label="add">
            <Fab
              className={classes.fab}
              color="secondary"
              onClick={handleClickOpen}
            >
              <AddIcon />
            </Fab>
          </Tooltip>
        )}
        <Dialog
          maxWidth="md"
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Donor Form</DialogTitle>
          <DialogContent>
            <DialogContentText>Fill Donor Information</DialogContentText>
            <Formik
              onSubmit={(data, { resetForm }) => {
                onSubmit({ row: data, id: row.donorId, dataindex: row });
                if (name !== "edit") resetForm();
              }}
              initialValues={values}
              validationSchema={validationSchema}
            >
              {({ errors, touched, isValid }: FormikProps<any>) => (
                <Form className={classes.root}>
                  <Field
                    variant="outlined"
                    name="firstname"
                    label="First Name"
                    helperText={
                      errors.firstname && touched.firstname
                        ? errors.firstname
                        : null
                    }
                    error={touched.firstname && Boolean(errors.firstname)}
                    component={InputField}
                  />
                  <Field
                    variant="outlined"
                    name="secondname"
                    label="Second Name"
                    helperText={
                      errors.secondname && touched.secondname
                        ? errors.secondname
                        : null
                    }
                    error={touched.secondname && Boolean(errors.secondname)}
                    component={InputField}
                  />
                  <Field
                    variant="outlined"
                    name="lastname"
                    label="Last Name"
                    helperText={
                      errors.lastname && touched.lastname
                        ? errors.lastname
                        : null
                    }
                    error={touched.lastname && Boolean(errors.lastname)}
                    component={InputField}
                  />
                  <Field
                    variant="outlined"
                    name="city"
                    label="city"
                    helperText={
                      errors.city && touched.city ? errors.city : null
                    }
                    error={touched.city && Boolean(errors.city)}
                    component={InputField}
                  />
                  <Field
                    variant="outlined"
                    name="contact"
                    label="Contact"
                    helperText={
                      errors.contact && touched.contact ? errors.contact : null
                    }
                    error={touched.contact && Boolean(errors.contact)}
                    component={InputField}
                  />
                  <Field
                    labelId="gender"
                    name="gender"
                    id="gender"
                    label="Gender"
                    component={genderSelect}
                  />
                  <Field
                    labelId="aids"
                    name="aids"
                    id="aids"
                    label="Aids"
                    helperText={
                      errors.aids && touched.aids ? errors.aids : null
                    }
                    error={touched.aids && Boolean(errors.aids)}
                    component={AidsSelect}
                  />
                  <Field
                    labelId="bloodtypeId"
                    name="bloodtypeId"
                    id="bloodtypeId"
                    label="bloodtypeId"
                    component={BloodTypeField}
                  />
                  <Field
                    labelId="weight"
                    variant="outlined"
                    name="weight"
                    id="weight"
                    type="number"
                    label="weight"
                    helperText={
                      errors.weight && touched.weight ? errors.weight : null
                    }
                    error={touched.weight && Boolean(errors.weight)}
                    component={InputField}
                  />
                  <Field
                    labelId="pressure"
                    variant="outlined"
                    name="pressure"
                    id="pressure"
                    type="number"
                    label="pressure"
                    helperText={
                      errors.pressure && touched.pressure
                        ? errors.pressure
                        : null
                    }
                    error={touched.pressure && Boolean(errors.pressure)}
                    component={InputField}
                  />
                  <DialogActions>
                    <Button onClick={handleClose} color="primary">
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={!isValid}
                      onClick={handleClose}
                      color="primary"
                    >
                      Submit
                    </Button>
                  </DialogActions>
                </Form>
              )}
            </Formik>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default DonorForm;
