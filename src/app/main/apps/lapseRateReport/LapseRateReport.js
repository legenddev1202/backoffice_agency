import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageSimple from '@fuse/core/FusePageSimple';
import Hidden from '@material-ui/core/Hidden';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import _ from '@lodash';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import reducer from './store';
import { selectProjects, getProjects } from './store/lapseSlice';
import { getAutoBonus, selectContacts } from './store/bonusPlanSlice';
import { getWidgets, selectWidgets } from './store/widgetsSlice';
import { rows, columns, levelColumns, firerows, liferows, healthrows } from './tableDataTemplate';
import Widget10 from './widgets/Widget10';
import TargetTable from './widgets/TargetTable';
import { saveLapseRate, saveFireLapseRate, saveLifeLapseRate, saveHealthLapseRate } from './store/lapseSlice';
import { getUsers, selectUsers } from './store/userSlice';
import moment from 'moment';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';

const useStyles = makeStyles(theme => ({
	content: {
		'& canvas': {
			maxHeight: '100%'
		}
	},
	selectedProject: {
		background: theme.palette.primary.main,
		color: theme.palette.primary.contrastText,
		borderRadius: '8px 0 0 0'
	},
	projectMenuButton: {
		background: theme.palette.primary.main,
		color: theme.palette.primary.contrastText,
		borderRadius: '0 8px 0 0',
		marginLeft: 1
	}
}));

let months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
];

var userCount = 0;

function ProjectDashboardApp(props) {
	const dispatch = useDispatch();
	const widgets = useSelector(selectWidgets);
	const projects = useSelector(selectProjects);
	const users = useSelector(selectUsers);
	const belongTo = localStorage.getItem('@BELONGTO');
	const [date, setDate] = useState(moment());

	useEffect(() => {
		if (users.length > 0) {
			users.map(item => {
				if (item.belongTo === belongTo) {
					userCount++;
				}
			});
		}
	}, [users]);
	const contacts = useSelector(selectContacts);
	const classes = useStyles(props);
	const pageLayout = useRef(null);
	const [tabValue, setTabValue] = useState(0);
	const [selectedProject, setSelectedProject] = useState({
		id: 1,
		menuEl: null
	});
	const [state, setState] = useState({
		autoRows: { ...rows },
		fireRows: { ...firerows },
		lifeRows: liferows,
		healthRows: healthrows,
		monthlyAgencyLapseAutoBonus: [],
		monthlyAgencyLapseFireBonus: []
	});

	useEffect(() => {
		dispatch(getWidgets());
		dispatch(getProjects(moment(date).format('yyyy')));
		dispatch(getAutoBonus());
		dispatch(getUsers());
	}, [dispatch, date]);

	useEffect(() => {
		if (projects.length > 0) {
			console.log(projects[0]);
			var data = { ...projects[0] };
			var tempRows = { ...rows };
			var tempFireRows = { ...firerows };
			if (Object.keys(projects[0]).includes('Auto')) {
				Object.keys(data['Auto']).map(month => {
					Object.keys(data['Auto'][month]).map(policy => {
						if (month !== 'id') {
							var value = data['Auto'][month][policy].value;
							tempRows[month][policy].value = value;
						}
					});
				});
			}

			if (Object.keys(projects[0]).includes('Fire')) {
				Object.keys(data['Fire']).map(month => {
					Object.keys(data['Fire'][month]).map(policy => {
						if (month !== 'id') {
							var value = data['Fire'][month][policy].value;
							tempFireRows[month][policy].value = value;
						}
					});
				});
			}

			if (Object.keys(projects[0]).includes('Life')) {
				Object.keys(data['Life']).map(month => {
					Object.keys(data['Life'][month]).map(policy => {
						if (month !== 'id') {
							var value = data['Life'][month][policy].value;
							liferows[month][policy].value = value;
						}
					});
				});
			}

			if (Object.keys(projects[0]).includes('Health')) {
				Object.keys(data['Health']).map(month => {
					Object.keys(data['Health'][month]).map(policy => {
						console.log(policy);
						if (month !== 'id') {
							var value = data['Health'][month][policy].value;
							healthrows[month][policy].value = value;
						}
					});
				});
			}
			setState({ ...state, autoRows: tempRows, fireRows: tempFireRows, healthRows: healthrows });
		} else {
			var data = { ...rows };
			var tempRows = { ...rows };
			var tempFireRows = { ...firerows };

			Object.keys(data).map(month => {
				Object.keys(data[month]).map(policy => {
					if (month !== 'id' && policy !== 'month') {
						tempRows[month][policy].value = '';
					}
				});
			});

			Object.keys(data).map(month => {
				Object.keys(data[month]).map(policy => {
					if (month !== 'id' && policy !== 'month') {
						tempFireRows[month][policy].value = '';
					}
				});
			});

			setState({ ...state, autoRows: tempRows, fireRows: tempFireRows, healthRows: healthrows });
		}
	}, [projects]);

	useEffect(() => {
		let tempJSON = {
			monthlyAgencyLapseAutoBonus: [],
			monthlyAgencyLapseFireBonus: []
		};

		if (contacts.length > 0) {
			Object.keys(contacts[0]).map((item, index) => {
				if (item.includes('monthlyAgencyLapseAutoBonus')) {
					const tempData = [];
					Object.keys(contacts[0].monthlyAgencyLapseAutoBonus).map(i => {
						tempData.push(contacts[0]['monthlyAgencyLapseAutoBonus'][i]);
					});
					tempJSON = { ...tempJSON, monthlyAgencyLapseAutoBonus: tempData };
				} else if (item.includes('monthlyAgencyLapseFireBonus')) {
					const tempData = [];
					Object.keys(contacts[0].monthlyAgencyLapseFireBonus).map(i => {
						tempData.push(contacts[0]['monthlyAgencyLapseFireBonus'][i]);
					});
					tempJSON = { ...tempJSON, monthlyAgencyLapseFireBonus: tempData };
				}
			});
			setState({ ...state, ...tempJSON });
		}
	}, [contacts]);

	function alignJson(data) {
		var temp = {};
		Object.keys(data).map(i => {
			temp = { ...temp, [data[i].name]: { dollar: data[i].dollar, percent: data[i].percent } };
		});
		return temp;
	}

	function getLevel(origin, value) {
		if (
			parseFloat(origin['level 1'].percent) >= parseFloat(value) &&
			parseFloat(origin['level 2'].percent) < parseFloat(value)
		) {
			if (
				parseFloat(origin['level 1'].percent) -
					(parseFloat(origin['level 1'].percent) - parseFloat(origin['level 2'].percent)) / 2 <
				parseFloat(value)
			) {
				return 'level 1';
			} else {
				return 'level 2';
			}
		} else if (
			parseFloat(origin['level 2'].percent) >= parseFloat(value) &&
			parseFloat(origin['level 3'].percent) < parseFloat(value)
		) {
			if (
				parseFloat(origin['level 2'].percent) -
					(parseFloat(origin['level 2'].percent) - parseFloat(origin['level 3'].percent)) / 2 <
				parseFloat(value)
			) {
				return 'level 2';
			} else {
				return 'level 3';
			}
		} else if (
			parseFloat(origin['level 3'].percent) >= parseFloat(value) &&
			parseFloat(origin['level 4'].percent) < parseFloat(value)
		) {
			if (
				parseFloat(origin['level 3'].percent) -
					(parseFloat(origin['level 3'].percent) - parseFloat(origin['level 4'].percent)) / 2 <
				parseFloat(value)
			) {
				return 'level 3';
			} else {
				return 'level 4';
			}
		} else if (
			parseFloat(origin['level 4'].percent) >= parseFloat(value) &&
			parseFloat(origin['level 5'].percent) < parseFloat(value)
		) {
			if (
				parseFloat(origin['level 4'].percent) -
					(parseFloat(origin['level 4'].percent) - parseFloat(origin['level 5'].percent)) / 2 <
				parseFloat(value)
			) {
				return 'level 4';
			} else {
				return 'level 5';
			}
		} else if (parseFloat(origin['level 5'].percent) === parseFloat(value)) {
			return 'level 5';
		}

		return 0;
	}

	function handleChangeValue(value, month, field, title) {
		if (title === 'Auto') {
			let monthIndex = months.indexOf(month);
			let previousMonthValue = '-';
			let nextMonthValue = '-';
			if (monthIndex !== 0) {
				previousMonthValue =
					Math.round(
						(parseFloat(value) - parseFloat(state.autoRows[months[monthIndex - 1]].lapseRate.value || 0)) *
							100
					) / 100;
				if (month !== 'December')
					if (parseFloat(state.autoRows[months[monthIndex + 1]].lapseRate.value || 0) !== 0) {
						nextMonthValue =
							Math.round(
								(parseFloat(state.autoRows[months[monthIndex + 1]].lapseRate.value || 0) -
									parseFloat(value)) *
									100
							) / 100;
					} else {
						nextMonthValue = '-';
					}
			}
			if (month !== 'December') {
				let temp = {
					...state.autoRows,
					[month]: {
						...state.autoRows[month],
						[field]: { ...state.autoRows[month][field], value: value },
						level: { ...state.autoRows[month].level, value: 'none' },
						previousMonth: { ...state.autoRows[month].previousMonth, value: previousMonthValue }
					},
					[months[monthIndex + 1]]: {
						...state.autoRows[months[monthIndex + 1]],
						previousMonth: {
							...state.autoRows[months[monthIndex + 1]].previousMonth,
							value: nextMonthValue
						}
					}
				};

				if (contacts.length > 0) {
					Object.keys(contacts[0]).map((item, index) => {
						if (item.includes('monthlyAgencyLapseAutoBonus')) {
							var alignedBonus = alignJson(contacts[0].monthlyAgencyLapseAutoBonus);
							var level = getLevel(alignedBonus, value);

							temp = {
								...state.autoRows,
								[month]: {
									...state.autoRows[month],
									level: {
										...state.autoRows[month].level,
										value: level ? level : 'none'
									},
									totalBonus: {
										...state.autoRows[month].totalBonus,
										value: level ? alignedBonus[level].dollar * userCount : ''
									},
									[field]: { ...state.autoRows[month][field], value: value },
									previousMonth: {
										...state.autoRows[month].previousMonth,
										value: previousMonthValue
									}
								},
								[months[monthIndex + 1]]: {
									...state.autoRows[months[monthIndex + 1]],
									previousMonth: {
										...state.autoRows[months[monthIndex + 1]].previousMonth,
										value: nextMonthValue
									}
								}
							};
						}
					});
				}
				dispatch(saveLapseRate({ ...temp, year: moment(date).format('yyyy') }));
				setState({ ...state, autoRows: temp });
			}
		} else if (title === 'Fire') {
			let monthIndex = months.indexOf(month);
			let previousMonthValue = '-';
			let nextMonthValue = '-';
			if (monthIndex !== 0) {
				previousMonthValue =
					Math.round(
						(parseFloat(value) - parseFloat(state.fireRows[months[monthIndex - 1]].lapseRate.value || 0)) *
							100
					) / 100;
				if (month !== 'December')
					if (parseFloat(state.fireRows[months[monthIndex + 1]].lapseRate.value || 0) !== 0) {
						nextMonthValue =
							Math.round(
								(parseFloat(state.fireRows[months[monthIndex + 1]].lapseRate.value || 0) -
									parseFloat(value)) *
									100
							) / 100;
					} else {
						nextMonthValue = '-';
					}
			}
			if (month !== 'December') {
				let temp = {
					...state.fireRows,
					[month]: {
						...state.fireRows[month],
						[field]: { ...state.fireRows[month][field], value: value },
						level: { ...state.fireRows[month].level, value: 'none' },
						previousMonth: { ...state.fireRows[month].previousMonth, value: previousMonthValue }
					},
					[months[monthIndex + 1]]: {
						...state.fireRows[months[monthIndex + 1]],
						previousMonth: {
							...state.fireRows[months[monthIndex + 1]].previousMonth,
							value: nextMonthValue
						}
					}
				};

				if (contacts.length > 0) {
					Object.keys(contacts[0]).map((item, index) => {
						if (item.includes('monthlyAgencyLapseFireBonus')) {
					
							var alignedBonus = alignJson(contacts[0].monthlyAgencyLapseFireBonus);
							var level = getLevel(alignedBonus, value);

							temp = {
								...state.fireRows,
								[month]: {
									...state.fireRows[month],
									level: {
										...state.fireRows[month].level,
										value: level ? level : 'none'
									},
									totalBonus: {
										...state.fireRows[month].totalBonus,
										value: level ? alignedBonus[level].dollar * userCount : ''
									},
									[field]: { ...state.fireRows[month][field], value: value },
									previousMonth: {
										...state.fireRows[month].previousMonth,
										value: previousMonthValue
									}
								},
								[months[monthIndex + 1]]: {
									...state.fireRows[months[monthIndex + 1]],
									previousMonth: {
										...state.fireRows[months[monthIndex + 1]].previousMonth,
										value: nextMonthValue
									}
								}
							};
						}
					});
				}

				dispatch(saveFireLapseRate({ ...temp, year: moment(date).format('yyyy') }));
				setState({ ...state, fireRows: temp });
			}
		}
	}

	function handleChangeYear(date) {
		console.log(date);
		setDate(date);
	}

	if (_.isEmpty(widgets)) {
		return null;
	}

	return (
		<FusePageSimple
			classes={{
				header: 'min-h-80 h-80',
				rightSidebar: 'w-288',
				content: classes.content
			}}
			header={
				<div className="flex items-center px-24">
					<FuseAnimate animation="transition.expandIn" delay={300}>
						<Icon className="text-32">local_activity</Icon>
					</FuseAnimate>
					<FuseAnimate animation="transition.slideLeftIn" delay={300}>
						<Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
							Lapse Rate Entry
						</Typography>
					</FuseAnimate>
					<FuseAnimate animation="transition.slideUpIn" delay={300}>
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<KeyboardDatePicker
								disableToolbar
								variant="inline"
								format="yyyy"
								margin="normal"
								id="date-picker-inline"
								label="Year"
								value={date}
								onChange={handleChangeYear}
								KeyboardButtonProps={{
									'aria-label': 'change date'
								}}
								views={['year']}
							/>
						</MuiPickersUtilsProvider>
					</FuseAnimate>
				</div>
			}
			content={
				<div className="p-12">
					{tabValue === 0 && (
						<FuseAnimateGroup
							className="flex flex-wrap"
							enter={{
								animation: 'transition.slideUpBigIn'
							}}
						>
							{console.log(state.autoRows)}
							<div className="widget flex w-full p-12 flex-wrap">
								<div className="widget flex w-1/2 p-12">
									<Widget10
										columns={columns}
										rows={state.autoRows}
										title="Auto"
										handleChangeValue={handleChangeValue}
									/>
								</div>
								<div className="widget flex w-1/2 p-12">
									<Widget10
										columns={columns}
										rows={state.fireRows}
										title="Fire"
										handleChangeValue={handleChangeValue}
									/>
								</div>
								{/* <div className="widget flex w-1/2 p-12">
									<Widget10
										columns={columns}
										rows={state.lifeRows}
										title="Life"
										handleChangeValue={handleChangeValue}
									/>
								</div>
								<div className="widget flex w-1/2 p-12">
									<Widget10
										columns={columns}
										rows={state.healthRows}
										title="Health"
										handleChangeValue={handleChangeValue}
									/>
								</div> */}
							</div>

							<div className="widget flex w-full p-12">
								{console.log(state.monthlyAgencyLapseAutoBonus)}
								<div className="widget flex w-full p-12">
									<TargetTable
										columns={levelColumns}
										rows={state.monthlyAgencyLapseAutoBonus}
										title="Target Levels & Bonus Schedule"
									/>
								</div>
								{/* <div className="widget flex w-1/2 p-12">
									<TargetTable
										columns={levelColumns}
										rows={state.monthlyAgencyLapseFireBonus}
										title="Target Levels & Bonus Schedule"
									/>
								</div> */}
							</div>
						</FuseAnimateGroup>
					)}
				</div>
			}
			ref={pageLayout}
		/>
	);
}

export default withReducer('lapseRate', reducer)(ProjectDashboardApp);
