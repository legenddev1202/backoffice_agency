import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { formattedNumber } from '../../utils/Function';

export function Card(props) {
	return (
		<div>
			{props.title !== '' && (
				<div className="flex items-center justify-between px-8 pt-8">
					<Typography className="text-15 flex w-full" color="textPrimary">
						<span className="truncate">{props.title}</span>
					</Typography>
				</div>
			)}
			<div className="text-center pt-12 pb-28">
				<Typography className={`lg:text-32 md:text-24 sm:text-16 leading-none ${props.color}`}>
					{`${formattedNumber(props.count)} ${props.endAdornment}`}
				</Typography>
				{props.label !== '' && (
					<Typography className="text-12" color="textSecondary">
						{props.label}
					</Typography>
				)}
			</div>
		</div>
	);
}

function Widget1(props) {
	return (
		<Paper className="flex flex-col justify-center w-full rounded-8 shadow">
			{props.data.title !== '' && (
				<div className="flex items-center justify-center px-16 py-16">
					<Typography className="text-16 font-bold">{props.data.title}</Typography>
				</div>
			)}

			{props.type === 'One Number' && <Card {...props.data.cardData[0]} />}
			{props.type === 'Two Number' && (
				<div className="flex flex-wrap justify-around">
					<Card {...props.data.cardData[0]} />
					<Card {...props.data.cardData[1]} />
				</div>
			)}
			{props.type === 'Three Number' && (
				<div className="flex-wrap justify-around flex lg:flex-col">
					<Card {...props.data.cardData[0]} />
					<Card {...props.data.cardData[1]} />
					<Card {...props.data.cardData[2]} />
				</div>
			)}
			{props.data.subTitle !== '' && (
				<div className="flex items-center px-16 h-52 border-t-1">
					<Typography className="text-15 flex w-full" color="textSecondary">
						<span className="truncate">{props.data.subTitle}</span>
						<b className="px-8">{''}</b>
					</Typography>
				</div>
			)}
		</Paper>
	);
}

export default React.memo(Widget1);
