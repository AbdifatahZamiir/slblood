import React from "react";
import { Field, Form, Formik, FormikProps } from "formik";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import { green, pink } from "@material-ui/core/colors";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
	root: {
		"& > *": {
			margin: theme.spacing(1),
			width: "100%",
			height: "8ch",
		},
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},

	color: {
		backgroundColor: green[600],
		height: "6ch",
		color: theme.palette.getContrastText(pink[500]),
	},
}));

interface Props {
	onSubmit: (data: any) => void;
}

const InputField = ({ field, form, ...props }: any) => {
	return <TextField {...props} {...field} />;
};

const LoginForm: React.FC<Props> = ({ onSubmit }) => {
	const validationSchema: any = Yup.object({
		email: Yup.string().min(5).max(50).required().email(),
		password: Yup.string().min(5).max(50).required(),
	});

	const values = {
		email: undefined,
		password: undefined,
	};

	const classes = useStyles();
	return (
		<Container>
			<Formik
				onSubmit={(data, { resetForm }) => {
					onSubmit(data);
					resetForm();
				}}
				initialValues={values}
				validationSchema={validationSchema}
			>
				{({ errors, touched, isValid }: FormikProps<any>) => (
					<Form className={classes.root}>
						<Field
							variant="outlined"
							name="email"
							label="Email Address"
							helperText={
								errors.email && touched.email
									? errors.email
									: null
							}
							error={touched.email && Boolean(errors.email)}
							component={InputField}
						/>
						<Field
							variant="outlined"
							name="password"
							type="password"
							label="Password"
							helperText={
								errors.password && touched.password
									? errors.password
									: null
							}
							error={touched.password && Boolean(errors.password)}
							component={InputField}
						/>
						<Button
							variant="contained"
							color="primary"
							className={classes.color}
							type="submit"
							disabled={!isValid}
						>
							Sign In
						</Button>
					</Form>
				)}
			</Formik>
		</Container>
	);
};

export default LoginForm;
