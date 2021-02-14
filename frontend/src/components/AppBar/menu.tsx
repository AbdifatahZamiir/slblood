import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import auth from "../../services/authServices";
import { Link } from "react-router-dom";

const ITEM_HEIGHT: number = 48;

export default function LongMenu() {
	const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
		null
	);
	const open: boolean = Boolean(anchorEl);

	const handleClick = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = (option: string) => {
		if (option === "logout") {
			auth.logout();
			window.location.pathname = "/signin";
			setAnchorEl(null);
		} else {
			setAnchorEl(null);
		}
	};

	return (
		<div>
			<IconButton
				aria-label="more"
				aria-controls="long-menu"
				aria-haspopup="true"
				color="inherit"
				onClick={handleClick}
			>
				<MoreVertIcon />
			</IconButton>
			<Menu
				id="long-menu"
				anchorEl={anchorEl}
				keepMounted
				open={open}
				onClose={handleClose}
				PaperProps={{
					style: {
						maxHeight: ITEM_HEIGHT * 4.5,
						width: "20ch",
					},
				}}
			>
				<Link
					to="/dashboard/profile"
					style={{
						textDecoration: "none",
						display: "block",
						color: "#000",
					}}
				>
					<MenuItem onClick={() => setAnchorEl(null)}>
						Profile
					</MenuItem>
				</Link>

				<MenuItem onClick={() => handleClose("logout")}>
					Log out
				</MenuItem>
			</Menu>
		</div>
	);
}
