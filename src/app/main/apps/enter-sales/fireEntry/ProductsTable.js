import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import Checkbox from '@material-ui/core/Checkbox';
import InputAdornment from '@material-ui/core/InputAdornment';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FuseLoading from '@fuse/core/FuseLoading';
import FuseAnimate from '@fuse/core/FuseAnimate/FuseAnimate';
import { getFires, selectFires, saveProduct } from '../store/fireSlice';
import ProductsTableHead from './ProductsTableHead';
import TextInput from '../../../components/TextField';
import FormattedInput from '../../../components/PriceInput';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SelectBox from '../../../components/SelectBox';
import moment from 'moment';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

const useStyles = makeStyles(theme => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
			width: '25ch'
		}
	}
}));

const productLists = [
	{ item: 'Personally Produced', value: 'Personally Produced' },
	{ item: 'Raw New', value: 'Raw New' },
	{ item: 'Client Request', value: 'Client Request' },
	{ item: 'Transfer In', value: 'Transfer In' }
];

const sourceLists = [
	{ item: 'Center of Influence', value: 'Center of Influence' },
	{ item: 'Client Request', value: 'Client Request' },
	{ item: 'Direct Mail Letter', value: 'Direct Mail Letter' },
	{ item: 'Internet Lead >>', value: 'Internet Lead >>' },
	{ item: 'Multiline Review', value: 'Multiline Review' },
	{ item: 'Networking Meeting', value: 'Networking Meeting' },
	{ item: 'News Ad', value: 'News Ad' },
	{ item: 'Park Bench', value: 'Park Bench' },
	{ item: 'Personal Visit', value: 'Personal Visit' },
	{ item: 'Postcard', value: 'Postcard' },
	{ item: 'Referral', value: 'Referral ' },
	{ item: 'Salesperson Pivot', value: 'Salesperson Pivot' },
	{ item: 'Sign', value: 'Sign' },
	{ item: 'Television', value: 'Television' },
	{ item: 'Transfer', value: 'Transfer' },
	{ item: 'Walk-In', value: 'Walk-In' },
	{ item: 'Website', value: 'Website' },
	{ item: 'Web Search', value: 'Web Search' },
	{ item: 'Yellow Pages', value: 'Yellow Pages' },
	{ item: 'Other', value: 'Other' }
];

function makeid(length) {
	var result = '';
	var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength = characters.length;
	for (var i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

function ProductsTable(props) {
	const dispatch = useDispatch();
	const products = useSelector(selectFires);
	const searchText = useSelector(({ eCommerceApp }) => eCommerceApp.products.searchText);

	const classes = useStyles();
	const [loading, setLoading] = useState(true);
	const [selected, setSelected] = useState([]);
	const [data, setData] = useState(products);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [order, setOrder] = useState({
		direction: 'asc',
		id: null
	});
	const [state, setState] = React.useState({
		policyHolderName: '',
		policyInformation: '',
		datePolicyIsWritten: new Date(),
		datePolicyIsIssued: null,
		percentOfSaleCredit: '',
		typeOfProduct: '',
		policyPremium: '',
		sourceOfBusiness: '',
		adjustments: '',
		dollarBonus: '',
		percentOfSaleCreditValidation: false,
		typeOfProductValidation: false,
		policyPremiumValidation: false
	});

	useEffect(() => {
		dispatch(getFires()).then(() => setLoading(false));
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

	function handleDateChange(date, id) {
		setState({ ...state, [id]: date });
		console.log({ [id]: date });
	}

	function handleChangeValue(data) {
		console.log(data);
		setState({ ...state, ...data });
	}

	function checkValidation() {
		if (!state.percentOfSaleCreditValidation && !state.typeOfProductValidation && !state.policyPremiumValidation) {
			return true;
		} else {
			setState({
				...state,
				percentOfSaleCreditValidation: state.percentOfSaleCredit ? false : true,
				typeOfProductValidation: state.typeOfProduct ? false : true,
				policyPremiumValidation: state.policyPremium ? false : true
			});
			return false;
		}
	}

	function onSave() {
		console.log(checkValidation());
		if (checkValidation()) {
			let form = {
				id: state.id ? state.id : Date.now(),
				policyHolderName: state.policyHolderName,
				policyInformation: state.policyInformation,
				datePolicyIsWritten: state.datePolicyIsWritten
					? state.datePolicyIsWritten
					: '',
				datePolicyIsIssued: state.datePolicyIsIssued
					? state.datePolicyIsIssued
					: '',
				percentOfSaleCredit: parseFloat(state.percentOfSaleCredit),
				typeOfProduct: state.typeOfProduct,
				policyPremium: parseFloat(state.policyPremium),
				sourceOfBusiness: state.sourceOfBusiness,
				adjustments: state.adjustments,
				dollarBonus: state.dollarBonus
			};

			if (state.datePolicyIsIssued) {
				if (state.typeOfProduct === 'Personally Produced') {
					form = {
						...form,
						dollarBonus:
							Math.ceil(
								((parseFloat(state.policyPremium) * parseInt(state.percentOfSaleCredit)) / 100) *
									0.03 *
									100
							) / 100
					};
				} else if (state.typeOfProduct === 'Raw New') {
					form = {
						...form,
						dollarBonus:
							Math.ceil(
								((parseFloat(state.policyPremium) * parseInt(state.percentOfSaleCredit)) / 100) *
									0.02 *
									100
							) / 100
					};
				} else {
					form = {
						...form,
						dollarBonus:
							Math.ceil(
								((parseFloat(state.policyPremium) * parseInt(state.percentOfSaleCredit)) / 100) *
									0.01 *
									100
							) / 100
					};
				}
			}

			dispatch(saveProduct(form));
			dispatch(getFires()).then(() => setLoading(false));
			setState({
				id: '',
				policyHolderName: '',
				policyInformation: '',
				datePolicyIsWritten: new Date(),
				datePolicyIsIssued: null,
				percentOfSaleCredit: '',
				typeOfProduct: '',
				policyPremium: '',
				sourceOfBusiness: '',
				adjustments: '',
				dollarBonus: '',
				percentOfSaleCreditValidation: false,
				typeOfProductValidation: false,
				policyPremiumValidation: false
			});
		}
	}

	function handleClick(item) {
		setState({
			id: item.id,
			policyHolderName: item.policyHolderName,
			policyInformation: item.policyInformation,
			datePolicyIsWritten: item.datePolicyIsWritten,
			datePolicyIsIssued: item.datePolicyIsIssued,
			percentOfSaleCredit: item.percentOfSaleCredit,
			typeOfProduct: item.typeOfProduct,
			policyPremium: item.policyPremium,
			sourceOfBusiness: item.sourceOfBusiness,
			adjustments: item.adjustments,
			dollarBonus: item.dollarBonus
		});
		// props.history.push(`/apps/e-commerce/products/${item.id}/${item.handle}`);
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

							<TableBody>
								<TableRow className="h-64 cursor-pointer">
									<TableCell className="w-40 md:w-64 text-center" padding="none"></TableCell>

									<TableCell className="p-2 md:p-2" component="th" scope="row" align="center">
										<TextInput
											id="outlined-basic"
											label=""
											variant="outlined"
											value={state.policyHolderName}
											validation="policyHolderName"
											onChange={handleChangeValue}
											willvalidation={false}
											validate={false}
										/>
									</TableCell>

									<TableCell
										className="p-2 md:p-2 truncate"
										component="th"
										scope="row"
										align="center"
									>
										<TextInput
											id="outlined-basic"
											label=""
											variant="outlined"
											value={state.policyInformation}
											validation="policyInformation"
											onChange={handleChangeValue}
											willvalidation={false}
											validate={false}
										/>
									</TableCell>

									<TableCell className="p-2 md:p-2" component="th" scope="row" align="center">
										<KeyboardDatePicker
											margin="normal"
											id="date-picker-dialog"
											format="MM/dd/yyyy"
											value={state.datePolicyIsWritten}
											onChange={date => handleDateChange(date, 'datePolicyIsWritten')}
											KeyboardButtonProps={{
												'aria-label': 'change date'
											}}
										/>
									</TableCell>

									<TableCell className="p-2 md:p-2" component="th" scope="row" align="center">
										<KeyboardDatePicker
											margin="normal"
											id="date-picker-dialog"
											format="MM/dd/yyyy"
											value={state.datePolicyIsIssued}
											onChange={date => handleDateChange(date, 'datePolicyIsIssued')}
											KeyboardButtonProps={{
												'aria-label': 'change date'
											}}
										/>
									</TableCell>
									<TableCell className="p-2 md:p-2" component="th" scope="row" align="center">
										<TextInput
											id="outlined-basic"
											label=""
											variant="outlined"
											value={state.percentOfSaleCredit}
											validation="percentOfSaleCredit"
											type="percent"
											onChange={handleChangeValue}
											willvalidation={true}
											validate={state.percentOfSaleCreditValidation}
										/>
									</TableCell>
									<TableCell className="p-2 md:p-2" component="th" scope="row" align="center">
										<SelectBox
											id="outlined-basic"
											label=""
											data={productLists}
											variant="outlined"
											value={state.typeOfProduct}
											validation="typeOfProduct"
											handleChangeValue={handleChangeValue}
											willvalidation={true}
											validate={state.typeOfProductValidation}
										/>
									</TableCell>
									<TableCell className="p-2 md:p-2" component="th" scope="row" align="center">
										<FormattedInput
											id="outlined-basic"
											label=""
											variant="outlined"
											value={state.policyPremium}
											validation="policyPremium"
											type="percent"
											willvalidation={true}
											validate={state.policyPremiumValidation}
											handleChangeValue={handleChangeValue}
										/>
									</TableCell>
									<TableCell className="p-2 md:p-2" component="th" scope="row" align="center">
										<SelectBox
											id="outlined-basic"
											label=""
											data={sourceLists}
											variant="outlined"
											value={state.sourceOfBusiness}
											validation="sourceOfBusiness"
											handleChangeValue={handleChangeValue}
											willvalidation={false}
										/>
									</TableCell>
									<TableCell
										className="p-2 md:p-2"
										component="th"
										scope="row"
										align="center"
										colSpan={2}
									>
										<Button
											className="whitespace-nowrap normal-case"
											variant="contained"
											color="secondary"
											onClick={onSave}
										>
											<span>SAVE</span>
										</Button>
									</TableCell>
								</TableRow>
							</TableBody>
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
							<TableRow className="h-10 cursor-pointer">
								<TableCell className="w-40 md:w-64 text-center" padding="none"></TableCell>

								<TableCell className="p-2 md:p-2" component="th" scope="row" align="center">
									<TextInput
										id="outlined-basic"
										label=""
										variant="outlined"
										value={state.policyHolderName}
										validation="policyHolderName"
										onChange={handleChangeValue}
										willvalidation={false}
										validate={false}
									/>
								</TableCell>

								<TableCell className="p-2 md:p-2 truncate" component="th" scope="row" align="center">
									<TextInput
										id="outlined-basic"
										label=""
										variant="outlined"
										value={state.policyInformation}
										validation="policyInformation"
										onChange={handleChangeValue}
										willvalidation={false}
										validate={false}
									/>
								</TableCell>

								<TableCell className="p-2 md:p-2" component="th" scope="row" align="center">
									<KeyboardDatePicker
										margin="normal"
										id="date-picker-dialog"
										format="MM/dd/yyyy"
										value={state.datePolicyIsWritten}
										onChange={date => handleDateChange(date, 'datePolicyIsWritten')}
										KeyboardButtonProps={{
											'aria-label': 'change date'
										}}
									/>
								</TableCell>

								<TableCell className="p-2 md:p-2" component="th" scope="row" align="center">
									<KeyboardDatePicker
										margin="normal"
										id="date-picker-dialog"
										format="MM/dd/yyyy"
										value={state.datePolicyIsIssued}
										onChange={date => handleDateChange(date, 'datePolicyIsIssued')}
										KeyboardButtonProps={{
											'aria-label': 'change date'
										}}
									/>
								</TableCell>
								<TableCell className="p-2 md:p-2" component="th" scope="row" align="center">
									<TextInput
										id="outlined-basic"
										label=""
										variant="outlined"
										value={state.percentOfSaleCredit}
										validation="percentOfSaleCredit"
										type="percent"
										onChange={handleChangeValue}
										willvalidation={true}
										validate={state.percentOfSaleCreditValidation}
									/>
								</TableCell>
								<TableCell className="p-2 md:p-2" component="th" scope="row" align="center">
									<SelectBox
										id="outlined-basic"
										label=""
										data={productLists}
										variant="outlined"
										value={state.typeOfProduct}
										validation="typeOfProduct"
										handleChangeValue={handleChangeValue}
										willvalidation={true}
										validate={state.typeOfProductValidation}
									/>
								</TableCell>
								<TableCell className="p-2 md:p-2" component="th" scope="row" align="center">
									<FormattedInput
										id="outlined-basic"
										label=""
										variant="outlined"
										value={state.policyPremium}
										validation="policyPremium"
										type="percent"
										willvalidation={true}
										validate={state.policyPremiumValidation}
										handleChangeValue={handleChangeValue}
									/>
								</TableCell>
								<TableCell className="p-2 md:p-2" component="th" scope="row" align="center">
									<SelectBox
										id="outlined-basic"
										label=""
										data={sourceLists}
										variant="outlined"
										value={state.sourceOfBusiness}
										validation="sourceOfBusiness"
										handleChangeValue={handleChangeValue}
										willvalidation={false}
									/>
								</TableCell>
								<TableCell className="p-2 md:p-2" component="th" scope="row" align="center" colSpan={2}>
									<Button
										className="whitespace-nowrap normal-case"
										variant="contained"
										color="secondary"
										onClick={onSave}
									>
										<span>SAVE</span>
									</Button>
								</TableCell>
							</TableRow>

							{_.orderBy(
								data,
								[
									
									order.id
									// o => {
									// 	console.log(order.id)
									// 	switch (order.id) {
											
									// 		case 'policyInformation': {
									// 			return 'policyInformation';
									// 		}
									// 		case 'datePolicyIsWritten': {
									// 			return 'datePolicyIsWritten';
									// 		}
									// 		default: {
									// 			return order.id;
									// 		}
									// 	}
									// }
								],
								[order.direction]
							)
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map(n => {
									const isSelected = selected.indexOf(n.id) !== -1;
									return (
										<TableRow
											className="h-48 cursor-pointer"
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
												{moment(n.datePolicyIsIssued).format('MM/DD/YYYY')}
											</TableCell>
											<TableCell className="p-2 md:p-2" component="th" scope="row" align="center">
												{n.percentOfSaleCredit}%
											</TableCell>
											<TableCell className="p-2 md:p-2" component="th" scope="row" align="center">
												{n.typeOfProduct}
											</TableCell>
											<TableCell className="p-2 md:p-2" component="th" scope="row" align="center">
												${n.policyPremium}
											</TableCell>
											<TableCell className="p-2 md:p-2" component="th" scope="row" align="center">
												{n.sourceOfBusiness}
											</TableCell>
											{/* <TableCell
												className="p-2 md:p-2"
												component="th"
												scope="row"
												align="center"
											>
												{n.adjustments}
											</TableCell> */}
											<TableCell className="p-2 md:p-2 bg-indigo-200" component="th" scope="row" align="center">
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
