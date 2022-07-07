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
import { removeProducts } from '../store/userSlice';

const rows = [
	{
		id: 'name',
		align: 'center',
		disablePadding: false,
		label: 'User Name',
		sort: true
	},
	{
		id: 'includeTeamBonus',
		align: 'center',
		disablePadding: false,
		label: 'Include Team Bonuses?',
		sort: true
	},
	{
		id: 'bonusPlanForProducer',
		align: 'center',
		disablePadding: false,
		label: 'Bonus Plan For a Producer',
		sort: true
	},
	{
		id: 'producerFile',
		align: 'center',
		disablePadding: false,
		label: 'Producer File',
		sort: true
	},
	{
		id: 'email',
		align: 'center',
		disablePadding: false,
		label: 'Email',
		sort: true
	},
	{
		id: 'password',
		align: 'center',
		disablePadding: false,
		label: 'Password',
		sort: true
	},
	{
		id: 'active',
		align: 'center',
		disablePadding: false,
		label: 'Active',
		sort: true
	},
	{
		id: 'action',
		align: 'center',
		disablePadding: false,
		label: 'Action',
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

	return (
		<TableHead>
			<TableRow className="h-64">
				<TableCell padding="none" className="w-40 md:w-64 text-center z-99">
					<Checkbox
						indeterminate={numSelected > 0 && numSelected < props.rowCount}
						checked={props.rowCount !== 0 && numSelected === props.rowCount}
						onChange={props.onSelectAllClick}
					/>
					
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
							{/* <TableSortLabel
								active={props.order.id === row.id}
								direction={props.order.direction}
								onClick={createSortHandler(row.id)}
							> */}
								{row.label}
							{/* </TableSortLabel> */}
						</TableCell>
					);
				}, this)}
			</TableRow>
		</TableHead>
	);
}

export default ProductsTableHead;
