import FuseAnimate from '@fuse/core/FuseAnimate';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import React from 'react';

function Header(props) {
	return (
		<div className="flex flex-1 w-full items-center justify-between">
			{/* <div className="flex items-center"> */}
			<div className="flex flex-1 items-center justify-center px-12">
				<FuseAnimate animation="transition.expandIn" delay={300}>
					<Icon className="text-32">shopping_basket</Icon>
				</FuseAnimate>
				<FuseAnimate animation="transition.slideLeftIn" delay={300}>
					<Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
						{props.title}
					</Typography>
				</FuseAnimate>
			</div>
			{props.children}
		</div>
	);
}

export default Header;
