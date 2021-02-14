import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import { blue, pink, orange } from "@material-ui/core/colors";
import Person from "@material-ui/icons/Person";
import Paper from "@material-ui/core/Paper";
import SupervisedUserCircle from "@material-ui/icons/SupervisedUserCircle";
import LibraryBooks from "@material-ui/icons/LibraryBooks";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper,
	},
	paper: {
		padding: theme.spacing(1),
		textAlign: "left",
		color: theme.palette.text.secondary,
	},
	chip: {
		margin: theme.spacing(0.5),
	},
	orange: {
		backgroundColor: orange[500],
		color: theme.palette.getContrastText(pink[500]),
	},
	section1: {
		margin: theme.spacing(3, 2),
		color: theme.palette.getContrastText(blue[100]),
	},
	avatar1: {
		color: theme.palette.getContrastText(orange[800]),
		backgroundColor: orange[500],
		width: theme.spacing(7),
		height: theme.spacing(7),
	},
	avatar2: {
		color: theme.palette.getContrastText(pink[500]),
		backgroundColor: pink[500],
		width: theme.spacing(7),
		height: theme.spacing(7),
	},
	primary: {
		backgroundColor: blue[600],
		color: theme.palette.getContrastText(pink[500]),
	},
	avatar3: {
		color: theme.palette.getContrastText(pink[500]),
		backgroundColor: blue[600],
		width: theme.spacing(7),
		height: theme.spacing(7),
	},
	section2: {
		margin: theme.spacing(2),
	},
	section3: {
		margin: theme.spacing(3, 1, 1),
	},
}));

interface Props {
	donorItems: number;
	requestItems: number;
	bloodtypeItems: number;
}

export default function Cards(props: Props) {
	const classes = useStyles();

	return (
		<Grid container spacing={3}>
			{props && (
				<>
					<Grid item xs={4}>
						<Paper className={classes.paper}>
							<Chip label="Donors" className={classes.orange} />
							<div className={classes.root}>
								<div className={classes.section1}>
									<Grid container alignItems="center">
										<Grid item xs>
											<Typography
												gutterBottom
												variant="h5"
											>
												{props.donorItems}
											</Typography>
										</Grid>
										<Grid item>
											<Typography
												gutterBottom
												variant="h6"
											>
												<Avatar
													aria-label="recipe"
													className={classes.avatar1}
												>
													<Person />
												</Avatar>
											</Typography>
										</Grid>
									</Grid>
									<Typography
										color="textSecondary"
										variant="body2"
									></Typography>
								</div>
							</div>
						</Paper>
					</Grid>
					<Grid item xs={4}>
						<Paper className={classes.paper}>
							<Chip label="Blood Types" color="secondary" />
							<div className={classes.root}>
								<div className={classes.section1}>
									<Grid container alignItems="center">
										<Grid item xs>
											<Typography
												gutterBottom
												variant="h5"
											>
												{props.bloodtypeItems}
											</Typography>
										</Grid>
										<Grid item>
											<Typography
												gutterBottom
												variant="h6"
											>
												<Avatar
													aria-label="recipe"
													color="secondary"
													className={classes.avatar2}
												>
													<SupervisedUserCircle />
												</Avatar>
											</Typography>
										</Grid>
									</Grid>
									<Typography
										color="textSecondary"
										variant="body2"
									></Typography>
								</div>
							</div>
						</Paper>
					</Grid>
					<Grid item xs={4}>
						<Paper className={classes.paper}>
							<Chip
								label="Requests"
								className={classes.primary}
							/>
							<div className={classes.root}>
								<div className={classes.section1}>
									<Grid container alignItems="center">
										<Grid item xs>
											<Typography
												gutterBottom
												variant="h5"
											>
												{props.requestItems}
											</Typography>
										</Grid>
										<Grid item>
											<Typography
												gutterBottom
												variant="h6"
											>
												<Avatar
													aria-label="recipe"
													className={classes.avatar3}
												>
													<LibraryBooks />
												</Avatar>
											</Typography>
										</Grid>
									</Grid>
									<Typography
										color="textSecondary"
										variant="body2"
									></Typography>
								</div>
							</div>
						</Paper>
					</Grid>
				</>
			)}
		</Grid>
	);
}
