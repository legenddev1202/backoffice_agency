import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Table from '@material-ui/core/Table';
import PropTypes from 'prop-types';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { useGlobalFilter, usePagination, useRowSelect, useSortBy, useTable } from 'react-table';
import clsx from 'clsx';
import ContactsTablePaginationActions from './BonusPlanTablePaginationActions';
import { openNewContactDialog } from './store/bonusPlanSlice';
import { useDispatch, useSelector } from 'react-redux';

const EnhancedTable = ({ columns, data, onRowClick, title, id }) => {
	const {
		getTableProps,
		headerGroups,
		prepareRow,
		page,
		gotoPage,
		setPageSize,
		state: { pageIndex, pageSize }
	} = useTable(
		{
			columns,
			data,
			autoResetPage: true
		},
		useGlobalFilter,
		useSortBy,
		usePagination,
		useRowSelect,
		hooks => {
			hooks.allColumns.push(_columns => [
				// Let's make a column for selection
				// {
				// 	id: 'selection',
				// 	sortable: false,
				// The header can use the table's getToggleAllRowsSelectedProps method
				// to render a checkbox.  Pagination is a problem since this will select all
				// rows even though not all rows are on the current page.  The solution should
				// be server side pagination.  For one, the clients should not download all
				// rows in most cases.  The client should only download data for the current page.
				// In that case, getToggleAllRowsSelectedProps works fine.
				// Header: ({ getToggleAllRowsSelectedProps }) => (
				// 	<div>
				// 		<IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
				// 	</div>
				// ),
				// The cell can use the individual row's getToggleRowSelectedProps method
				// to the render a checkbox
				// Cell: ({ row }) => (
				// 	<div>
				// 		<IndeterminateCheckbox
				// 			{...row.getToggleRowSelectedProps()}
				// 			onClick={ev => ev.stopPropagation()}
				// 		/>
				// 	</div>
				// )
				// },
				..._columns
			]);
		}
	);

	// Render the UI for your table
	return (
		<div className="flex flex-col min-h-full sm:border-1 sm:rounded-16 overflow-hidden w-full">
			<TableContainer className="flex flex-1 w-full">
				<Table {...getTableProps()} stickyHeader>
					{title && (
						<TableHead>
							<TableRow>
								<TableCell
									className={clsx('whitespace-wrap  p-0 text-xs p-12 ')}
									size="small"
									colSpan={6}
								>
									{title}
								</TableCell>
							</TableRow>
						</TableHead>
					)}

					<TableHead>
						{headerGroups.map(headerGroup => (
							<TableRow {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map((column, index) => {
									return (
										<TableCell
											className={clsx(
												`w-md p-0 text-xs p-4 ${index === 2 ? `border-r-0` : `border-r-1`}`
											)}
											size="small"
											align="center"
											{...(!column.sortable
												? column.getHeaderProps()
												: column.getHeaderProps(column.getSortByToggleProps()))}
										>
											{column.render('Header')}
										</TableCell>
									);
								})}
							</TableRow>
						))}
					</TableHead>
					<TableBody>
						{page.map((row, i) => {
							prepareRow(row);
							return (
								<TableRow
									{...row.getRowProps()}
									// onClick={ev => onRowClick(ev, row)}
									className="truncate cursor-pointer "
									size="small"
								>
									{row.cells.map((cell, index) => {
										return (
											<TableCell
												{...cell.getCellProps()}
												align="center"
												className={clsx(
													`p-4 text-xs truncate ${
														index === 2 ? `border-r-0` : `border-r-1 `
													}`,
													cell.column.className
												)}
											>
												{cell.render('Cell').props.row.original.amount &&
													index === 2 &&
													(id === 'teamAutoTargetBonus' ||
														id === 'teamFireTargetBonus' ||
														id === 'teamLifeTargetBonus' ||
														id === 'teamHealthTargetBonus' ||
														id === 'teamBankTargetBonus') &&
													'$'}

												{/* {cell.render('Cell').props.row.original.amount &&
													index === 1 &&
													id === 'individualLifeTargetBonus' &&
													'$'}
												{cell.render('Cell').props.row.original.amount &&
													index === 1 &&
													id === 'individualHealthTargetBonus' &&
													'$'}
												{cell.render('Cell').props.row.original.amount &&
													index === 1 &&
													id === 'individualBankTargetBonus' &&
													'$'} */}
												{/* {cell.render('Cell').props.row.original.amount &&
													index === 1 &&
													id === 'teamLifeTargetBonus' &&
													'$'}
												{cell.render('Cell').props.row.original.amount &&
													index === 1 &&
													id === 'teamHealthTargetBonus' &&
													'$'}
												{cell.render('Cell').props.row.original.amount &&
													index === 1 &&
													id === 'teamBankTargetBonus' &&
													'$'} */}
												{cell.render('Cell').props.row.original.dollar &&
													index === 2 &&
													id === 'monthlyAgencyLapseAutoBonus' &&
													'$'}
												{cell.render('Cell').props.row.original.dollar &&
													index === 2 &&
													id === 'monthlyAgencyLapseFireBonus' &&
													'$'}

												{cell.render('Cell').props.row.original.dollar &&
													index === 1 &&
													(id === 'monthlyAutoNetGrowthBonus' ||
														id === 'monthlyFireNetGrowthBonus' ||
														id === 'otherActivityBonus') &&
													'$'}

												{cell.render('Cell')}
												{cell.render('Cell').props.row.original.percent &&
													index === 1 &&
													id === 'monthlyAgencyLapseAutoBonus' &&
													'%'}
												{cell.render('Cell').props.row.original.percent &&
													index === 1 &&
													id === 'monthlyAgencyLapseFireBonus' &&
													'%'}
												{cell.render('Cell').props.row.original.amount &&
													index === 2 &&
													(id === 'individualAutoTargetBonus' ||
														id === 'individualFireTargetBonus' ||
														id === 'individualLifeTargetBonus' ||
														id === 'individualHealthTargetBonus' ||
														id === 'individualBankTargetBonus') &&
													'%'}
											</TableCell>
										);
									})}
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
};

EnhancedTable.propTypes = {
	columns: PropTypes.array.isRequired,
	data: PropTypes.array.isRequired,
	onRowClick: PropTypes.func
};

export default EnhancedTable;
