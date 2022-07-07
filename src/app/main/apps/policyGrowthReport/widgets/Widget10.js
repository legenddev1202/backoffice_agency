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
						{Object.keys(props.rows).map((firstKey, index) => (
							<TableRow key={index}>
								{Object.keys(props.rows[firstKey]).map((monthKey, i) => {
									let cell = props.rows[firstKey][monthKey];
									// console.log('----------', cell);
									if (
										props.title === 'Policy Count' &&
										(i === 1 || i === 2 || i === 3 || i === 4 || i === 6)
									) {
										return (
											<TableCell
												key={cell.id}
												component="th"
												scope="row"
												align="center"
												className={`p-0 ${index === 0 && `border-b-4 border-gray-500`} ${
													i === 6 && `border-l-4 border-gray-500`
												}`}
											>
												<TextInput
													id="outlined-basic"
													label=""
													variant="outlined"
													value={cell.value}
													validation="percentOfSaleCredit"
													// type="number"
													onChange={props.handleChangeValue}
													willvalidation={false}
													validate={false}
													size={65}
													month={firstKey}
													field={cell.id}
													title={props.title}
												/>
											</TableCell>
										);
									}
									if (props.title === 'Number Change' || props.title === 'Percent Change') {
										return (
											<TableCell
												key={cell.id}
												component="th"
												scope="row"
												align="center"
												className={`p-9 ${index === 0 && `border-b-4 border-gray-500`} ${
													i === 6 && `border-l-4 border-gray-500`
												}`}
											>
												<Typography className={cell.classes}>
													{cell.value === '31-Dec' ? 'YTD' : cell.value}
												</Typography>
											</TableCell>
										);
									}
									return (
										<TableCell
											key={cell.id}
											component="th"
											scope="row"
											align="center"
											className={`p-9 ${index === 0 && `border-b-4 border-gray-500`} ${
												i === 6 && `border-l-4 border-gray-500`
											}`}
										>
											<Typography className={cell.classes}>
												{cell.value}
												{props.title === 'Policies per Household' && i > 0 && cell.value > 0
													? '%'
													: ''}
											</Typography>
										</TableCell>
									);
								})}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</Paper>
	);
}

export default React.memo(Widget10);
