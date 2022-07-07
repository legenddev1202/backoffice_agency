import Checkbox from '@material-ui/core/Checkbox';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import clsx from 'clsx';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeProducts } from '../store/entrySlice';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

const rows = [
	{
		id: 'policyHolderName',
		align: 'center',
		disablePadding: false,
		label: ' Policyholder Name',
		sort: true
	},
	{
		id: 'policyInformation',
		align: 'center',
		disablePadding: false,
		label: 'Policy Information (i.e. Vehicle Type)',
		sort: true
	},
	{
		id: 'datePolicyIsWritten',
		align: 'center',
		disablePadding: false,
		label: 'Date Policy Is Written',
		sort: true
	},
	{
		id: 'datePolicyIsIssued',
		align: 'center',
		disablePadding: false,
		label: 'Date Policy Is Issued',
		sort: true
	},
	{
		id: 'percentOfSaleCredit',
		align: 'center',
		disablePadding: false,
		label: 'Percent of Sale Credit',
		sort: true
	},
	{
		id: 'typeOfProduct',
		align: 'center',
		disablePadding: false,
		label: 'Type of Product',
		sort: true
	},
	{
		id: 'referenceName',
		align: 'center',
		disablePadding: false,
		label: 'Reference Name',
		sort: true
	},
	{
		id: 'user',
		align: 'center',
		disablePadding: false,
		label: 'User',
		sort: true
	},
	{
		id: 'type',
		align: 'center',
		disablePadding: false,
		label: 'Type',
		sort: true
	},
	{
		id: 'policyPremium',
		align: 'center',
		disablePadding: false,
		label: 'Semi-Annual Policy Premium',
		sort: true
	},
	{
		id: 'sourceOfBusiness',
		align: 'center',
		disablePadding: false,
		label: 'Marketing Source',
		sort: true
	},
	// {
	// 	id: 'adjustments',
	// 	align: 'right',
	// 	disablePadding: false,
	// 	label: 'Adjustments',
	// 	sort: true
	// },
	{
		id: 'dollarBonus',
		align: 'center',
		disablePadding: false,
		label: 'Dollar Bonus',
		sort: true
	}
];

const useStyles = makeStyles(theme => ({
	actionsButtonWrapper: {
		background: theme.palette.background.paper
	}
}));

function ProductsTableHead(props) {
	const classes = useStyles(props);
	const { selectedProductIds } = props;
	const numSelected = selectedProductIds.length;

	const [selectedProductsMenu, setSelectedProductsMenu] = useState(null);
	const [open, setOpen] = React.useState(false);
	const dispatch = useDispatch();

	const createSortHandler = property => event => {
		props.onRequestSort(event, property);
	};

	function openSelectedProductsMenu(event) {
		setSelectedProductsMenu(event.currentTarget);
	}

	function closeSelectedProductsMenu() {
		setSelectedProductsMenu(null);
	}

	const handleClose = () => {
		setOpen(false);
		props.onMenuItemClick();
		closeSelectedProductsMenu();
	};

	const handleOpen = () => {
		setOpen(true);
	};

	const handleDelete = () => {
		setOpen(false);
		dispatch(removeProducts(selectedProductIds));
		props.onMenuItemClick();
		closeSelectedProductsMenu();
	};

	return (
		<>
			<TableHead>
				<TableRow className="h-64">
					<TableCell padding="none" className="w-40 md:w-64 text-center z-99">
						<Checkbox
							indeterminate={numSelected > 0 && numSelected < props.rowCount}
							checked={props.rowCount !== 0 && numSelected === props.rowCount}
							onChange={props.onSelectAllClick}
						/>
						{numSelected > 0 && (
							<div
								className={clsx(
									'flex items-center justify-center absolute w-64 top-0 ltr:left-0 rtl:right-0 mx-56 h-64 z-10 border-b-1',
									classes.actionsButtonWrapper
								)}
							>
								<IconButton
									aria-owns={selectedProductsMenu ? 'selectedProductsMenu' : null}
									aria-haspopup="true"
									onClick={openSelectedProductsMenu}
								>
									<Icon>more_horiz</Icon>
								</IconButton>
								<Menu
									id="selectedProductsMenu"
									anchorEl={selectedProductsMenu}
									open={Boolean(selectedProductsMenu)}
									onClose={closeSelectedProductsMenu}
								>
									<MenuList>
										<MenuItem
											onClick={() => {
												handleOpen();
											}}
										>
											<ListItemIcon className="min-w-40">
												<Icon>delete</Icon>
											</ListItemIcon>
											<ListItemText primary="Remove" />
										</MenuItem>
									</MenuList>
								</Menu>
							</div>
						)}
					</TableCell>
					{rows.map(row => {
						return (
							<TableCell
								className="p-1 md:p-1 text-xs"
								key={row.id}
								align={row.align}
								padding={row.disablePadding ? 'none' : 'default'}
								sortDirection={props.order.id === row.id ? props.order.direction : false}
							>
								{row.sort && (
									<Tooltip
										title="Sort"
										placement={row.align === 'right' ? 'bottom-end' : 'bottom-start'}
										enterDelay={300}
									>
										<TableSortLabel
											active={props.order.id === row.id}
											direction={props.order.direction}
											onClick={createSortHandler(row.id)}
										>
											{row.label}
										</TableSortLabel>
									</Tooltip>
								)}
							</TableCell>
						);
					}, this)}
				</TableRow>
			</TableHead>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">{'Are you really delete this item?'}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">You will lost this data.</DialogContentText>
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
		</>
	);
}

export default ProductsTableHead;
