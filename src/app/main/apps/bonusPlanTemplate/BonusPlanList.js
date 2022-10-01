import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BonusPlanTable from './BonusPlanTable';
import {
	openEditContactDialog,
	removeContact,
	selectContacts,
	openNewTargetBonusDialog,
	openEditTargetBonusDialog,
	openNewTeamTargetBonusDialog,
	openEditTeamTargetBonusDialog,
	openNewNetBonuseDialog,
	openEditNetBonusDialog,
	setRemoveTempData,
	setData,
	changeAutoTargetValue,
	changeFireTargetValue,
	changeLifeTargetValue,
	changeHealthTargetValue,
	changeBankTargetValue
} from './store/bonusPlanSlice';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import { openNewContactDialog } from './store/bonusPlanSlice';
import { makeStyles } from '@material-ui/core/styles';
import { bonusPlanTemplate } from 'app/services/jsons';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
	addButton: {
		width: 10
	},
	formControl: {
		minWidth: 50,
		maxWidth: 70
	},
	selectEmpty: {
		marginTop: theme.spacing(2)
	}
}));

function ContactsList(props) {
	const dispatch = useDispatch();
	const template = useSelector(({ bonusPlanTemplate }) => bonusPlanTemplate.autoBonus.template);
	const tempData = useSelector(({ bonusPlanTemplate }) => bonusPlanTemplate.autoBonus.tempData);
	const data = useSelector(({ bonusPlanTemplate }) => bonusPlanTemplate.autoBonus.data);
	const addTempData = useSelector(({ bonusPlanTemplate }) => bonusPlanTemplate.autoBonus.addTempData);
	const removeTempData = useSelector(({ bonusPlanTemplate }) => bonusPlanTemplate.autoBonus.removeTempData);
	const [contacts, setContact] = useState(bonusPlanTemplate);
	const showAutoTargetAmount = useSelector(
		({ bonusPlanTemplate }) => bonusPlanTemplate.autoBonus.showAutoTargetAmount
	);
	//console.log('bbbbbbbbbbbbb', contacts);
	const showFireTargetAmount = useSelector(
		({ bonusPlanTemplate }) => bonusPlanTemplate.autoBonus.showFireTargetAmount
	);
	const showLifeTargetAmount = useSelector(
		({ bonusPlanTemplate }) => bonusPlanTemplate.autoBonus.showLifeTargetAmount
	);
	const showHealthTargetAmount = useSelector(
		({ bonusPlanTemplate }) => bonusPlanTemplate.autoBonus.showHealthTargetAmount
	);
	const showBankTargetAmount = useSelector(
		({ bonusPlanTemplate }) => bonusPlanTemplate.autoBonus.showBankTargetAmount
	);

	useEffect(() => {
		if (tempData) {
			setContact({
				...contacts,
				[tempData.planType]: {
					...contacts[tempData.planType],
					[tempData.id]: { ...tempData }
				}
			});
		}
	}, [tempData]);

	useEffect(() => {
		if (Object.keys(template).length > 0) {
			setContact(template);
		}
	}, [template]);

	useEffect(() => {
		if (addTempData) {
			setContact({
				...contacts,
				[addTempData.planType]: {
					...contacts[addTempData.planType],
					[addTempData.id]: { ...addTempData }
				}
			});
		}
	}, [addTempData]);

	useEffect(() => {
		if (Object.keys(removeTempData).length > 0) {
			var temp = { ...contacts };
			var subTemp = { ...temp[removeTempData.planType] };
			delete subTemp[removeTempData.id];

			setContact({
				...temp,
				[removeTempData.planType]: { ...subTemp }
			});
		}
	}, [removeTempData]);

	useEffect(() => {
		dispatch(setData({ ...contacts }));
		dispatch(changeAutoTargetValue(contacts.showAutoTargetAmount));
		dispatch(changeFireTargetValue(contacts.showFireTargetAmount));
		dispatch(changeLifeTargetValue(contacts.showLifeTargetAmount));
		dispatch(changeHealthTargetValue(contacts.showHealthTargetAmount));
		dispatch(changeBankTargetValue(contacts.showBankTargetAmount));
	}, [contacts]);
	const searchText = useSelector(({ bonusPlanTemplate }) => bonusPlanTemplate.autoBonus.searchText);
	const user = useSelector(({ bonusPlanTemplate }) => bonusPlanTemplate.user);
	const classes = useStyles(props);
	const [state, setState] = useState({
		autoBonus: [],
		fireBonus: [],
		lifeBonus: [],
		healthBonus: [],
		bankBonus: [],
		individualAutoTargetBonus: [],
		teamAutoTargetBonus: [],
		individualFireTargetBonus: [],
		teamFireTargetBonus: [],
		individualLifeTargetBonus: [],
		teamLifeTargetBonus: [],
		individualHealthTargetBonus: [],
		teamHealthTargetBonus: [],
		individualBankTargetBonus: [],
		teamBankTargetBonus: [],
		monthlyAgencyLapseAutoBonus: [],
		monthlyAgencyLapseFireBonus: [],
		monthlyAutoNetGrowthBonus: [],
		monthlyFireNetGrowthBonus: [],
		otherActivityBonus: []
	});

	const columns = React.useMemo(
		() => [
			{
				Header: 'PolicyTypes',
				accessor: 'name',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: '%',
				accessor: 'percent',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: '$',
				accessor: 'dollar',
				className: 'font-bold',
				sortable: true
			}
		],
		[dispatch, user.starred]
	);

	const fireColumns = React.useMemo(
		() => [
			{
				Header: 'PolicyTypes',
				accessor: 'name',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: '%',
				accessor: 'percent',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: '$',
				accessor: 'dollar',
				className: 'font-bold',
				sortable: true
			}
		],
		[dispatch, user.starred]
	);

	const lifeColumns = React.useMemo(
		() => [
			{
				Header: 'PolicyTypes',
				accessor: 'name',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: '%',
				accessor: 'percent',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: '$',
				accessor: 'dollar',
				className: 'font-bold',
				sortable: true
			}
		],
		[dispatch, user.starred]
	);

	const healthColumns = React.useMemo(
		() => [
			{
				Header: 'PolicyTypes',
				accessor: 'name',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: '%',
				accessor: 'percent',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: '$',
				accessor: 'dollar',
				className: 'font-bold',
				sortable: true
			}
		],
		[dispatch, user.starred]
	);

	const bankColumns = React.useMemo(
		() => [
			{
				Header: 'PolicyTypes',
				accessor: 'name',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: '%',
				accessor: 'percent',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: '$',
				accessor: 'dollar',
				className: 'font-bold',
				sortable: true
			}
		],
		[dispatch, user.starred]
	);

	const individualAutoTargetBonusColumns = React.useMemo(
		() => [
			{
				Header: 'Individual Auto Target Bonus',
				accessor: 'level',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: 'Policies',
				accessor: 'policies',
				className: 'font-bold',
				sortable: true
			},
			{
				accessor: !showAutoTargetAmount ? 'amount' : 'dollar',
				className: 'font-bold',
				disableSortBy: true,
				Header: ({ original }) => {
					return (
						<FormControl className={classes.formControl}>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={showAutoTargetAmount}
								onChange={() => dispatch(changeAutoTargetValue(!showAutoTargetAmount))}
							>
								<MenuItem value={false}>$ of Auto Premium</MenuItem>
								<MenuItem value={true}>Flat $ Amount</MenuItem>
							</Select>
						</FormControl>
					);
				}
			}
		],
		[dispatch, user.starred, showAutoTargetAmount]
	);

	const individualFireTargetBonusColumns = React.useMemo(
		() => [
			{
				Header: 'Individual Fire Target Bonus',
				accessor: 'level',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: 'Policies',
				accessor: 'policies',
				className: 'font-bold',
				sortable: true
			},
			{
				accessor: !showFireTargetAmount ? 'amount' : 'dollar',
				className: 'font-bold',
				disableSortBy: true,
				Header: ({ original }) => (
					<FormControl className={classes.formControl}>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={showFireTargetAmount}
							onChange={() => dispatch(changeFireTargetValue(!showFireTargetAmount))}
						>
							<MenuItem value={false}>$ of Fire Premium</MenuItem>
							<MenuItem value={true}>Flat $ Amount</MenuItem>
						</Select>
					</FormControl>
				)
			}
		],
		[dispatch, user.starred, showFireTargetAmount]
	);

	const individualLifeTargetBonusColumns = React.useMemo(
		() => [
			{
				Header: 'Individual Life Target Bonus',
				accessor: 'level',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: 'Policies',
				accessor: 'policies',
				className: 'font-bold',
				sortable: true
			},
			{
				accessor: !showLifeTargetAmount ? 'amount' : 'dollar',
				className: 'font-bold',
				disableSortBy: true,
				Header: ({ original }) => (
					<FormControl className={classes.formControl}>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={showLifeTargetAmount}
							onChange={() => dispatch(changeLifeTargetValue(!showLifeTargetAmount))}
						>
							<MenuItem value={false}>$ of Life Premium</MenuItem>
							<MenuItem value={true}>Flat $ Amount</MenuItem>
						</Select>
					</FormControl>
				)
			}
		],
		[dispatch, user.starred, showLifeTargetAmount]
	);

	const individualHealthTargetBonusColumns = React.useMemo(
		() => [
			{
				Header: 'Individual Health Target Bonus',
				accessor: 'level',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: 'Policies',
				accessor: 'policies',
				className: 'font-bold',
				sortable: true
			},
			{
				accessor: !showHealthTargetAmount ? 'amount' : 'dollar',
				className: 'font-bold',
				disableSortBy: true,
				Header: ({ original }) => (
					<FormControl className={classes.formControl}>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={showHealthTargetAmount}
							onChange={() => dispatch(changeHealthTargetValue(!showHealthTargetAmount))}
						>
							<MenuItem value={false}>$ of Health Premium</MenuItem>
							<MenuItem value={true}>Flat $ Amount</MenuItem>
						</Select>
					</FormControl>
				)
			}
		],
		[dispatch, user.starred, showHealthTargetAmount]
	);

	const individualBankTargetBonusColumns = React.useMemo(
		() => [
			{
				Header: 'Individual Bank Target Bonus',
				accessor: 'level',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: 'Policies',
				accessor: 'policies',
				className: 'font-bold',
				sortable: true
			},
			{
				accessor: !showBankTargetAmount ? 'amount' : 'dollar',
				className: 'font-bold',
				disableSortBy: true,
				Header: ({ original }) => (
					<FormControl className={classes.formControl}>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={showBankTargetAmount}
							onChange={() => dispatch(changeBankTargetValue(!showBankTargetAmount))}
						>
							<MenuItem value={false}>$ of Bank Premium</MenuItem>
							<MenuItem value={true}>Flat $ Amount</MenuItem>
						</Select>
					</FormControl>
				)
			}
		],
		[dispatch, user.starred, showBankTargetAmount]
	);

	const teamAutoTargetBonusColumns = React.useMemo(
		() => [
			{
				Header: 'Team Auto Target Bonus',
				accessor: 'level',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: 'Policies',
				accessor: 'policies',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: 'FLAT $ Amount',
				accessor: 'amount',
				className: 'font-bold',
				disableSortBy: true
			}
		],
		[dispatch, user.starred]
	);

	const teamFireTargetBonusColumns = React.useMemo(
		() => [
			{
				Header: 'Team Fire Target Bonus',
				accessor: 'level',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: 'Policies',
				accessor: 'policies',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: 'FLAT $ Amount',
				accessor: 'amount',
				className: 'font-bold',
				sortable: true
			}
		],
		[dispatch, user.starred]
	);

	const teamLifeTargetBonusColumns = React.useMemo(
		() => [
			{
				Header: 'Team Life Target Bonus',
				accessor: 'level',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: 'Policies',
				accessor: 'policies',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: 'FLAT $ Amount',
				accessor: 'amount',
				className: 'font-bold',
				sortable: true
			}
		],
		[dispatch, user.starred]
	);

	const teamHealthTargetBonusColumns = React.useMemo(
		() => [
			{
				Header: 'Team Health Target Bonus',
				accessor: 'level',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: 'Policies',
				accessor: 'policies',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: 'FLAT $ Amount',
				accessor: 'amount',
				className: 'font-bold',
				sortable: true
			}
		],
		[dispatch, user.starred]
	);

	const teamBankTargetBonusColumns = React.useMemo(
		() => [
			{
				Header: 'Team Bank Target Bonus',
				accessor: 'level',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: 'Policies',
				accessor: 'policies',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: 'FLAT $ Amount',
				accessor: 'amount',
				className: 'font-bold',
				sortable: true
			}
		],
		[dispatch, user.starred]
	);

	const monthlyAgencyLapseAutoBonusColumns = React.useMemo(
		() => [
			{
				Header: 'Lapse Rate Bonus',
				accessor: 'name',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: 'Auto',
				accessor: 'percent',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: 'Bonus',
				accessor: 'dollar',
				className: 'font-bold',
				sortable: true
			}
		],
		[dispatch, user.starred]
	);

	const monthlyAgencyLapseFireBonusColumns = React.useMemo(
		() => [
			{
				Header: 'Lapse Rate Bonus',
				accessor: 'name',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: 'Fire',
				accessor: 'percent',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: 'Bonus',
				accessor: 'dollar',
				className: 'font-bold',
				sortable: true
			}
		],
		[dispatch, user.starred]
	);

	const monthlyAutoNetGrowthBonusColumns = React.useMemo(
		() => [
			{
				Header: 'Title',
				accessor: 'name',
				className: 'font-bold',
				sortable: true
			},

			{
				Header: 'Bonus',
				accessor: 'dollar',
				className: 'font-bold',
				sortable: true
			}
		],
		[dispatch, user.starred]
	);

	const monthlyFireNetGrowthBonusColumns = React.useMemo(
		() => [
			{
				Header: 'Title',
				accessor: 'name',
				className: 'font-bold',
				sortable: true
			},

			{
				Header: 'Bonus',
				accessor: 'dollar',
				className: 'font-bold',
				sortable: true
			}
		],
		[dispatch, user.starred]
	);

	const otherActivityBonusColumns = React.useMemo(
		() => [
			{
				Header: 'Title',
				accessor: 'name',
				className: 'font-bold',
				sortable: true
			},

			{
				Header: 'Bonus',
				accessor: 'dollar',
				className: 'font-bold',
				sortable: true
			},
			{
				id: 'action',
				// width: 128,
				sortable: false,
				Header: ({ selectedFlatRows }) => {
					//console.log(selectedFlatRows);
					return (
						<Fab
							color="secondary"
							aria-label="add"
							// className={classes.addButton}
							size="small"
							onClick={() => dispatch(openNewNetBonuseDialog('otherActivityBonus'))}
						>
							<Icon>add</Icon>
						</Fab>
					);
				},
				Cell: ({ row }) => (
					<div className="flex items-center">
						<IconButton
							onClick={ev => {
								ev.stopPropagation();
								dispatch(setRemoveTempData(row.original));
							}}
						>
							<Icon>delete</Icon>
						</IconButton>
					</div>
				)
			}
		],
		[dispatch, user.starred]
	);

	useEffect(() => {
		let tempJSON = {
			autoBonus: [],
			fireBonus: [],
			lifeBonus: [],
			healthBonus: [],
			bankBonus: [],
			individualAutoTargetBonus: [],
			teamAutoTargetBonus: [],
			individualFireTargetBonus: [],
			teamFireTargetBonus: [],
			individualLifeTargetBonus: [],
			teamLifeTargetBonus: [],
			individualHealthTargetBonus: [],
			teamHealthTargetBonus: [],
			individualBankTargetBonus: [],
			teamBankTargetBonus: [],
			monthlyAgencyLapseAutoBonus: [],
			monthlyAgencyLapseFireBonus: [],
			monthlyAutoNetGrowthBonus: [],
			monthlyFireNetGrowthBonus: [],
			otherActivityBonus: []
		};
		if (contacts) {			
			Object.keys(contacts).map((item, index) => {
				if (item.includes('autoBonus')) {
					const tempData = [];
					Object.keys(contacts.autoBonus).map(i => {
						tempData.push(contacts['autoBonus'][i]);
					});
					tempJSON = { ...tempJSON, autoBonus: tempData };
				} else if (item.includes('fireBonus')) {
					const tempData = [];
					Object.keys(contacts.fireBonus).map(i => {
						tempData.push(contacts['fireBonus'][i]);
					});
					tempJSON = { ...tempJSON, fireBonus: tempData };
				} else if (item.includes('lifeBonus')) {
					const tempData = [];
					Object.keys(contacts.lifeBonus).map(i => {
						tempData.push(contacts['lifeBonus'][i]);
					});
					tempJSON = { ...tempJSON, lifeBonus: tempData };
				} else if (item.includes('healthBonus')) {
					const tempData = [];
					Object.keys(contacts.healthBonus).map(i => {
						tempData.push(contacts['healthBonus'][i]);
					});
					tempJSON = { ...tempJSON, healthBonus: tempData };
				} else if (item.includes('bankBonus')) {
					const tempData = [];
					Object.keys(contacts.bankBonus).map(i => {
						tempData.push(contacts['bankBonus'][i]);
					});
					tempJSON = { ...tempJSON, bankBonus: tempData };
				} else if (item.includes('individualAutoTargetBonus')) {
					const tempData = [];
					Object.keys(contacts.individualAutoTargetBonus).map(i => {
						tempData.push(contacts['individualAutoTargetBonus'][i]);
					});
					tempJSON = { ...tempJSON, individualAutoTargetBonus: tempData };
				} else if (item.includes('teamAutoTargetBonus')) {
					const tempData = [];
					Object.keys(contacts.teamAutoTargetBonus).map(i => {
						tempData.push(contacts['teamAutoTargetBonus'][i]);
					});
					tempJSON = { ...tempJSON, teamAutoTargetBonus: tempData };
				} else if (item.includes('individualFireTargetBonus')) {
					const tempData = [];
					Object.keys(contacts.individualFireTargetBonus).map(i => {
						tempData.push(contacts['individualFireTargetBonus'][i]);
					});
					tempJSON = { ...tempJSON, individualFireTargetBonus: tempData };
				} else if (item.includes('individualLifeTargetBonus')) {
					const tempData = [];
					Object.keys(contacts.individualLifeTargetBonus).map(i => {
						tempData.push(contacts['individualLifeTargetBonus'][i]);
					});
					tempJSON = { ...tempJSON, individualLifeTargetBonus: tempData };
				} else if (item.includes('individualHealthTargetBonus')) {
					const tempData = [];
					Object.keys(contacts.individualHealthTargetBonus).map(i => {
						tempData.push(contacts['individualHealthTargetBonus'][i]);
					});
					tempJSON = { ...tempJSON, individualHealthTargetBonus: tempData };
				} else if (item.includes('individualBankTargetBonus')) {
					const tempData = [];
					Object.keys(contacts.individualBankTargetBonus).map(i => {
						tempData.push(contacts['individualBankTargetBonus'][i]);
					});
					tempJSON = { ...tempJSON, individualBankTargetBonus: tempData };
				} else if (item.includes('teamFireTargetBonus')) {
					const tempData = [];
					Object.keys(contacts.teamFireTargetBonus).map(i => {
						tempData.push(contacts['teamFireTargetBonus'][i]);
					});
					tempJSON = { ...tempJSON, teamFireTargetBonus: tempData };
				} else if (item.includes('teamLifeTargetBonus')) {
					const tempData = [];
					Object.keys(contacts.teamLifeTargetBonus).map(i => {
						tempData.push(contacts['teamLifeTargetBonus'][i]);
					});
					tempJSON = { ...tempJSON, teamLifeTargetBonus: tempData };
				} else if (item.includes('teamHealthTargetBonus')) {
					const tempData = [];
					Object.keys(contacts.teamHealthTargetBonus).map(i => {
						tempData.push(contacts['teamHealthTargetBonus'][i]);
					});
					tempJSON = { ...tempJSON, teamHealthTargetBonus: tempData };
				} else if (item.includes('teamBankTargetBonus')) {
					const tempData = [];
					Object.keys(contacts.teamBankTargetBonus).map(i => {
						tempData.push(contacts['teamBankTargetBonus'][i]);
					});
					tempJSON = { ...tempJSON, teamBankTargetBonus: tempData };
				} else if (item.includes('monthlyAgencyLapseAutoBonus')) {
					const tempData = [];
					Object.keys(contacts.monthlyAgencyLapseAutoBonus).map(i => {
						tempData.push(contacts['monthlyAgencyLapseAutoBonus'][i]);
					});
					tempJSON = { ...tempJSON, monthlyAgencyLapseAutoBonus: tempData };
				} else if (item.includes('monthlyAgencyLapseFireBonus')) {
					const tempData = [];
					Object.keys(contacts.monthlyAgencyLapseFireBonus).map(i => {
						tempData.push(contacts['monthlyAgencyLapseFireBonus'][i]);
					});
					tempJSON = { ...tempJSON, monthlyAgencyLapseFireBonus: tempData };
				} else if (item.includes('monthlyAutoNetGrowthBonus')) {
					const tempData = [];
					Object.keys(contacts.monthlyAutoNetGrowthBonus).map(i => {
						tempData.push(contacts['monthlyAutoNetGrowthBonus'][i]);
					});
					tempJSON = { ...tempJSON, monthlyAutoNetGrowthBonus: tempData };
				} else if (item.includes('monthlyFireNetGrowthBonus')) {
					const tempData = [];
					Object.keys(contacts.monthlyFireNetGrowthBonus).map(i => {
						tempData.push(contacts['monthlyFireNetGrowthBonus'][i]);
					});
					tempJSON = { ...tempJSON, monthlyFireNetGrowthBonus: tempData };
				} else if (item.includes('otherActivityBonus')) {
					const tempData = [];
					Object.keys(contacts.otherActivityBonus).map(i => {
						tempData.push(contacts['otherActivityBonus'][i]);
					});
					tempJSON = { ...tempJSON, otherActivityBonus: tempData };
				}
			});
			setState({ ...state, ...tempJSON });
		} else {
			setState({ ...state, ...tempJSON });
		}
	}, [contacts, searchText]);
	// console.log('11111111111', state);
	return (
		<FuseAnimateGroup animation="transition.slideUpIn" delay={300}>
			<Paper className="w-full rounded-8 shadow mb-5">
				<div className="flex items-center justify-between px-16 py-16 border-b-1">
					<Typography className="text-16">PER PRODUCTION COMMISSION (Paid from First Policy)</Typography>
				</div>
				<div className="widget flex w-full ">
				{/* {console.log('bobobobobobo', state.autoBonus)} */}
					<div className="widget flex w-1/5 p-12">
						<BonusPlanTable
							columns={columns}
							data={state.autoBonus}
							onRowClick={(ev, row) => {
								if (row) {
									dispatch(openEditContactDialog(row.original));
								}
							}}
							title="Auto Commission per Written Policy"
							id="autoBonus"
						/>
					</div>
					<div className="widget flex w-1/5 p-12">
						<BonusPlanTable
							columns={fireColumns}
							data={state.fireBonus}
							onRowClick={(ev, row) => {
								if (row) {
									dispatch(openEditContactDialog(row.original));
								}
							}}
							title="Fire Commission per Written Policy"
							id="fireBonus"
						/>
					</div>
					<div className="widget flex w-1/5 p-12">
						<BonusPlanTable
							columns={lifeColumns}
							data={state.lifeBonus}
							onRowClick={(ev, row) => {
								if (row) {
									dispatch(openEditContactDialog(row.original));
								}
							}}
							title="Life Commission per Written Policy"
							id="lifeBonus"
						/>
					</div>
					<div className="widget flex w-1/5 p-12">
						<BonusPlanTable
							columns={healthColumns}
							data={state.healthBonus}
							onRowClick={(ev, row) => {
								if (row) {
									dispatch(openEditContactDialog(row.original));
								}
							}}
							title="Health Commission per Written Policy"
							id="healthBonus"
						/>
					</div>
					<div className="widget flex w-1/5 p-12">
						<BonusPlanTable
							columns={bankColumns}
							data={state.bankBonus}
							onRowClick={(ev, row) => {
								if (row) {
									dispatch(openEditContactDialog(row.original));
								}
							}}
							title="Bank Commission per Written Policy"
							id="bankBonus"
						/>
					</div>
				</div>
			</Paper>

			<Paper className="w-full rounded-8 shadow">
				<div className="flex items-center justify-between px-16 py-16 border-b-1">
					<Typography className="text-16">
						MONTHLY TARGET BONUSES (Paid in Addition to Initial Bonuses)
					</Typography>
				</div>
				<div className="widget flex w-full flex-wrap">
					<div className="widget flex w-1/5 p-12">
						{/* {console.log(state.individualAutoTargetBonus)} */}
						<BonusPlanTable
							columns={individualAutoTargetBonusColumns}
							data={state.individualAutoTargetBonus}
							onRowClick={(ev, row) => {
								if (row) {
									dispatch(openEditTargetBonusDialog(row.original));
								}
							}}
							title=""
							id="individualAutoTargetBonus"
						/>
					</div>
					<div className="widget flex w-1/5 p-12">
						<BonusPlanTable
							columns={individualFireTargetBonusColumns}
							data={state.individualFireTargetBonus}
							onRowClick={(ev, row) => {
								if (row) {
									dispatch(openEditTargetBonusDialog(row.original));
								}
							}}
							title=""
							id="individualFireTargetBonus"
						/>
					</div>
					<div className="widget flex w-1/5 p-12">
						<BonusPlanTable
							columns={individualLifeTargetBonusColumns}
							data={state.individualLifeTargetBonus}
							onRowClick={(ev, row) => {
								if (row) {
									dispatch(openEditTargetBonusDialog(row.original));
								}
							}}
							title=""
							id="individualLifeTargetBonus"
						/>
					</div>
					<div className="widget flex w-1/5 p-12">
						<BonusPlanTable
							columns={individualHealthTargetBonusColumns}
							data={state.individualHealthTargetBonus}
							onRowClick={(ev, row) => {
								if (row) {
									dispatch(openEditTargetBonusDialog(row.original));
								}
							}}
							title=""
							id="individualHealthTargetBonus"
						/>
					</div>
					<div className="widget flex w-1/5 p-12">
						<BonusPlanTable
							columns={individualBankTargetBonusColumns}
							data={state.individualBankTargetBonus}
							onRowClick={(ev, row) => {
								if (row) {
									dispatch(openEditTargetBonusDialog(row.original));
								}
							}}
							title=""
							id="individualBankTargetBonus"
						/>
					</div>
					<div className="widget flex w-1/5 p-12">
						<BonusPlanTable
							columns={teamAutoTargetBonusColumns}
							data={state.teamAutoTargetBonus}
							onRowClick={(ev, row) => {
								if (row) {
									dispatch(openEditTeamTargetBonusDialog(row.original));
								}
							}}
							title=""
							id="teamAutoTargetBonus"
						/>
					</div>
					<div className="widget flex w-1/5 p-12">
						<BonusPlanTable
							columns={teamFireTargetBonusColumns}
							data={state.teamFireTargetBonus}
							onRowClick={(ev, row) => {
								if (row) {
									dispatch(openEditTeamTargetBonusDialog(row.original));
								}
							}}
							title=""
							id="teamFireTargetBonus"
						/>
					</div>
					<div className="widget flex w-1/5 p-12">
						<BonusPlanTable
							columns={teamLifeTargetBonusColumns}
							data={state.teamLifeTargetBonus}
							onRowClick={(ev, row) => {
								if (row) {
									dispatch(openEditTeamTargetBonusDialog(row.original));
								}
							}}
							title=""
							id="teamLifeTargetBonus"
						/>
					</div>
					<div className="widget flex w-1/5 p-12">
						<BonusPlanTable
							columns={teamHealthTargetBonusColumns}
							data={state.teamHealthTargetBonus}
							onRowClick={(ev, row) => {
								if (row) {
									dispatch(openEditTeamTargetBonusDialog(row.original));
								}
							}}
							title=""
							id="teamHealthTargetBonus"
						/>
					</div>
					<div className="widget flex w-1/5 p-12">
						<BonusPlanTable
							columns={teamBankTargetBonusColumns}
							data={state.teamBankTargetBonus}
							onRowClick={(ev, row) => {
								if (row) {
									dispatch(openEditTeamTargetBonusDialog(row.original));
								}
							}}
							title=""
							id="teamBankTargetBonus"
						/>
					</div>
				</div>
			</Paper>
			<div className="flex">
				<Paper className="w-1/2 rounded-8 shadow my-5 mr-3">
					<div className="flex items-center justify-between px-16 py-16 border-b-1">
						<Typography className="text-16">MONTHLY AGENCY LAPSE RATE BONUSES</Typography>
					</div>
					<div className="widget flex w-full flex-wrap mr-3">
						<div className="widget flex w-1/2 p-12">
							<BonusPlanTable
								columns={monthlyAgencyLapseAutoBonusColumns}
								data={state.monthlyAgencyLapseAutoBonus}
								onRowClick={(ev, row) => {
									if (row) {
										dispatch(openEditContactDialog(row.original));
									}
								}}
								title=""
								id="monthlyAgencyLapseAutoBonus"
							/>
						</div>
						<div className="widget flex w-1/2 p-12">
							<BonusPlanTable
								columns={monthlyAgencyLapseFireBonusColumns}
								data={state.monthlyAgencyLapseFireBonus}
								onRowClick={(ev, row) => {
									if (row) {
										dispatch(openEditContactDialog(row.original));
									}
								}}
								title=""
								id="monthlyAgencyLapseFireBonus"
							/>
						</div>
					</div>
				</Paper>

				<Paper className="w-1/4 rounded-8 shadow my-5 mx-3">
					<div className="flex items-center justify-between px-16 py-16 border-b-1">
						<Typography className="text-16">NET POLICY GROWTH BONUS</Typography>
					</div>
					<div className="widget w-full flex-wrap">
						<div className="widget flex w-full p-12">
							<BonusPlanTable
								columns={monthlyAutoNetGrowthBonusColumns}
								data={state.monthlyAutoNetGrowthBonus}
								onRowClick={(ev, row) => {
									if (row) {
										dispatch(openEditNetBonusDialog(row.original));
									}
								}}
								title="Monthly Auto NET Growth Bonus"
								id="monthlyAutoNetGrowthBonus"
							/>
						</div>
						<div className="widget flex w-full p-12">
							<BonusPlanTable
								columns={monthlyFireNetGrowthBonusColumns}
								data={state.monthlyFireNetGrowthBonus}
								onRowClick={(ev, row) => {
									if (row) {
										dispatch(openEditNetBonusDialog(row.original));
									}
								}}
								title="Monthly Fire NET Growth Bonus"
								id="monthlyFireNetGrowthBonus"
							/>
						</div>
					</div>
				</Paper>
				<Paper className="w-1/4 rounded-8 shadow my-5 ml-3">
					<div className="flex items-center justify-between px-16 py-16 border-b-1">
						<Typography className="text-16">OTHER ACTIVITY BONUSES</Typography>
					</div>
					<div className="widget w-full flex-wrap">
						<div className="widget flex w-full p-12">
							<BonusPlanTable
								columns={otherActivityBonusColumns}
								data={state.otherActivityBonus}
								onRowClick={(ev, row) => {
									if (row) {
										dispatch(openEditNetBonusDialog(row.original));
									}
								}}
								title="OTHER ACTIVITY BONUSES"
								id="otherActivityBonus"
							/>
						</div>
					</div>
				</Paper>
			</div>
		</FuseAnimateGroup>
	);
}

export default ContactsList;
