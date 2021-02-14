import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import LoginForm from "../Forms/loginForm";
import auth from "../../services/authServices";
function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{"Copyright © "}
			{new Date().getFullYear()}
		</Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},

	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function SignIn() {
	const classes = useStyles();
	const [errors, setErrors] = useState(null);
	const [open, setOpen] = useState(false);

	function Alert(props: any) {
		return <MuiAlert elevation={6} variant="filled" {...props} />;
	}

	const handleClick = () => {
		setOpen(true);
	};

	const handleClose = (event: any, reason: any) => {
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
	};

	const handleSubmit = async (postdata: any) => {
		try {
			await auth.login(postdata);
			window.location.pathname = "/dashboard";
		} catch (error) {
			if (error.response && error.response.status === 400) {
				handleClick();
				setErrors(error.response.data);
			}
		}
	};
	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				{errors && (
					<Snackbar
						open={open}
						autoHideDuration={2000}
						onClose={handleClose}
					>
						<Alert onClose={handleClose} severity="error">
							{errors}
						</Alert>
					</Snackbar>
				)}
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<LoginForm onSubmit={handleSubmit} />
			</div>
			<Box mt={8}>
				<Copyright />
			</Box>
		</Container>
	);
}
