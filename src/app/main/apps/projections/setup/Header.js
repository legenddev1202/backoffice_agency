import FuseAnimate from '@fuse/core/FuseAnimate';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import React from 'react';

function Header(props) {
	return (
		<div className="flex flex-1 w-full items-center justify-between">
			<div className="flex items-center w-full justify-between">
				<div className="flex items-center">
					<FuseAnimate animation="transition.expandIn" delay={300}>
						<Icon className="text-32">shopping_basket</Icon>
					</FuseAnimate>
					<FuseAnimate animation="transition.slideLeftIn" delay={300}>
						<Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
							{props.title}
						</Typography>
					</FuseAnimate>
				</div>

				<FuseAnimate animation="transition.slideRightIn" delay={300}>
					<Button
						component={Link}
						className="whitespace-nowrap normal-case mr-5"
						variant="contained"
						color="secondary"
						onClick={() => props.handlePrint()}
					>
						<span className="hidden sm:flex">Print</span>
					</Button>
				</FuseAnimate>
			</div>
			{props.children}
		</div>
	);
}

export default Header;
