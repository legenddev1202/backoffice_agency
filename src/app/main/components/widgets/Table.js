import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from '@lodash';
import clsx from 'clsx';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import TablePagination from '@material-ui/core/TablePagination';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import TextInput from '../TextInput';
import { formattedString } from '../../utils/Function';

const LG_ROW_HEIGHT = 'h-64';
const MD_ROW_HEIGHT = 'h-48';
const SM_ROW_HEIGHT = 'h-32';

function Widget(props) {
	const dispatch = useDispatch();
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(20);
	const [order, setOrder] = useState({
		direction: 'asc',
		id: null
	});

	const tableId = props.data.id;
	const tableContent = props.data.table.tableContent;
	const headers = props.data.table.headers;
	const rows = props.data.table.rows;
	const columns = props.data.table.columns;
	const sortTableContent = [];
	const selected = props.selected;

	if (props.sortable) {
		rows.map((row, rowNum) => {
			sortTableContent.push({ ...tableContent[row.value] });
		});
	}

	function handleInputChange(tableName, row, col, rowKey, colKey, value) {
		props.onInputChange({ tableName, row, col, rowKey, colKey, value });
	}

	function handleCheck(event, uid, rowKey, rowNum, rowData) {
		props.onCheck(event, uid, rowKey, rowNum, rowData);
	}

	function handleAmountChange(event, uid, rowKey, rowNum, rowData) {
		props.onAmountChange(event, uid, rowKey, rowNum, rowData);
	}

	function handleChangePage(event, value) {
		setPage(value);
	}

	function handleChangeRowsPerPage(event) {
		setRowsPerPage(event.target.value);
	}

	const handleRequestSort = property => event => {
		const id = property;
		let direction = 'desc';

		if (order.id === property && order.direction === 'desc') {
			direction = 'asc';
		}

		setOrder({
			direction,
			id
		});
	};

	return (
		// <Paper className="w-full rounded-8 shadow">
		<div className="flex flex-col min-h-full sm:border-1 sm:rounded-8 overflow-hidden w-full">
			{props.data.title !== '' && (
				<div className="flex items-center justify-between px-16 py-16 border-b-1">
					<Typography className="text-16">{props.data.title}</Typography>
				</div>
			)}
			<FuseScrollbars className="flex-growNum overflow-x-auto">
				<Table stickyHeader className="min-w-full" size="small" aria-labelledby="tableTitle">
					<TableHead>
						<TableRow
							// className={props.lg ? LG_ROW_HEIGHT : props.md ? MD_ROW_HEIGHT : SM_ROW_HEIGHT}
							key={`header_row_1`}
						>
							{columns.map((column, col) => {
								switch (column.id) {
									case 'avatar': {
										return (
											<TableCell
												key={`header_row_1_cell_${col}`}
												rowSpan={column.rowSpan}
												align={column.align}
												className={clsx('whitespace-wrap p-0 text-xs p-12 border-r-1')}
											>
												{column.title}
											</TableCell>
										);
									}
									default: {
										return (
											<TableCell
												key={`header_row_1_cell_${col}`}
												colSpan={column.colSpan}
												rowSpan={column.rowSpan}
												align="center"
												className={clsx(`
													whitespace-wrap p-0 text-xs p-12 
													${col === columns.length - 1 ? `border-r-0` : `border-r-1`} 
													${column.color}
													${column.border}
												`)}
											>
												{column.title}
											</TableCell>
										);
									}
								}
							})}
						</TableRow>
						<TableRow
							className={props.lg ? LG_ROW_HEIGHT : props.md ? MD_ROW_HEIGHT : SM_ROW_HEIGHT}
							key={`header_row_2`}
						>
							{headers.map((cell, col) => {
								return (
									<TableCell
										key={`header_row_2_cell_${col}`}
										component="th"
										scope="rowNum"
										align={'center'}
										// padding={cell.disablePadding ? 'none' : 'default'}
										sortDirection={order.id === cell.id ? order.direction : false}
										className={clsx(`
											w-md p-0 text-xs p-4 
											${col === headers.length - 1 ? `border-r-0` : `border-r-1`} 
											${cell.color}
											${headers.length > 0 && headers[col].border}
										`)}
									>
										{props.sortable && (
											<Tooltip
												key={`tooltip_${col}`}
												title="Sort"
												placement={cell.align === 'right' ? 'bottom-end' : 'bottom-start'}
												enterDelay={300}
											>
												<TableSortLabel
													key={`sortlabel_${col}`}
													active={order.id === cell.id}
													direction={order.direction}
													onClick={handleRequestSort(cell.id)}
												>
													{cell.value.substring(cell.value.indexOf('@') + 1)}
												</TableSortLabel>
											</Tooltip>
										)}
										{!props.sortable && cell.value.substring(cell.value.indexOf('@') + 1)}
									</TableCell>
								);
							})}
						</TableRow>
					</TableHead>
					<TableBody>
						{!props.sortable &&
							!_.isEmpty(tableContent) &&
							Object.keys(tableContent).map((rowKey, rowNum) => {
								//console.log(tableContent)
								return (
									<TableRow
										className={`${props.lg ? LG_ROW_HEIGHT : props.md ? MD_ROW_HEIGHT : SM_ROW_HEIGHT
											} ${rows.length > 0 && rows[rowNum].hidden ? 'hidden' : ''}`}
										key={`body_row_${rowNum}`}
									>
										{!props.hideLeftHeader && (
											<TableCell
												key={`body_cell_${rowNum}`}
												component="th"
												scope="rowNum"
												align="center" //p-5
												className={clsx(`
											p-5 text-xs truncate border-r-1 
											${rows.length > 0 && rows[rowNum].color}
											${rows.length > 0 && rows[rowNum].border}
											${rows.length > 0 && rows[rowNum].rowSpan}
											${rows.length > 0 && rows[rowNum].colSpan}
										`)}
											>
												{rowKey}
											</TableCell>
										)}
										{Object.keys(tableContent[rowKey]).map(
											(colKey, colNum) =>
												colKey !== 'id' &&
												colKey !== 'type' &&
												colKey !== 'month' && (
													<TableCell
														key={`body_cell_${rowNum}_${colNum}`}
														component="th"
														scope="rowNum"
														align="center" //p-5
														className={clsx(`
											p-0 text-xs truncate 
											${colNum === Object.keys(tableContent[rowKey]).length - 1 ? `border-r-0` : `border-r-1`} 
											${rows.length > 0 && rows[rowNum].border}
											${headers.length > 0 && columns.length === 0 && headers[colNum + 1].border}
											${headers.length > 0 && columns.length !== 0 && headers[colNum].border}
										`)}
													>
														{!props.editable &&
															columns.length === 0 &&
															headers.length > 0 &&
															colKey !== 'Bonus Verified?' &&
															colKey !== 'Amount Paid to Producer' &&
															formattedString(
																tableContent[rowKey][headers[colNum + 1].value],
																headers[colNum + 1].startAdornment,
																headers[colNum + 1].endAdornment
															)}

														{!props.editable &&
															columns.length !== 0 &&
															headers.length > 0 &&
															colKey !== 'Bonus Verified?' &&
															colKey !== 'Amount Paid to Producer' &&
															formattedString(
																tableContent[rowKey][headers[colNum].value],
																headers[colNum].startAdornment,
																headers[colNum].endAdornment
															)}

														{!props.editable &&
															columns.length === 0 &&
															headers.length > 0 &&
															colKey === 'Bonus Verified?' &&
															rowKey !== 'Total' && (
																<Checkbox
																	key={`checkbox_${rowNum}_${colNum}`}
																	checked={
																		tableContent[rowKey][headers[colNum + 1].value]
																	}
																	onChange={event =>
																		handleCheck(
																			event,
																			rows[rowNum].uid,
																			rowKey,
																			rowNum,
																			tableContent[rowKey]
																		)
																	}
																/>
															)}

														{!props.editable &&
															columns.length === 0 &&
															headers.length > 0 &&
															colKey === 'Amount Paid to Producer' &&
															rowKey !== 'Total' && (
																<TextInput
																	id="contact phone number"
																	key={`amount_input_${rowNum}_${colNum}`}
																	value={formattedString(
																		tableContent[rowKey][colKey]
																	)}
																	onChange={event =>
																		handleAmountChange(
																			event,
																			rows[rowNum].uid,
																			rowKey,
																			rowNum,
																			tableContent[rowKey]
																		)
																	}
																	// size="small"
																	readOnly={false}
																	inputProps={{
																		'aria-label': 'naked'
																	}}
																/>
															)}

														{props.editable && (
															<div className="flex items-center">
																<TextInput
																	id="contact phone number"
																	key={`input_${rowNum}_${colNum}`}
																	// type="number"
																	className={clsx('min-w-44')}
																	value={formattedString(
																		tableContent[rowKey][colKey]
																	)}
																	onChange={ev =>
																		handleInputChange(
																			props.tableName,
																			rowNum,
																			colNum,
																			rowKey,
																			colKey,
																			ev.target.value
																		)
																	}
																	size="small"
																	readOnly={false}
																	startAdornment={
																		<InputAdornment
																			key={`start_adornment_${rowNum}_${colNum}`}
																			position="start"
																		>
																			{rows.length > 0 &&
																				rows[rowNum].startAdornment}
																		</InputAdornment>
																	}
																	endAdornment={
																		<InputAdornment
																			key={`end_adornment_${rowNum}_${colNum}`}
																			position="start"
																		>
																			{rows.length > 0 &&
																				rows[rowNum].endAdornment}
																		</InputAdornment>
																	}
																	inputProps={{
																		'aria-label': 'naked'
																	}}
																/>
																{console.log('++++++++++++++++++',colKey.split(" ")[colKey.split(" ").length-1])}
																{((props.percent && rowKey === 'Average Commission') && (
																	<div>%</div>
																	)) ||
																	(((colKey === 'Annual Auto Premium' || colKey === 'Annual Fire Premium' ||
																		colKey === 'Annual Life Premium' || colKey === 'Annual Health Premium' ||
																		colKey === 'Agency Bank Comm' || colKey === 'Total Annual Premium')) 
																	&& (<div>$</div>))
																}
															</div>
														)}
														{
															(!props.editable && colKey.split(" ").length>0 && colKey.split(" ")[colKey.split(" ").length-1]==='Bonuses' && (<div>$</div>))
														}
													</TableCell>
												)
										)}
									</TableRow>
								);
							})}

						{props.sortable &&
							_.orderBy(
								sortTableContent,
								[
									o => {
										switch (order.id) {
											case 'categories': {
												return o.categories[0];
											}
											default: {
												return o[order.id];
											}
										}
									}
								],
								[order.direction]
							)
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((row, rowNum) => {
									return (
										<TableRow className="h-32" key={rowNum}>
											<TableCell
												key={`sort_table_cell_${rowNum}`}
												component="th"
												scope="rowNum"
												align="center" //p-5
												className={clsx(`
										p-0 text-xs truncate border-r-1 
										${rows.length > 0 && rows[rowNum].color}
										${rows.length > 0 && rows[rowNum].border}
									`)}
											>
												{rowNum + 1}
											</TableCell>
											{Object.keys(row).map(
												(colKey, colNum) =>
													colKey !== 'id' &&
													colKey !== 'type' &&
													colKey !== 'month' && (
														<TableCell
															key={`sort_table_cell_${rowNum}_${colNum}`}
															component="th"
															scope="rowNum"
															align="center" //p-5
															className={clsx(`
											p-0 text-xs truncate 
											${colNum === Object.keys(row).length - 1 ? `border-r-0` : `border-r-1`} 
											${rows.length > 0 && row.border}
											${headers.length > 0 && columns.length === 0 && headers[colNum + 1].border}
											${headers.length > 0 && columns.length !== 0 && headers[colNum].border}
										`)}
														>
															{columns.length === 0 &&
																headers.length > 0 &&
																formattedString(row[colKey])}
														</TableCell>
													)
											)}
										</TableRow>
									);
								})}
					</TableBody>
				</Table>
			</FuseScrollbars>
			{props.sortable && (
				<TablePagination
					className="flex-shrink-0 border-t-1"
					component="div"
					count={sortTableContent.length}
					rowsPerPage={rowsPerPage}
					page={page}
					backIconButtonProps={{
						'aria-label': 'Previous Page'
					}}
					nextIconButtonProps={{
						'aria-label': 'Next Page'
					}}
					onChangePage={handleChangePage}
					onChangeRowsPerPage={handleChangeRowsPerPage}
				/>
			)}
		</div>
		// </Paper>
	);
}

export default React.memo(Widget);
