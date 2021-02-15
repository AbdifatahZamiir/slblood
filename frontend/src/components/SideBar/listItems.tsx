import React from "react";
import { Link } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
// import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import { makeStyles } from "@material-ui/core/styles";
import AssessmentIcon from "@material-ui/icons/Assessment";
import SupervisedUserCircle from "@material-ui/icons/SupervisedUserCircle";
import LineWeight from "@material-ui/icons/LineWeight";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import { green } from "@material-ui/core/colors";
// import AssignmentIcon from "@material-ui/icons/Assignment";
import SchoolIcon from "@material-ui/icons/School";

const useStyles = makeStyles((theme) => ({
	color: {
		color: green[500],
	},
}));

export const mainListItems = (
	<div>
		<ListItemLink
			to="/dashboard"
			primary="Dashboard"
			icon={<DashboardIcon />}
		/>
		<ListItemLink
			to="/dashboard/donors"
			primary="Donors"
			icon={<PeopleIcon />}
		/>
		<ListItemLink
			to="/dashboard/bloodtypes"
			primary="Blood Types"
			icon={<SupervisedUserCircle />}
		/>
		<ListItemLink
			to="/dashboard/requests"
			primary="Requests"
			icon={<LibraryBooks />}
		/>
	</div>
);

// export const secondaryListItems = (
// 	<div>
// <ListSubheader inset>Reports</ListSubheader>
// 		<ListItem button>
// 			<ListItemIcon>
// 				<AssignmentIcon />
// 			</ListItemIcon>
// 			<ListItemText primary="Create Report" />
// 		</ListItem>
// 	</div>
// );

type Props = {
	icon: JSX.Element;
	primary: string;
	to: string;
};

function ListItemLink(props: Props) {
	const { icon, primary, to } = props;
	const classes = useStyles();

	const CustomLink = React.useMemo(
		() =>
			React.forwardRef<HTMLAnchorElement>((linkProps, ref) => (
				<Link ref={ref} to={to} {...linkProps} />
			)),
		[to]
	);

	return (
		<li>
			<ListItem button component={CustomLink}>
				<ListItemIcon className={classes.color}>{icon}</ListItemIcon>
				<ListItemText primary={primary} />
			</ListItem>
		</li>
	);
}
