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
import { getUsers, selectUsers, saveProduct } from '../store/userSlice';
import ProductsTableHead from './UsersTableHead';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SelectBox from '../../../components/SelectBox';
import { getTemplateData } from '../store/bonusPlanSlice';
import DateFnsUtils from '@date-io/date-fns';
import { openUserProfileDialog, deleteUser, saveUser } from '../store/userSlice';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { bonusPlanTemplate } from 'app/services/jsons';

const useStyles = makeStyles(theme => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
			width: '25ch'
		}
	}
}));

const teamBonusList = [
	{ item: 'Yes', value: true },
	{ item: 'No', value: false }
];

var selectedUID = '';

function ProductsTable(props) {
	const dispatch = useDispatch();
	const products = useSelector(selectUsers);
	const searchText = useSelector(({ users }) => users.users.searchText);
	const bonusPlanTemplates = useSelector(({ users }) => users.templates);
	let belongTo = localStorage.getItem('@BELONGTO')
	const isAdmin = useSelector(({ auth }) => auth.user.role[0]);
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
		includeTeamBonus: '',
		templates: []
	});
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = uid => { 
		setOpen(true);
		selectedUID = uid;
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleDelete = () => {
		setOpen(false);
		console.log(selectedUID);
		dispatch(deleteUser(selectedUID));
	};

	useEffect(() => {
		dispatch(getUsers()).then(() => setLoading(false));
		dispatch(getTemplateData());
	}, [dispatch]);

	useEffect(() => {
		var tempLists = [];

		if (bonusPlanTemplates.length > 0) {
			console.log(bonusPlanTemplates);
			Object.keys(bonusPlanTemplates[0]).map(item => {
				tempLists.push({ item: item, value: item });
			});
			setState({ ...state, templates: tempLists });
		}
	}, [bonusPlanTemplates]);

	useEffect(() => { 
		if (searchText.length !== 0) {
			setData(_.filter(products, item => item.data.displayName.toLowerCase().includes(searchText.toLowerCase())));
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

	function makeid(length) {
		var result = '';
		var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		var charactersLength = characters.length;
		for (var i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	}

	function goBonusPlan(uid) {
		setLoading(true);
		props.history.push(`/apps/setup/bonus-plan/${uid}`);
	}

	function goReport(user) {
		// props.history.push(`/apps/producer-detail/${uid}`);
		window.open('https://agent-backoffice-producer.web.app/agency-login');
		// window.open(`http://localhost:3000/agency-login`);
	}

	function handleBonusChangeValue(data, uid, teamBonus) {
		
		dispatch(saveUser({ ...data, uid, teamBonus }));
	}

	// function handleChangeTeamBonusValue(data) {
	// 	dispatch(saveTeamBonus({...data, uid, teamBonus}))
	// }

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
							{_.orderBy(data, [order.id], [order.direction])
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((n, index) => {
									console.log('---------------------------------------------------', n)
									// if (Object.keys(n).includes('role')) {
									// 	if(n.role[0] === 'admin')
									// 	return;
									// }
									const isSelected = selected.indexOf(n.id) !== -1;
									return (
										<TableRow
											className="h-48 cursor-pointer"
											hover
											role="checkbox"
											aria-checked={isSelected}
											tabIndex={-1}
											key={index}
											selected={isSelected}
										>
											{console.log(n)}
											<TableCell className="w-40 md:w-64 text-center" padding="none">
												<Checkbox
													checked={isSelected}
													onClick={event => event.stopPropagation()}
													onChange={event => handleCheck(event, n.id)}
												/>
											</TableCell>

											<TableCell
												className="p-2 md:p-2"
												component="th"
												scope="row"
												align="center"
												onClick={() => dispatch(openUserProfileDialog(n.data))}
											>
												{n.active && n.data.displayName}
											</TableCell>

											<TableCell
												className="p-2 md:p-2 truncate"
												component="th"
												scope="row"
												align="center"
											>
												{n.active && (
													<SelectBox
														data={teamBonusList}
														willvalidation={false}
														value={n.teamBonus}
														validation="includeTeamBonus"
														handleChangeValue={value =>
															handleBonusChangeValue(
																{ template: n.bonusPlan },
																n.uid,
																value.includeTeamBonus
															)
														}
														// value={state.includeTeamBonus}
													/>
												)}
											</TableCell>

											<TableCell
												className="p-2 md:p-2"
												component="th"
												scope="row"
												align="center"
												// onClick={() => n.data && goBonusPlan(n.uid)}
											>
												{/* <span>$</span> */}
												{n.active && (
												<SelectBox
													id="outlined-basic"
													label="Select Template"
													data={state.templates}
													variant="outlined"
													value={n.bonusPlan}
													validation="template"
													handleChangeValue={value =>
														handleBonusChangeValue(value, n.uid, n.teamBonus)
													}
													// willvalidation={false}
													// validate={state.userValidation}
												/>)}
											</TableCell>

											<TableCell className="p-2 md:p-2" component="th" scope="row" align="center">
												{n.active && Object.keys(n).includes('role') && n.role[0]==='producer' && (
													<Button
														className="whitespace-nowrap normal-case"
														variant="contained"
														color="secondary"
														onClick={() => n.data && goReport(n)}
													>
														<span>Producer File</span>
													</Button>
												)}
											</TableCell>
											<TableCell className="p-2 md:p-2" component="th" scope="row" align="center">
												{n.active ? n.data.email : n.email}
											</TableCell>

											<TableCell className="p-2 md:p-2" component="th" scope="row" align="center">
												{n.active ? n.data.password : ''}
											</TableCell>

											<TableCell className="p-2 md:p-2" component="th" scope="row" align="center">
												{n.active ? 'Active' : n.belongTo ? 'Revoked' : 'Invite sent'}
											</TableCell>
											<TableCell className="p-2 md:p-2" component="th" scope="row" align="center">
												{n.active && Object.keys(n).includes('role') && n.role[0]==='admin' ? '' : (
													<Button
														className="whitespace-nowrap normal-case"
														variant="contained"
														color="secondary"
														onClick={() => handleClickOpen(n.id)}
													>
														<span>Revoke</span>
													</Button>
												)}
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
				<Dialog
					open={open}
					onClose={handleClose}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle id="alert-dialog-title">{'Are you really revoke this user?'}</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							You will lost this users data.
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} color="primary">
							No
						</Button>
						<Button onClick={handleDelete} color="primary" autoFocus>
							Yes
						</Button>
					</DialogActions>
				</Dialog>
			</MuiPickersUtilsProvider>
		</div>
	);
}

export default withRouter(ProductsTable);
