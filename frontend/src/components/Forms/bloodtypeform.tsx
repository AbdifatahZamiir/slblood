import React from "react";
// import { Form } from "../Formik/FormOfbloodtypes";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import { green, pink } from "@material-ui/core/colors";
import Container from "@material-ui/core/Container";
import { Field, Form, Formik, FormikProps } from "formik";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "100%",
      height: "10ch",
    },
  },
  color: {
    backgroundColor: green[600],
    color: theme.palette.getContrastText(pink[500]),
  },
}));

interface Props {
  onSubmit: (data: any) => void;
  bloodtype: any;
  name: string;
  onClick?: () => void;
}

const InputField = ({ field, form, ...props }: any) => {
  return <TextField {...props} {...field} />;
};

const BloodTypeForm: React.FC<Props> = ({ onSubmit, bloodtype, name, onClick }) => {
  const validationSchema: any = Yup.object().shape({
    bloodname: Yup.string().min(1).max(5).required("bloodtype Name is Required"),
  });

  const addValues = {
    bloodname: undefined,
  };

  const editValues = bloodtype && {
    bloodname: bloodtype.bloodname,
  };
  const values = name === "edit" ? editValues : addValues;
  const classes = useStyles();
  return (
    <Container>
      <Formik
        onSubmit={(data, { resetForm }) => {
          onSubmit({ row: data, id: bloodtype.bloodtypeId, bloodtypeData: bloodtype });
          if (name !== "edit") resetForm();
        }}
        initialValues={values}
        validationSchema={validationSchema}
      >
        {({ errors, touched, isValid }: FormikProps<any>) => (
          <Form className={classes.root}>
            <Box display="flex" p={1}>
              <Box p={1} flexGrow={1}>
                <div>
                  <Field
                    variant="outlined"
                    name="bloodname"
                    label="bloodtype Name"
                    helperText={
                      errors.bloodname && touched.bloodname
                        ? errors.bloodname
                        : null
                    }
                    error={touched.bloodname && Boolean(errors.bloodname)}
                    component={InputField}
                  />
                </div>
              </Box>
              <Box p={1}>
                <Button
                  variant="contained"
                  onClick={onClick}
                  className={classes.color}
                  type="submit"
                  disabled={!isValid}
                >
                  Submit
                </Button>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default BloodTypeForm;
