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
	students: any;
	subjects: any;
	grade?: any;
	exams: any;
	onClick?: () => void;
}

const GradeForm: React.FC<Props> = ({
	onSubmit,
	exams,
	name,
	grade,
	subjects,
	students,
	onClick,
}) => {
	const InputField = ({ field, form, ...props }: any) => {
		return <TextField {...props} {...field} />;
	};
	const ExamField = ({ field, form, ...props }: any) => {
		return (
			<FormControl variant="outlined" className={classes.formControl}>
				<InputLabel id="demo-simple-select-outlined-label">
					examId
				</InputLabel>
				<Select {...props} {...field}>
					{exams.map((exam: any) => (
						<MenuItem key={exam.examId} value={exam.examId}>
							{exam.examCode}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		);
	};
	const StudentField = ({ field, form, ...props }: any) => {
		return (
			<FormControl variant="outlined" className={classes.formControl}>
				<InputLabel id="demo-simple-select-outlined-label">
					StudentId
				</InputLabel>
				<Select {...props} {...field}>
					{students.map((student: any) => (
						<MenuItem
							key={student.studentId}
							value={student.studentId}
						>
							{student.firstname} {student.secondname}{" "}
							{student.lastname}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		);
	};
	const SubjectField = ({ field, form, ...props }: any) => {
		return (
			<FormControl variant="outlined" className={classes.formControl}>
				<InputLabel id="demo-simple-select-outlined-label">
					SubjectId
				</InputLabel>
				<Select {...props} {...field}>
					{subjects.map((subject: any) => (
						<MenuItem
							key={subject.subjectId}
							value={subject.subjectId}
						>
							{subject.subjectname}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		);
	};
	const validationSchema: any = Yup.object({
		examId: Yup.number().required("examId is required"),
		studentId: Yup.number().required("studentId is required"),
		subjectId: Yup.number().required("subjectId is required"),
		grade: Yup.number().required("grade is required").max(100),
	});

	const addValues = {
		examId: undefined,
		studentId: undefined,
		subjectId: undefined,
		grade: undefined,
	};

	const editValues = grade && {
		examId: grade.examId,
		studentId: grade.studentId,
		subjectId: grade.subjectId,
		grade: grade.grade,
	};
	const values = name === "edit" ? editValues : addValues;
	const classes = useStyles();
	return (
		<Formik
			onSubmit={(data, { resetForm }) => {
				onSubmit({
					row: data,
					id: grade.gradeId,
					gradeData: grade,
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
									labelId="examId"
									name="examId"
									id="examId"
									label="examId"
									component={ExamField}
								/>
							</div>
							<div
								style={{
									paddingBottom: "20px",
									paddingRight: "20px",
								}}
							>
								<Field
									labelId="studentId"
									name="studentId"
									id="studentId"
									label="studentId"
									component={StudentField}
								/>
							</div>
							<div
								style={{
									paddingBottom: "20px",
									paddingRight: "20px",
								}}
							>
								<Field
									labelId="subjectId"
									name="subjectId"
									id="subjectId"
									label="SubjectId"
									component={SubjectField}
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
									name="grade"
									label="Grade"
									type="number"
									helperText={
										errors.grade && touched.grade
											? errors.grade
											: null
									}
									error={
										touched.grade && Boolean(errors.grade)
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

export default GradeForm;
