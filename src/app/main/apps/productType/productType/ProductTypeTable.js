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
import FuseAnimate from '@fuse/core/FuseAnimate/FuseAnimate';
import { getMarketing, selectMarketing, saveMarketing } from '../store/productTypeSlice';
import ProductsTableHead from './ProductTypeTableHead';
import TextInput from '../../../components/TextField';
import FormattedInput from '../../../components/PriceInput';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SelectBox from '../../../components/SelectBox';
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
	const products = useSelector(selectMarketing);
	const searchText = useSelector(({ productType }) => productType.productType.searchText);
	const policy = useSelector(({ productType }) => productType.productType.policy);
	const classes = useStyles();
	const [loading, setLoading] = useState(false);
	const [selected, setSelected] = useState([]);
	const [data, setData] = useState(products);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [order, setOrder] = useState({
		direction: 'asc',
		id: null
	});
	const [state, setState] = React.useState({
		productTypeName: '',
		productTypeNameValidation: false
	});

	

	useEffect(() => {
		if (searchText.length !== 0) {
			console.log(searchText);
			// setData(_.filter(products, item => item.productTypeName.toLowerCase().includes(searchText.toLowerCase())));
			// setPage(0);
		} else {

			setData(_.filter(products, item => item.policy===policy));
		}
	}, [products, searchText, policy]);

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


	function handleChangeValue(data) {

		setState({ ...state, ...data });
	}

	function checkValidation() {
		if (!state.productTypeNameValidation ) {
			return true;
		} else {
			setState({
				...state,
				productTypeNameValidation: state.productTypeName ? false : true
		
			});
			return false;
		}
	}

	function onSave() {
		if (checkValidation()) {
			let form = {
				id: state.id ? state.id : Date.now(),
				productTypeName: state.productTypeName,		
				policy: policy		
			};			

			dispatch(saveMarketing(form));
			dispatch(getMarketing()).then(() => setLoading(false));
			setState({
				productTypeName:''
			});
		}
	}

	function handleClick(item) {
		setState({
			productTypeName:item.productTypeName,
			id: item.id
		});

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
											value={state.productTypeName}
											validation="productTypeName"
											onChange={handleChangeValue}
											willvalidation={true}
											validate={state.productTypeNameValidation}
											size={250}
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
										value={state.productTypeName}
										validation="productTypeName"
										onChange={handleChangeValue}
										willvalidation={true}
										validate={state.productTypeNameValidation}
										size={250}
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

											<TableCell className="p-2 md:p-2" component="th" scope="row" align="center"  >
												{n.productTypeName}
											</TableCell>
											<TableCell className="p-2 md:p-2" component="th" scope="row" align="center"  >
												
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
