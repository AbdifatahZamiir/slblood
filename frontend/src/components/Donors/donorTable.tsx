import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { IconButton } from "@material-ui/core";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Tooltip from "@material-ui/core/Tooltip";
import Pagination from "@material-ui/lab/Pagination";
import { blue } from "@material-ui/core/colors";
import React, { useState, useEffect } from "react";
import StudentForm from "../Forms/studentForm";
import Row from "./row";
import {
	deleteStudent,
	getStudents,
	postStudents,
	updateStudent,
} from "../../services/studentServices";
import Progress from "../Loading/progress";
import { getTeachers } from "../../services/teacherServices";
import { getLevels } from "../../services/levelServices";
import Search from "../Search/search";
import SnackPar from "../Common/snackpar";
import FilterSize from "../Common/filter";
import { Link } from "react-router-dom";

const useRowStyles = makeStyles((theme) => ({
	root: {
		"& > *": {
			borderBottom: "unset",
		},
	},
	head: {
		backgroundColor: `#f5f5f5`,
		color: theme.palette.common.white,
		fontStyle: "fontWeightBold",
	},
	blueLight: {
		color: blue[600],
		height: "34px",
	},
	button: {
		cursor: `pointer`,
	},
	pagination: {
		margin: theme.spacing(2),
		marginTop: theme.spacing(5),
	},

	report: {
		margin: theme.spacing(1),
		color: blue[600],
		cursor: `pointer`,
	},
}));

const isSearched = (value: string) => ({ firstname }: any) =>
	firstname.toLowerCase().includes(value.toLowerCase());

export default function StudentTable() {
	const classes = useRowStyles();
	const [students, setStudentDatas] = useState<Array<{}>>([]);
	const [isLoading, setLoading] = useState(true);
	const [teacherDatas, setTeacherDatas] = useState<Array<{}>>([]);
	const [levelDatas, setLevelDatas] = useState<Array<{}>>([]);
	const [value, setValue] = useState<string>("");
	const [open, setOpen] = useState(false);
	const [errors, setErrors] = useState("");
	const [message, setMessage] = useState("");
	const [totalPages, setTotalPages] = useState(0);
	const [page, setPage] = useState(1);
	const [size, setSize] = useState(10);
	const [totalItems, setTotalItems] = useState(0);
	const [techItems, setTechItems] = useState(0);
	const [levItems, setLevItems] = useState(0);

	const handleSubmit = async ({ row }: any) => {
		try {
			const { data } = await postStudents(row);
			const newArray = [...students, data];
			setStudentDatas(newArray);
			handleClick("Sucessfully posted!");
		} catch (err) {
			handleClick("err!");
			setErrors(err.message);
		}
	};

	const handleUpdate = async ({ row, id, dataindex }: any) => {
		try {
			const { data } = await updateStudent({ row, id });
			const state = [...students];
			const index = state.indexOf(dataindex);
			state[index] = { ...data };
			setStudentDatas(state);
			handleClick("Sucessfully updated!");
		} catch (err) {
			handleClick("err!");
			setErrors(err.message);
		}
	};
	const fetchPaginatedData = (e: any, page: number) => {
		setPage(page);
	};

	const handleSize = (size: number) => {
		setSize(size);
		setPage(1);
	};

	const handleDelete = async (id: number) => {
		try {
			const newArray = students.filter(
				(student: any) => student.studentId !== id
			);
			setStudentDatas(newArray);
			await deleteStudent(id);
			handleClick("Sucessfully deleted!");
		} catch (err) {
			handleClick("err!");
			setErrors(err.message);
			const cloneStudents = [...students];
			setStudentDatas(cloneStudents);
		}
	};
	useEffect(() => {
		const fetchStudents = async (page: number, size: number) => {
			const { data } = await getStudents(page, size);
			setTotalItems(data.totalItems);
			setTotalPages(data.totalPages);
			setStudentDatas(data.students);
			setLoading(false);
		};
		fetchStudents(page - 1, size);
	}, [page, size]);

	useEffect(() => {
		const fetchTeachers = async (page: number, size: number) => {
			const { data } = await getTeachers((page = 0), size);
			setTechItems(data.totalItems);
			setTeacherDatas(data.teachers);
		};
		const fetchLevels = async (page: number, size: number) => {
			const { data } = await getLevels((page = 0), size);
			setLevItems(data.totalItems);
			setLevelDatas(data.levels);
		};

		fetchTeachers(page - 1, techItems);
		fetchLevels(page - 1, levItems);
	}, [page, techItems, levItems]);

	const handleChange = (e: any) => {
		if (e.target.value) {
			setValue(e.target.value);
			setSize(totalItems);
		} else {
			setValue(e.target.value);
			setSize(10);
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

	return (
		<>
			<SnackPar
				errors={errors}
				handleClose={handleClose}
				success={message}
				open={open}
			/>
			<Container style={{ width: "100%", marginBottom: 20 }}>
				<Box display="flex" p={1}>
					<Box p={1} flexGrow={1}>
						<Search
							value={value}
							onChange={handleChange}
							by="First Name"
						/>
					</Box>
					<Box p={2}>
						<FilterSize
							onSize={handleSize}
							totalItems={totalItems}
						/>
					</Box>
					<Box p={3}>
						<Tooltip title="View Report">
							<IconButton
								className={classes.report}
								aria-label="report"
							>
								<Link
									className={classes.blueLight}
									to={{
										pathname: "/dashboard/allstudentsview",
										state: {
											students,
										},
									}}
								>
									<VisibilityIcon fontSize="large" />
								</Link>
							</IconButton>
						</Tooltip>
					</Box>
					<Box p={1}>
						<Tooltip title="Add">
							<StudentForm
								onSubmit={handleSubmit}
								teachers={teacherDatas}
								levels={levelDatas}
								name="add"
								row="baylood"
							/>
						</Tooltip>
					</Box>
				</Box>
			</Container>
			{isLoading ? (
				<Progress />
			) : (
				<TableContainer component={Paper}>
					<Table aria-label="collapsible table">
						<TableHead className={classes.head}>
							<TableRow>
								<TableCell />
								<TableCell />
								<TableCell>Student ID</TableCell>
								<TableCell align="left">First Name</TableCell>
								<TableCell align="left">Second Name</TableCell>
								<TableCell align="left">Last Name</TableCell>
								<TableCell align="left">Country</TableCell>
								<TableCell align="left">Gender</TableCell>

								<TableCell
									style={{ paddingRight: 60 }}
									align="center"
								>
									Actions
								</TableCell>
							</TableRow>
						</TableHead>

						{students && (
							<TableBody>
								{students
									.filter(isSearched(value))
									.map((student: any) => (
										<Row
											onDelete={handleDelete}
											key={student.studentId}
											row={student}
											levels={levelDatas}
											teachers={teacherDatas}
											onUpdate={handleUpdate}
										/>
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
		</>
	);
}
