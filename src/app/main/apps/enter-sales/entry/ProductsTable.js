import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import Checkbox from '@material-ui/core/Checkbox';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FuseLoading from '@fuse/core/FuseLoading';
import { getEntries, selectEntries, saveProduct, setEditData } from '../store/entrySlice';
import { getUsers, selectUsers } from '../store/userSlice';
import { getProductType, selectProductType } from '../store/productTypeSlice';
import ProductsTableHead from './ProductsTableHead';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';

const useStyles = makeStyles(theme => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
			width: '25ch'
		}
	}
}));

function ProductsTable(props) {
	const dispatch = useDispatch();
	const products = useSelector(selectEntries);
	const users = useSelector(selectUsers);
	const productType = useSelector(selectProductType);

	const searchText = useSelector(({ eCommerceApp }) => eCommerceApp.products.searchText);

	const displayName = useSelector(({ auth }) => auth.user.data.displayName);
	const classes = useStyles();
	const [loading, setLoading] = useState(true);
	const [selected, setSelected] = useState([]);
	const [data, setData] = useState(products);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [order, setOrder] = useState({
		direction: 'desc',
		id: 'datePolicyIsWritten'
	});
	const [usersList, setUserList] = useState([]);
	const [state, setState] = React.useState({
		policyHolderName: '',
		policyHolderType: '',
		policyInformation: '',
		datePolicyIsWritten: new Date(),
		datePolicyIsIssued: null,
		percentOfSaleCredit: '',
		typeOfProduct: '',
		user: '',
		policyType: [],
		policyPremium: '',
		sourceOfBusiness: '',
		adjustments: '',
		dollarBonus: '',
		typeValidation: false,
		policyHolderTypeValidation: false,
		percentOfSaleCreditValidation: false,
		typeOfProductValidation: false,
		policyPremiumValidation: false,
		userValidation: false
	});

	useEffect(() => {
		dispatch(getEntries()).then(() => setLoading(false));
		dispatch(getProductType());
		dispatch(getUsers());
	}, [dispatch]);

	useEffect(() => {
		if (searchText.length !== 0) {
			console.log(searchText);
			setData(_.filter(products, item => item.policyHolderName.toLowerCase().includes(searchText.toLowerCase())));
			setPage(0);
		} else {
			setData(products);
		}
	}, [products, searchText]);

	useEffect(() => {
		var temp = [];
		if (users.length > 0) {
			users.map(item => {
				temp.push({ item: item.data.displayName, value: item.id });
			});
			temp.push({ item: 'Office Count', value: 'OfficeCount' });
			setUserList(temp);
		}
	}, [users]);

	function handleRequestSort(event, property) {
		const id = property;
		let direction = 'desc';

		if (order.id === property && order.direction === 'desc') {
			direction = 'asc';
		}

		setOrder({
			direction,
			id
		});
	}

	function handleSelectAllClick(event) {
		if (event.target.checked) {
			setSelected(data.map(n => n.id));
			return;
		}
		setSelected([]);
	}

	function handleDeselect() {
		setSelected([]);
	}

	function handleCheck(event, id) {
		const selectedIndex = selected.indexOf(id);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
		}

		setSelected(newSelected);
	}

	function handleChangePage(event, value) {
		setPage(value);
	}

	function handleChangeRowsPerPage(event) {
		setRowsPerPage(event.target.value);
	}

	function handleClick(item) {
		props.history.push(`/apps/enter-sales/entry/edit`);
		dispatch(
			setEditData({
				id: item.id,
				policyHolderName: item.policyHolderName,
				policyInformation: item.policyInformation,
				datePolicyIsWritten: item.datePolicyIsWritten,
				datePolicyIsIssued: item.datePolicyIsIssued ?? null,
				percentOfSaleCredit: item.percentOfSaleCredit,
				typeOfProduct: item.typeOfProduct,
				policyPremium: item.policyPremium,
				sourceOfBusiness: item.sourceOfBusiness,
				adjustments: item.adjustments,
				dollarBonus: item.dollarBonus,
				policyHolderType: item.policyHolderType,
				policyType: item.policyType,
				typeOfProductFire: item.typeOfProductFire,
				typeOfProductHealth: item.typeOfProductHealth,
				typeOfProductLife: item.typeOfProductLife,
				typeOfProductBank: item.typeOfProductBank,
				creditPercent: item.creditPercent,
				creditType: item.creditType,
				creditUser: item.creditUser,
				policies: item.policies,
				referenceName: item.referenceName,
				previousPolicyNumber: item.previousPolicyNumber,
				user: item.user
			})
		);
	}

	if (loading) {
		return <FuseLoading />;
	}

	if (data.length === 0) {
		return (
			<div className="w-full flex flex-col">
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<FuseScrollbars className="flex-grow overflow-x-auto">
						<Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
							<ProductsTableHead
								selectedProductIds={selected}
								order={order}
								onSelectAllClick={handleSelectAllClick}
								onRequestSort={handleRequestSort}
								rowCount={data.length}
								onMenuItemClick={handleDeselect}
							/>
						</Table>
					</FuseScrollbars>
				</MuiPickersUtilsProvider>
			</div>
		);
	}

	return (
		<div className="w-full flex flex-col">
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<FuseScrollbars className="flex-grow overflow-x-auto">
					<Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle" size="small">
						<ProductsTableHead
							selectedProductIds={selected}
							order={order}
							onSelectAllClick={handleSelectAllClick}
							onRequestSort={handleRequestSort}
							rowCount={data.length}
							onMenuItemClick={handleDeselect}
						/>

						<TableBody>
							{_.orderBy(
								data,
								[
									// order.id
									o => {
										// return o.datePolicyIsWritten;
										return o[order.id];
										// switch (order.id) {

										// 	case 'policyInformation': {
										// 		return 'policyInformation';
										// 	}
										// 	case 'datePolicyIsWritten': {
										// 		return 'datePolicyIsWritten';
										// 	}
										// 	default: {
										// 		return order.id;
										// 	}
										// }
									}
								],
								[order.direction]
							)
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map(n => {
									const isSelected = selected.indexOf(n.id) !== -1;
									return (
										<TableRow
											className={
												Object.keys(n).includes('policies')
													? n.policies.length === 1 && n.policyHolderType === 'household'
														? `h-48 cursor-pointer bg-gray-600`
														: `h-48 cursor-pointer`
													: `h-48 cursor-pointer`
											}
											hover
											role="checkbox"
											aria-checked={isSelected}
											tabIndex={-1}
											key={n.id}
											selected={isSelected}
											onClick={event => handleClick(n)}
										>
											<TableCell className="w-40 md:w-64 text-center" padding="none">
												<Checkbox
													checked={isSelected}
													onClick={event => event.stopPropagation()}
													onChange={event => handleCheck(event, n.id)}
												/>
											</TableCell>

											<TableCell className="p-2 md:p-2" component="th" scope="row" align="center">
												{n.policyHolderName}
											</TableCell>

											<TableCell
												className="p-2 md:p-2 truncate"
												component="th"
												scope="row"
												align="center"
											>
												{n.policyInformation}
											</TableCell>

											<TableCell className="p-2 md:p-2" component="th" scope="row" align="center">
												{/* <span>$</span> */}
												{moment(n.datePolicyIsWritten).format('MM/DD/YYYY')}
											</TableCell>

											<TableCell className="p-2 md:p-2" component="th" scope="row" align="center">
												{n.datePolicyIsIssued
													? moment(n.datePolicyIsIssued).format('MM/DD/YYYY')
													: null}
											</TableCell>
											<TableCell className="p-2 md:p-2" component="th" scope="row" align="center">
												{n.creditPercent}%
											</TableCell>
											<TableCell className="p-2 md:p-2" component="th" scope="row" align="center">
												{n.policyType[0] === 'Entries' && n.typeOfProduct}
												{n.policyType[0] === 'FireEntries' && n.typeOfProductFire}
												{n.policyType[0] === 'HealthEntries' && n.typeOfProductHealth}
												{n.policyType[0] === 'LifeEntries' && n.typeOfProductLife}
												{n.policyType[0] === 'BankEntries' && n.typeOfProductBank}
											</TableCell>
											<TableCell className="p-2 md:p-2" component="th" scope="row" align="center">
												{n.referenceName ?? ''}
											</TableCell>
											<TableCell className="p-2 md:p-2" component="th" scope="row" align="center">
												{typeof n.user === 'object'
													? n.user.data.displayName
													: users.map(
															user => user.id === n.sellerId && user.data.displayName
													  )}
											</TableCell>
											<TableCell className="p-2 md:p-2" component="th" scope="row" align="center">
												{n.policyType[0] === 'Entries' ? 'AutoEntries' : n.policyType[0]}
											</TableCell>

											<TableCell className="p-2 md:p-2" component="th" scope="row" align="center">
												${n.policyPremium}
											</TableCell>
											<TableCell className="p-2 md:p-2" component="th" scope="row" align="center">
												{n.sourceOfBusiness}
											</TableCell>

											<TableCell
												className="p-2 md:p-2 bg-indigo-200"
												component="th"
												scope="row"
												align="center"
											>
												{n.dollarBonus ? `$${n.dollarBonus}` : ''}
											</TableCell>
										</TableRow>
									);
								})}
						</TableBody>
					</Table>
				</FuseScrollbars>

				<TablePagination
					className="flex-shrink-0 border-t-1"
					component="div"
					count={data.length}
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
			</MuiPickersUtilsProvider>
		</div>
	);
}

export default withRouter(ProductsTable);
