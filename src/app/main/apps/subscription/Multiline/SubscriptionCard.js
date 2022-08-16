import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React, { useState, useEffect } from 'react';
import moment from 'moment';
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
	},
	cardCurrentHeader: {
		backgroundColor: theme.palette.secondary.dark,
		color: theme.palette.getContrastText(theme.palette.primary[800])
	}
}));

export default function SimpleCard(props) {
	const classes = useStyles();

	const [quantity, setQuantity] = useState(props.quantity);

	useEffect(() => {
		if (props.secondSubscription) {
			setQuantity(props.secondSubscription.quantity);
		}
	}, [props.secondSubscription]);

	return (
		<Card className="rounded-8 mx-6">
			<div className={clsx(classes.cardCurrentHeader, 'px-24 py-16')}>
				<Typography variant="subtitle1" color="inherit">
					CURRENT PLAN
				</Typography>
			</div>

			<CardContent className="p-32">
				<div className="flex justify-center">
					<Typography variant="h5" color="textSecondary">
						$
					</Typography>
					<div className="flex items-end">
						{Object.keys(props.currentSubscription).length > 0 && (
							<>
								<Typography className="text-72 mx-4 font-light leading-none">
									{props.currentSubscription.items.data[0].plan.amount / 100}
								</Typography>

								<Typography variant="subtitle1" color="textSecondary">
									/
									{`${props.currentSubscription.items.data[0].plan.interval_count 
										} ${ 
										props.currentSubscription.items.data[0].plan.interval}`}
								</Typography>
							</>
						)}
					</div>
				</div>
				{/* {Object.keys(props.currentSubscription).length > 0 && props.currentSubscription.items.data.length > 1 && ( */}
				<div className="flex items-center">
				<Typography variant="subtitle1" className="">
						(
					</Typography>
					<TextField
						className="h-50"
						id="outlined-basic"
						// label="Members"
						variant="outlined"
						// type="number"
						value={quantity}
						onChange={e => setQuantity(quantity)}
					/>
					<Typography variant="subtitle1" className="">
						/4 seats) * ($25 / 4 seats)
					</Typography>
				</div>
				{/* )} */}

				<Divider className="my-32" />

				<div className="flex flex-col">
					{/* {!props.nickname && (
						<>
							<Typography variant="subtitle1" className="">
								Can Manage 4 Memebers
							</Typography>
						</>
					)} */}
					{Object.keys(props.currentSubscription).length > 0 && (
						<Typography variant="subtitle1" className="">
							{props.state?`Next Payment Date: ${moment
								.unix(props.currentSubscription.current_period_end)
								.format('DD-MM-YYYY')}`:`End date: ${moment
									.unix(props.currentSubscription.current_period_end)
									.format('DD-MM-YYYY')}`}
						</Typography>
					)}
				</div>
			</CardContent>

			<div className="flex justify-center pb-32">
				{props.active && (
					<Button
						variant="contained"
						color="secondary"
						className="w-128 mr-5"
						onClick={() => {
							props.handleClickOpen(props.secondSubscription.id, props.currentSubscription.id);
						}}
					>
						Cancel Plan
					</Button>
				)}
				{props.active && (
					<Button
						variant="contained"
						color="secondary"
						className="w-128"
						onClick={() => {
							if (quantity > 0) props.setBuy(props.secondSubscription, (Math.round(parseInt(quantity, 10)/4)*(25/4)*100)/100);
						}}
					>
						Update Plan
					</Button>
				)}

				{!props.active && (
					<Button
						variant="contained"
						color="secondary"
						className="w-128"
						onClick={() => {
							if (quantity > 0) props.resumePlan(quantity);
						}}
					>
						Resume Subscription
					</Button>
				)}
			</div>
		</Card>
	);
}
