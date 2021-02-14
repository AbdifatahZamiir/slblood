import React from "react";
import { Field, Form, Formik, FormikProps } from "formik";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import { blue, pink } from "@material-ui/core/colors";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
	root: {
		"& > *": {
			margin: theme.spacing(1),
			width: "100%",
			height: "38ch",
		},
	},
	color: {
		backgroundColor: blue[600],
		color: theme.palette.getContrastText(pink[500]),
	},
	formControl: {
		marginRight: theme.spacing(1),
		minWidth: 200,
	},
}));

interface Props {
	onSubmit: (data: any) => void;
	name: string;
	donors: any;
	request?: any;
	bloodtypes: any;
	onClick?: () => void;
}

const RequestForm: React.FC<Props> = ({
	onSubmit,
	bloodtypes,
	name,
	request,
	donors,
	onClick,
}) => {
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
							{bloodtype.bloodtypeCode}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		);
	};
	const DonorField = ({ field, form, ...props }: any) => {
		return (
			<FormControl variant="outlined" className={classes.formControl}>
				<InputLabel id="demo-simple-select-outlined-label">
					donorId
				</InputLabel>
				<Select {...props} {...field}>
					{donors.map((donor: any) => (
						<MenuItem
							key={donor.donorId}
							value={donor.donorId}
						>
							{donor.firstname} {donor.secondname}{" "}
							{donor.lastname}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		);
	};

	const validationSchema: any = Yup.object({
		bloodtypeId: Yup.number().required("bloodtypeId is required"),
		donorId: Yup.number().required("donorId is required"),
		subjectId: Yup.number().required("subjectId is required"),
		amount: Yup.number().required("amount is required").max(100),
	});

	const addValues = {
		bloodtypeId: undefined,
		donorId: undefined,
		amount: undefined,
	};

	const editValues = request && {
		bloodtypeId: request.bloodtypeId,
		donorId: request.donorId,
		amount: request.amount,
	};
	const values = name === "edit" ? editValues : addValues;
	const classes = useStyles();
	return (
		<Formik
			onSubmit={(data, { resetForm }) => {
				onSubmit({
					row: data,
					id: request.requestId,
					requestData: request,
				});
				if (name !== "edit") resetForm();
			}}
			initialValues={values}
			validationSchema={validationSchema}
		>
			{({ errors, touched, isValid }: FormikProps<any>) => (
				<Form className={classes.root}>
					<Box display="flex" p={1}>
						<Box p={1} flexGrow={1}>
							<div
								style={{
									paddingBottom: "20px",
									paddingRight: "20px",
								}}
							>
								<Field
									labelId="bloodtypeId"
									name="bloodtypeId"
									id="bloodtypeId"
									label="bloodtypeId"
									component={BloodTypeField}
								/>
							</div>
							<div
								style={{
									paddingBottom: "20px",
									paddingRight: "20px",
								}}
							>
								<Field
									labelId="donorId"
									name="donorId"
									id="donorId"
									label="donorId"
									component={DonorField}
								/>
							</div>
							<div
								style={{
									paddingBottom: "20px",
									paddingRight: "20px",
								}}
							>
								<Field
									variant="outlined"
									name="request"
									label="request"
									type="number"
									helperText={
										errors.request && touched.request
											? errors.request
											: null
									}
									error={
										touched.request && Boolean(errors.request)
									}
									component={InputField}
								/>
							</div>
						</Box>
						<Box p={1}>
							<Button
								variant="contained"
								color="primary"
								className={classes.color}
								type="submit"
								onClick={onClick}
								disabled={!isValid}
							>
								Submit
							</Button>
						</Box>
					</Box>
				</Form>
			)}
		</Formik>
	);
};

export default RequestForm;
