import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
	header: {
		height: 600,
		background: `linear-gradient(to left, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
		color: theme.palette.primary.contrastText
	},
	cardHeader: {
		backgroundColor: theme.palette.primary[800],
		color: theme.palette.getContrastText(theme.palette.primary[800])
	}
}));

export default function SimpleCard(props) {
	const classes = useStyles();

	const [quantity, setQuantity] = useState(1);

	return (
		<Card className="rounded-8 mx-6 w-540">
			<div className={clsx(classes.cardHeader, 'px-24 py-16')}>
				<Typography variant="subtitle1" color="inherit">
					{props.item.interval === 'month' ? 'Monthly Plan' : 'Annual Plan'}
				</Typography>
			</div>

			<CardContent className="p-32">
				<div className="flex justify-center">
					<Typography variant="h5" color="textSecondary">
						$
					</Typography>
					<div className="flex items-end">
						<Typography className="text-72 mx-4 font-light leading-none">{props.price}</Typography>
						<Typography variant="subtitle1" color="textSecondary">
							/ {props.interval}
						</Typography>
					</div>
				</div>

				<Divider className="my-32" />

				<div className="flex flex-col">
					<Typography variant="subtitle1" color="textSecondary">
						$250 setup fee
					</Typography>

					<Typography variant="subtitle1" color="textSecondary">
						$25 monthly additional seat
					</Typography>

					{props.nickname && (
						<>
							<Typography variant="subtitle1" className="">
								Per Member
							</Typography>
							<TextField
								className="h-50"
								id="outlined-basic"
								label="Members"
								variant="outlined"
								// type="number"
								onChange={e => setQuantity(e.target.value)}
							/>
						</>
					)}
				</div>
			</CardContent>

			<div className="flex justify-center pb-32">
				<Button
					variant="contained"
					color="secondary"
					className="w-128"
					onClick={() => props.setBuy(props.token, props.item)}
				>
					Choose
				</Button>
			</div>
		</Card>
	);
}
