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
import TextInput from '../../../components/LapseTextField'

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
								<TableCell key={column.id} className="text-xs p-5" align="center" >
									{column.title}
								</TableCell>
							))}

						</TableRow>
					</TableHead>
					<TableBody>
						{console.log(props.rows)}
						{Object.keys(props.rows).map((firstKey, index) => (
							<TableRow key={index}>
								{firstKey!=='id'&&Object.keys(props.rows[firstKey]).map((monthKey, i) => {
									let cell = props.rows[firstKey][monthKey]
									if ((props.title==="Auto"||props.title==="Fire"||props.title==="Life"||props.title==="Health") && i===1){
										return <TableCell key={cell.id} component="th" scope="row" align="center" className="p-3">
											<TextInput
											id="outlined-basic"
											label=""
											variant="outlined"
											value={cell.value}
											validation="percentOfSaleCredit"
											type="percent"
											onChange={props.handleChangeValue}
											willvalidation={false}
											validate={false}
											size={100}
											month={firstKey}
											field = {cell.id}
											title = {props.title}
										/>
										</TableCell>
										
										
									}
								
									return (
										<TableCell key={cell.id} component="th" scope="row" align="center" className="p-3">
											<Typography className={cell.classes}>{cell.value}</Typography>
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
