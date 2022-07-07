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

	return (
		<Card className="rounded-8 mx-6 mt-5 min-w-sm">
			<div className={clsx(classes.cardCurrentHeader, 'px-24 py-16')}>
				<Typography variant="subtitle1" color="inherit">
					My Payment Info
				</Typography>
			</div>

			<CardContent className="p-32">
				<div className="flex flex-col">
					<Typography variant="subtitle1" className="">
						{`Name: ${props.name}`}
					</Typography>
					<Typography variant="subtitle1" className="">
						{`${props.brand}: ****${props.visa}`}
					</Typography>
				</div>
			</CardContent>
		</Card>
	);
}
