import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

const useRowStyles = makeStyles((theme) => ({
	root: {
		"& > *": {
			borderBottom: "unset",
		},
	},
}));

interface Props {
	errors: any;
	open: boolean;
	success: string;
	handleClose: (event: any, reason: any) => void;
}
function Alert(props: any) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SnackPar = ({ errors, open, success, handleClose }: Props) => {
	const classes = useRowStyles();
	return (
		<div className={classes.root}>
			{errors ? (
				<Snackbar
					open={open}
					autoHideDuration={2000}
					onClose={handleClose}
				>
					<Alert onClose={handleClose} severity="error">
						{errors}
					</Alert>
				</Snackbar>
			) : (
				<Snackbar
					open={open}
					autoHideDuration={2000}
					onClose={handleClose}
				>
					<Alert onClose={handleClose} severity="success">
						{success}
					</Alert>
				</Snackbar>
			)}
		</div>
	);
};

export default SnackPar;
