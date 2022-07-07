import Icon from '@material-ui/core/Icon';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React from 'react';
import TextInput from '../../../components/LapseTextField';

function Widget10(props) {
	return (
		<Paper className="w-full rounded-8 shadow">
			<div className="flex items-center justify-between px-16 h-64 border-b-1">
				<Typography className="text-16">{props.title}</Typography>
			</div>
			<div className="table-responsive">
				<Table className="w-full min-w-full">
					<TableHead>
						<TableRow>
							{props.columns.map(column => (
								<TableCell key={column.id} className="text-xs p-5" align="center">
									{column.title}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{props.rows.map((cell, index) => (
							<TableRow key={index}>
								<>
									<TableCell component="th" scope="row" align="center" className="p-3">
										<Typography className={cell.classes}>{cell.name}</Typography>
									</TableCell>
									<TableCell component="th" scope="row" align="center" className="p-3">
										<Typography className={cell.classes}>{cell.percent}</Typography>
									</TableCell>
									<TableCell component="th" scope="row" align="center" className="p-3">
										<Typography className={cell.classes}>{cell.dollar}</Typography>
									</TableCell>
								</>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</Paper>
	);
}

export default React.memo(Widget10);
