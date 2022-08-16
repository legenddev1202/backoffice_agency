import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageSimple from '@fuse/core/FusePageSimple';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import _ from '@lodash';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import reducer from './store';
import { selectProjects, getProjects, saveProduct } from './store/lapseSlice';
import { getAutoBonus, selectContacts } from './store/bonusPlanSlice';
import { getWidgets, selectWidgets } from './store/widgetsSlice';
import {
	rows,
	columns,
	percentrows,
	levelRows,
	numberrows,
	houseHoldColumns,
	householdRows
} from './tableDataTemplate';
import Widget10 from './widgets/Widget10';
import Widget5 from './widgets/Widget5';

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

const months = [
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

function arrayJSON(json) {
	let tempRows = {};
	Object.keys(rows).map(month => {
		Object.keys(rows[month]).map(policy => {
			tempRows = {
				...rows,
				[month]: { ...rows[month], [policy]: { ...json[month][policy] } }
			};
			rows[month][policy].value = json[month][policy].value;
		});
	});
	console.log(tempRows, rows);
	return rows;
}

function ProjectDashboardApp(props) {
	const dispatch = useDispatch();
	const widgets = useSelector(selectWidgets);
	const projects = useSelector(selectProjects);
	const contacts = useSelector(selectContacts);

	const classes = useStyles(props);
	const pageLayout = useRef(null);
	const [tabValue, setTabValue] = useState(0);
	const [selectedProject, setSelectedProject] = useState({
		id: 1,
		menuEl: null
	});
	const [state, setState] = useState({
		autoRows: rows,
		numberRows: numberrows,
		percentRows: percentrows,
		householdRows,
		graphData: widgets.widget5,
		monthlyAgencyLapseAutoBonus: [],
		monthlyAgencyLapseFireBonus: []
	});

	useEffect(() => {
		dispatch(getWidgets());
		dispatch(getProjects());
		dispatch(getAutoBonus());
	}, [dispatch]);

	useEffect(() => {
		if (projects.length > 0) {
			const alignedJSON = arrayJSON(projects[0]);
			const { numberRows, percentRows, perHouseHoldRows } = updateData(alignedJSON);
		}
	}, [projects]);

	useEffect(() => {
		let tempJSON = {
			monthlyAgencyLapseAutoBonus: [],
			monthlyAgencyLapseFireBonus: []
		};
		console.log(contacts);
		if (contacts.length > 0) {
			Object.keys(contacts[0]).map((item, index) => {
				if (item.includes('monthlyAgencyLapseAutoBonus')) {
					const tempData = [];
					Object.keys(contacts[0].monthlyAgencyLapseAutoBonus).map(i => {
						tempData.push(contacts[0].monthlyAgencyLapseAutoBonus[i]);
					});
					tempJSON = { ...tempJSON, monthlyAgencyLapseAutoBonus: tempData };
				} else if (item.includes('monthlyAgencyLapseFireBonus')) {
					const tempData = [];
					Object.keys(contacts[0].monthlyAgencyLapseFireBonus).map(i => {
						tempData.push(contacts[0].monthlyAgencyLapseFireBonus[i]);
					});
					tempJSON = { ...tempJSON, monthlyAgencyLapseFireBonus: tempData };
				}
			});
			setState({ ...state, ...tempJSON });
		}
	}, [contacts]);

	function handleChangeTab(event, value) {
		setTabValue(value);
	}

	function handleChangeProject(id) {
		setSelectedProject({
			id,
			menuEl: null
		});
	}

	function handleOpenProjectMenu(event) {
		setSelectedProject({
			id: selectedProject.id,
			menuEl: event.currentTarget
		});
	}

	function handleCloseProjectMenu() {
		setSelectedProject({
			id: selectedProject.id,
			menuEl: null
		});
	}

	function handleChangeValue(value, month, field, title) {
		const monthIndex = months.indexOf(month);

		if (title === 'Policy Count') {
			const total =
				parseFloat((field === 'auto' ? value : parseInt(state.autoRows[month].auto.value)) || 0) +
				parseFloat((field === 'fire' ? value : parseInt(state.autoRows[month].fire.value)) || 0) +
				parseFloat((field === 'life' ? value : parseInt(state.autoRows[month].life.value)) || 0) +
				parseFloat((field === 'health' ? value : parseInt(state.autoRows[month].health.value)) || 0);
			const temp = {
				...state.autoRows,
				[month]: {
					...state.autoRows[month],
					[field]: { ...state.autoRows[month][field], value },
					total: { ...state.autoRows[month].total, value: total }
				}
			};
			
			const { numberRows, percentRows, perHouseHoldRows } = updateData(temp);
			dispatch(saveProduct({ temp, numberRows, percentRows, perHouseHoldRows }));
			// let numberRows = {
			// 	...temp,
			// 	[month]:{
			// 		...temp[month],
			// 		[field]:{
			// 			...temp[month][field],
			// 			value:temp[month][field].value-temp[months[monthIndex-1]][field].value
			// 		}
			// 	}
			// };
		}
	}

	function updateData(temp) {
		const monthAutoNumberChange = parseInt(temp.January.auto.value ? temp.January.auto.value - temp['31-Dec'].auto.value : 0, 10)+
		parseInt(temp.February.auto.value ? temp.February.auto.value - temp.January.auto.value : 0, 10) +					 
		parseInt(temp.March.auto.value ? temp.March.auto.value - temp.February.auto.value : 0, 10) +
		parseInt(temp.April.auto.value ? temp.April.auto.value - temp.March.auto.value : 0, 10) +
		parseInt(temp.May.auto.value ? temp.May.auto.value - temp.April.auto.value : 0, 10) +
		parseInt(temp.June.auto.value ? temp.June.auto.value - temp.May.auto.value : 0, 10) +
		parseInt(temp.July.auto.value ? temp.July.auto.value - temp.June.auto.value : 0, 10) +
		parseInt(temp.August.auto.value ? temp.August.auto.value - temp.July.auto.value : 0, 10) +
		parseInt(temp.September.auto.value ? temp.September.auto.value - temp.August.auto.value : 0, 10) +
		parseInt(temp.October.auto.value ? temp.October.auto.value - temp.September.auto.value : 0, 10) +
		parseInt(temp.November.auto.value ? temp.November.auto.value - temp.October.auto.value : 0 , 10)+
		parseInt(temp.December.auto.value ? temp.December.auto.value - temp.November.auto.value : 0, 10) 

		const monthFireNumberChange =  parseInt(temp.January.fire.value ? temp.January.fire.value - temp['31-Dec'].fire.value : 0, 10)+
		parseInt(temp.February.fire.value ? temp.February.fire.value - temp.January.fire.value : 0, 10) +					 
		parseInt(temp.March.fire.value ? temp.March.fire.value - temp.February.fire.value : 0, 10) +
		parseInt(temp.April.fire.value ? temp.April.fire.value - temp.March.fire.value : 0, 10) +
		parseInt(temp.May.fire.value ? temp.May.fire.value - temp.April.fire.value : 0, 10) +
		parseInt(temp.June.fire.value ? temp.June.fire.value - temp.May.fire.value : 0, 10) +
		parseInt(temp.July.fire.value ? temp.July.fire.value - temp.June.fire.value : 0, 10) +
		parseInt(temp.August.fire.value ? temp.August.fire.value - temp.July.fire.value : 0, 10) +
		parseInt(temp.September.fire.value ? temp.September.fire.value - temp.August.fire.value : 0, 10) +
		parseInt(temp.October.fire.value ? temp.October.fire.value - temp.September.fire.value : 0, 10) +
		parseInt(temp.November.fire.value ? temp.November.fire.value - temp.October.fire.value : 0 , 10)+
		parseInt(temp.December.fire.value ? temp.December.fire.value - temp.November.fire.value : 0, 10) 

		const monthLifeNumberChange = parseInt(temp.January.life.value ? temp.January.life.value - temp['31-Dec'].life.value : 0, 10)+
		parseInt(temp.February.life.value ? temp.February.life.value - temp.January.life.value : 0, 10) +					 
		parseInt(temp.March.life.value ? temp.March.life.value - temp.February.life.value : 0, 10) +
		parseInt(temp.April.life.value ? temp.April.life.value - temp.March.life.value : 0, 10) +
		parseInt(temp.May.life.value ? temp.May.life.value - temp.April.life.value : 0, 10) +
		parseInt(temp.June.life.value ? temp.June.life.value - temp.May.life.value : 0, 10) +
		parseInt(temp.July.life.value ? temp.July.life.value - temp.June.life.value : 0, 10) +
		parseInt(temp.August.life.value ? temp.August.life.value - temp.July.life.value : 0, 10) +
		parseInt(temp.September.life.value ? temp.September.life.value - temp.August.life.value : 0, 10) +
		parseInt(temp.October.life.value ? temp.October.life.value - temp.September.life.value : 0, 10) +
		parseInt(temp.November.life.value ? temp.November.life.value - temp.October.life.value : 0 , 10)+
		parseInt(temp.December.life.value ? temp.December.life.value - temp.November.life.value : 0, 10) 

		const monthHealthNumberChange = parseInt(temp.January.health.value ? temp.January.health.value - temp['31-Dec'].health.value : 0, 10)+
		parseInt(temp.February.health.value ? temp.February.health.value - temp.January.health.value : 0, 10) +					 
		parseInt(temp.March.health.value ? temp.March.health.value - temp.February.health.value : 0, 10) +
		parseInt(temp.April.health.value ? temp.April.health.value - temp.March.health.value : 0, 10) +
		parseInt(temp.May.health.value ? temp.May.health.value - temp.April.health.value : 0, 10) +
		parseInt(temp.June.health.value ? temp.June.health.value - temp.May.health.value : 0, 10) +
		parseInt(temp.July.health.value ? temp.July.health.value - temp.June.health.value : 0, 10) +
		parseInt(temp.August.health.value ? temp.August.health.value - temp.July.health.value : 0, 10) +
		parseInt(temp.September.health.value ? temp.September.health.value - temp.August.health.value : 0, 10) +
		parseInt(temp.October.health.value ? temp.October.health.value - temp.September.health.value : 0, 10) +
		parseInt(temp.November.health.value ? temp.November.health.value - temp.October.health.value : 0 , 10)+
		parseInt(temp.December.health.value ? temp.December.health.value - temp.November.health.value : 0, 10) 

		const monthHHS = parseInt(temp.January.hhs.value ? temp.January.hhs.value - temp['31-Dec'].hhs.value : 0, 10) +
		parseInt(temp.February.hhs.value ? temp.February.hhs.value - temp.January.hhs.value : 0, 10)+
		parseInt(temp.March.hhs.value ? temp.March.hhs.value - temp.February.hhs.value : 0, 10)+
		parseInt(temp.April.hhs.value ? temp.April.hhs.value - temp.March.hhs.value : 0, 10)+
		parseInt(temp.May.hhs.value ? temp.May.hhs.value - temp.April.hhs.value : 0, 10)+
		parseInt(temp.June.hhs.value ? temp.June.hhs.value - temp.May.hhs.value : 0, 10)+
		parseInt(temp.July.hhs.value ? temp.July.hhs.value - temp.June.hhs.value : 0, 10)+
		parseInt(temp.August.hhs.value ? temp.August.hhs.value - temp.July.hhs.value : 0, 10)+
		parseInt(temp.September.hhs.value ? temp.September.hhs.value - temp.August.hhs.value : 0, 10)+
		parseInt(temp.October.hhs.value ? temp.October.hhs.value - temp.September.hhs.value : 0, 10)+
		parseInt(temp.November.hhs.value ? temp.November.hhs.value - temp.October.hhs.value : 0, 10)+
		parseInt(temp.December.hhs.value ? temp.December.hhs.value - temp.November.hhs.value : 0, 10)


		
		const numberRows = {
			'31-Dec': {
				month: {
					id: 'month',
					value: '31-Dec'
				},
				auto: {
					id: 'auto',
					value:  monthAutoNumberChange
				},
				fire: {
					id: 'fire',
					value: monthFireNumberChange
				},
				life: {
					id: 'life',
					value: monthLifeNumberChange
				},
				health: {
					id: 'health',
					value: monthHealthNumberChange
				},
				total: {
					id: 'total',
					value: 	monthAutoNumberChange +
							monthFireNumberChange +
							monthLifeNumberChange +
							monthHealthNumberChange
				},
				hhs: {
					id: 'hhs',
					value: monthHHS
				}
			},
			January: {
				month: {
					id: 'month',
					value: 'January'
				},
				auto: {
					id: 'auto',
					value: temp.January.auto.value ? temp.January.auto.value - temp['31-Dec'].auto.value : 0
				},
				fire: {
					id: 'fire',
					value: temp.January.fire.value ? temp.January.fire.value - temp['31-Dec'].fire.value : 0
				},
				life: {
					id: 'life',
					value: temp.January.life.value ? temp.January.life.value - temp['31-Dec'].life.value : 0
				},
				health: {
					id: 'health',
					value: temp.January.health.value ? temp.January.health.value - temp['31-Dec'].health.value : 0
				},
				total: {
					id: 'total',
					value: temp.January.total.value ? temp.January.total.value - temp['31-Dec'].total.value : 0
				},
				hhs: {
					id: 'hhs',
					value: temp.January.hhs.value ? temp.January.hhs.value - temp['31-Dec'].hhs.value : 0
				}
			},
			February: {
				month: {
					id: 'month',
					value: 'February'
				},
				auto: {
					id: 'auto',
					value: temp.February.auto.value ? temp.February.auto.value - temp.January.auto.value : 0
				},
				fire: {
					id: 'fire',
					value: temp.February.fire.value ? temp.February.fire.value - temp.January.fire.value : 0
				},
				life: {
					id: 'life',
					value: temp.February.life.value ? temp.February.life.value - temp.January.life.value : 0
				},
				health: {
					id: 'health',
					value: temp.February.health.value ? temp.February.health.value - temp.January.health.value : 0
				},
				total: {
					id: 'total',
					value: temp.February.total.value ? temp.February.total.value - temp.January.total.value : 0
				},
				hhs: {
					id: 'hhs',
					value: temp.February.hhs.value ? temp.February.hhs.value - temp.January.hhs.value : 0
				}
			},
			March: {
				month: {
					id: 'month',
					value: 'March'
				},
				auto: {
					id: 'auto',
					value: temp.March.auto.value ? temp.March.auto.value - temp.February.auto.value : 0
				},
				fire: {
					id: 'fire',
					value: temp.March.fire.value ? temp.March.fire.value - temp.February.fire.value : 0
				},
				life: {
					id: 'life',
					value: temp.March.life.value ? temp.March.life.value - temp.February.life.value : 0
				},
				health: {
					id: 'health',
					value: temp.March.health.value ? temp.March.health.value - temp.February.health.value : 0
				},
				total: {
					id: 'total',
					value: temp.March.total.value ? temp.March.total.value - temp.February.total.value : 0
				},
				hhs: {
					id: 'hhs',
					value: temp.March.hhs.value ? temp.March.hhs.value - temp.February.hhs.value : 0
				}
			},
			April: {
				month: {
					id: 'month',
					value: 'April'
				},
				auto: {
					id: 'auto',
					value: temp.April.auto.value ? temp.April.auto.value - temp.March.auto.value : 0
				},
				fire: {
					id: 'fire',
					value: temp.April.fire.value ? temp.April.fire.value - temp.March.fire.value : 0
				},
				life: {
					id: 'life',
					value: temp.April.life.value ? temp.April.life.value - temp.March.life.value : 0
				},
				health: {
					id: 'health',
					value: temp.April.health.value ? temp.April.health.value - temp.March.health.value : 0
				},
				total: {
					id: 'total',
					value: temp.April.total.value ? temp.April.total.value - temp.March.total.value : 0
				},
				hhs: {
					id: 'hhs',
					value: temp.April.hhs.value ? temp.April.hhs.value - temp.March.hhs.value : 0
				}
			},
			May: {
				month: {
					id: 'month',
					value: 'May'
				},
				auto: {
					id: 'auto',
					value: temp.May.auto.value ? temp.May.auto.value - temp.April.auto.value : 0
				},
				fire: {
					id: 'fire',
					value: temp.May.fire.value ? temp.May.fire.value - temp.April.fire.value : 0
				},
				life: {
					id: 'life',
					value: temp.May.life.value ? temp.May.life.value - temp.April.life.value : 0
				},
				health: {
					id: 'health',
					value: temp.May.health.value ? temp.May.health.value - temp.April.health.value : 0
				},
				total: {
					id: 'total',
					value: temp.May.total.value ? temp.May.total.value - temp.April.total.value : 0
				},
				hhs: {
					id: 'hhs',
					value: temp.May.hhs.value ? temp.May.hhs.value - temp.April.hhs.value : 0
				}
			},
			June: {
				month: {
					id: 'month',
					value: 'June'
				},
				auto: {
					id: 'auto',
					value: temp.June.auto.value ? temp.June.auto.value - temp.May.auto.value : 0
				},
				fire: {
					id: 'fire',
					value: temp.June.fire.value ? temp.June.fire.value - temp.May.fire.value : 0
				},
				life: {
					id: 'life',
					value: temp.June.life.value ? temp.June.life.value - temp.May.life.value : 0
				},
				health: {
					id: 'health',
					value: temp.June.health.value ? temp.June.health.value - temp.May.health.value : 0
				},
				total: {
					id: 'total',
					value: temp.June.total.value ? temp.June.total.value - temp.May.total.value : 0
				},
				hhs: {
					id: 'hhs',
					value: temp.June.hhs.value ? temp.June.hhs.value - temp.May.hhs.value : 0
				}
			},
			July: {
				month: {
					id: 'month',
					value: 'July'
				},
				auto: {
					id: 'auto',
					value: temp.July.auto.value ? temp.July.auto.value - temp.June.auto.value : 0
				},
				fire: {
					id: 'fire',
					value: temp.July.fire.value ? temp.July.fire.value - temp.June.fire.value : 0
				},
				life: {
					id: 'life',
					value: temp.July.life.value ? temp.July.life.value - temp.June.life.value : 0
				},
				health: {
					id: 'health',
					value: temp.July.health.value ? temp.July.health.value - temp.June.health.value : 0
				},
				total: {
					id: 'total',
					value: temp.July.total.value ? temp.July.total.value - temp.June.total.value : 0
				},
				hhs: {
					id: 'hhs',
					value: temp.July.hhs.value ? temp.July.hhs.value - temp.June.hhs.value : 0
				}
			},
			August: {
				month: {
					id: 'month',
					value: 'August'
				},
				auto: {
					id: 'auto',
					value: temp.August.auto.value ? temp.August.auto.value - temp.July.auto.value : 0
				},
				fire: {
					id: 'fire',
					value: temp.August.fire.value ? temp.August.fire.value - temp.July.fire.value : 0
				},
				life: {
					id: 'life',
					value: temp.August.life.value ? temp.August.life.value - temp.July.life.value : 0
				},
				health: {
					id: 'health',
					value: temp.August.health.value ? temp.August.health.value - temp.July.health.value : 0
				},
				total: {
					id: 'total',
					value: temp.August.total.value ? temp.August.total.value - temp.July.total.value : 0
				},
				hhs: {
					id: 'hhs',
					value: temp.August.hhs.value ? temp.August.hhs.value - temp.July.hhs.value : 0
				}
			},
			September: {
				month: {
					id: 'month',
					value: 'September'
				},
				auto: {
					id: 'auto',
					value: temp.September.auto.value ? temp.September.auto.value - temp.August.auto.value : 0
				},
				fire: {
					id: 'fire',
					value: temp.September.fire.value ? temp.September.fire.value - temp.August.fire.value : 0
				},
				life: {
					id: 'life',
					value: temp.September.life.value ? temp.September.life.value - temp.August.life.value : 0
				},
				health: {
					id: 'health',
					value: temp.September.health.value ? temp.September.health.value - temp.August.health.value : 0
				},
				total: {
					id: 'total',
					value: temp.September.total.value ? temp.September.total.value - temp.August.total.value : 0
				},
				hhs: {
					id: 'hhs',
					value: temp.September.hhs.value ? temp.September.hhs.value - temp.August.hhs.value : 0
				}
			},
			October: {
				month: {
					id: 'month',
					value: 'October'
				},
				auto: {
					id: 'auto',
					value: temp.October.auto.value ? temp.October.auto.value - temp.September.auto.value : 0
				},
				fire: {
					id: 'fire',
					value: temp.October.fire.value ? temp.October.fire.value - temp.September.fire.value : 0
				},
				life: {
					id: 'life',
					value: temp.October.life.value ? temp.October.life.value - temp.September.life.value : 0
				},
				health: {
					id: 'health',
					value: temp.October.health.value ? temp.October.health.value - temp.September.health.value : 0
				},
				total: {
					id: 'total',
					value: temp.October.total.value ? temp.October.total.value - temp.September.total.value : 0
				},
				hhs: {
					id: 'hhs',
					value: temp.October.hhs.value ? temp.October.hhs.value - temp.September.hhs.value : 0
				}
			},
			November: {
				month: {
					id: 'month',
					value: 'November'
				},
				auto: {
					id: 'auto',
					value: temp.November.auto.value ? temp.November.auto.value - temp.October.auto.value : 0
				},
				fire: {
					id: 'fire',
					value: temp.November.fire.value ? temp.November.fire.value - temp.October.fire.value : 0
				},
				life: {
					id: 'life',
					value: temp.November.life.value ? temp.November.life.value - temp.October.life.value : 0
				},
				health: {
					id: 'health',
					value: temp.November.health.value ? temp.November.health.value - temp.October.health.value : 0
				},
				total: {
					id: 'total',
					value: temp.November.total.value ? temp.November.total.value - temp.October.total.value : 0
				},
				hhs: {
					id: 'hhs',
					value: temp.November.hhs.value ? temp.November.hhs.value - temp.October.hhs.value : 0
				}
			},
			December: {
				month: {
					id: 'month',
					value: 'December'
				},
				auto: {
					id: 'auto',
					value: temp.December.auto.value ? temp.December.auto.value - temp.November.auto.value : 0
				},
				fire: {
					id: 'fire',
					value: temp.December.fire.value ? temp.December.fire.value - temp.November.fire.value : 0
				},
				life: {
					id: 'life',
					value: temp.December.life.value ? temp.December.life.value - temp.November.life.value : 0
				},
				health: {
					id: 'health',
					value: temp.December.health.value ? temp.December.health.value - temp.November.health.value : 0
				},
				total: {
					id: 'total',
					value: temp.December.total.value ? temp.December.total.value - temp.November.total.value : 0
				},
				hhs: {
					id: 'hhs',
					value: temp.December.hhs.value ? temp.December.hhs.value - temp.November.hhs.value : 0
				}
			}
		};




		const percentRows = {
			'31-Dec': {
				month: {
					id: 'month',
					value: '31-Dec'
				},
				auto: {
					id: 'auto',
					value: temp['31-Dec'].auto.value
						? percentYTDValue(monthAutoNumberChange, temp['31-Dec'].auto.value)
						: 0
				},
				fire: {
					id: 'fire',
					value: temp['31-Dec'].fire.value
						? percentYTDValue(monthFireNumberChange, temp['31-Dec'].fire.value)
						: 0
				},
				life: {
					id: 'life',
					value: temp['31-Dec'].life.value
						? percentYTDValue(monthLifeNumberChange, temp['31-Dec'].life.value)
						: 0
				},
				health: {
					id: 'health',
					value: temp['31-Dec'].health.value
						? percentYTDValue(monthHealthNumberChange, temp['31-Dec'].health.value)
						: 0
				},
				total: {
					id: 'total',
					value: temp.January.total.value
						? percentValue(temp.January.total.value, temp['31-Dec'].total.value)
						: 0
				},
				hhs: {
					id: 'hhs',
					value: temp['31-Dec'].hhs.value ? percentYTDValue(monthHHS, temp['31-Dec'].hhs.value) : 0
				}
			},
			January: {
				month: {
					id: 'month',
					value: 'January'
				},
				auto: {
					id: 'auto',
					value: temp.January.auto.value
						? percentValue(temp.January.auto.value, temp['31-Dec'].auto.value)
						: 0
				},
				fire: {
					id: 'fire',
					value: temp.January.fire.value
						? percentValue(temp.January.fire.value, temp['31-Dec'].fire.value)
						: 0
				},
				life: {
					id: 'life',
					value: temp.January.life.value
						? percentValue(temp.January.life.value, temp['31-Dec'].life.value)
						: 0
				},
				health: {
					id: 'health',
					value: temp.January.health.value
						? percentValue(temp.January.health.value, temp['31-Dec'].health.value)
						: 0
				},
				total: {
					id: 'total',
					value: temp.January.total.value
						? percentValue(temp.January.total.value, temp['31-Dec'].total.value)
						: 0
				},
				hhs: {
					id: 'hhs',
					value: temp.January.hhs.value ? percentValue(temp.January.hhs.value, temp['31-Dec'].hhs.value) : 0
				}
			},
			February: {
				month: {
					id: 'month',
					value: 'February'
				},
				auto: {
					id: 'auto',
					value: temp.February.auto.value
						? percentValue(temp.February.auto.value, temp.January.auto.value)
						: 0
				},
				fire: {
					id: 'fire',
					value: temp.February.fire.value
						? percentValue(temp.February.fire.value, temp.January.fire.value)
						: 0
				},
				life: {
					id: 'life',
					value: temp.February.life.value
						? percentValue(temp.February.life.value, temp.January.life.value)
						: 0
				},
				health: {
					id: 'health',
					value: temp.February.health.value
						? percentValue(temp.February.health.value, temp.January.health.value)
						: 0
				},
				total: {
					id: 'total',
					value: temp.February.total.value
						? percentValue(temp.February.total.value, temp.January.total.value)
						: 0
				},
				hhs: {
					id: 'hhs',
					value: temp.February.hhs.value ? percentValue(temp.February.hhs.value, temp.January.hhs.value) : 0
				}
			},
			March: {
				month: {
					id: 'month',
					value: 'March'
				},
				auto: {
					id: 'auto',
					value: temp.March.auto.value ? percentValue(temp.March.auto.value, temp.February.auto.value) : 0
				},
				fire: {
					id: 'fire',
					value: temp.March.fire.value ? percentValue(temp.March.fire.value, temp.February.fire.value) : 0
				},
				life: {
					id: 'life',
					value: temp.March.life.value ? percentValue(temp.March.life.value, temp.February.life.value) : 0
				},
				health: {
					id: 'health',
					value: temp.March.health.value
						? percentValue(temp.March.health.value, temp.February.health.value)
						: 0
				},
				total: {
					id: 'total',
					value: temp.March.total.value ? percentValue(temp.March.total.value, temp.February.total.value) : 0
				},
				hhs: {
					id: 'hhs',
					value: temp.March.hhs.value ? percentValue(temp.March.hhs.value, temp.February.hhs.value) : 0
				}
			},
			April: {
				month: {
					id: 'month',
					value: 'April'
				},
				auto: {
					id: 'auto',
					value: temp.April.auto.value ? percentValue(temp.April.auto.value, temp.March.auto.value) : 0
				},
				fire: {
					id: 'fire',
					value: temp.April.fire.value ? percentValue(temp.April.fire.value, temp.March.fire.value) : 0
				},
				life: {
					id: 'life',
					value: temp.April.life.value ? percentValue(temp.April.life.value, temp.March.life.value) : 0
				},
				health: {
					id: 'health',
					value: temp.April.health.value ? percentValue(temp.April.health.value, temp.March.health.value) : 0
				},
				total: {
					id: 'total',
					value: temp.April.total.value ? percentValue(temp.April.total.value, temp.March.total.value) : 0
				},
				hhs: {
					id: 'hhs',
					value: temp.April.hhs.value ? percentValue(temp.April.hhs.value, temp.March.hhs.value) : 0
				}
			},
			May: {
				month: {
					id: 'month',
					value: 'May'
				},
				auto: {
					id: 'auto',
					value: temp.May.auto.value ? percentValue(temp.May.auto.value, temp.April.auto.value) : 0
				},
				fire: {
					id: 'fire',
					value: temp.May.fire.value ? percentValue(temp.May.fire.value, temp.April.fire.value) : 0
				},
				life: {
					id: 'life',
					value: temp.May.life.value ? percentValue(temp.May.life.value, temp.April.life.value) : 0
				},
				health: {
					id: 'health',
					value: temp.May.health.value ? percentValue(temp.May.health.value, temp.April.health.value) : 0
				},
				total: {
					id: 'total',
					value: temp.May.total.value ? percentValue(temp.May.total.value, temp.April.total.value) : 0
				},
				hhs: {
					id: 'hhs',
					value: temp.May.hhs.value ? percentValue(temp.May.hhs.value, temp.April.hhs.value) : 0
				}
			},
			June: {
				month: {
					id: 'month',
					value: 'June'
				},
				auto: {
					id: 'auto',
					value: temp.June.auto.value ? percentValue(temp.June.auto.value, temp.May.auto.value) : 0
				},
				fire: {
					id: 'fire',
					value: temp.June.fire.value ? percentValue(temp.June.fire.value, temp.May.fire.value) : 0
				},
				life: {
					id: 'life',
					value: temp.June.life.value ? percentValue(temp.June.life.value, temp.May.life.value) : 0
				},
				health: {
					id: 'health',
					value: temp.June.health.value ? percentValue(temp.June.health.value, temp.May.health.value) : 0
				},
				total: {
					id: 'total',
					value: temp.June.total.value ? percentValue(temp.June.total.value, temp.May.total.value) : 0
				},
				hhs: {
					id: 'hhs',
					value: temp.June.hhs.value ? percentValue(temp.June.hhs.value, temp.May.hhs.value) : 0
				}
			},
			July: {
				month: {
					id: 'month',
					value: 'July'
				},
				auto: {
					id: 'auto',
					value: temp.July.auto.value ? percentValue(temp.July.auto.value, temp.June.auto.value) : 0
				},
				fire: {
					id: 'fire',
					value: temp.July.fire.value ? percentValue(temp.July.fire.value, temp.June.fire.value) : 0
				},
				life: {
					id: 'life',
					value: temp.July.life.value ? percentValue(temp.July.life.value, temp.June.life.value) : 0
				},
				health: {
					id: 'health',
					value: temp.July.health.value ? percentValue(temp.July.health.value, temp.June.health.value) : 0
				},
				total: {
					id: 'total',
					value: temp.July.total.value ? percentValue(temp.July.total.value, temp.June.total.value) : 0
				},
				hhs: {
					id: 'hhs',
					value: temp.July.hhs.value ? percentValue(temp.July.hhs.value, temp.June.hhs.value) : 0
				}
			},
			August: {
				month: {
					id: 'month',
					value: 'August'
				},
				auto: {
					id: 'auto',
					value: temp.August.auto.value ? percentValue(temp.August.auto.value, temp.July.auto.value) : 0
				},
				fire: {
					id: 'fire',
					value: temp.August.fire.value ? percentValue(temp.August.fire.value, temp.July.fire.value) : 0
				},
				life: {
					id: 'life',
					value: temp.August.life.value ? percentValue(temp.August.life.value, temp.July.life.value) : 0
				},
				health: {
					id: 'health',
					value: temp.August.health.value ? percentValue(temp.August.health.value, temp.July.health.value) : 0
				},
				total: {
					id: 'total',
					value: temp.August.total.value ? percentValue(temp.August.total.value, temp.July.total.value) : 0
				},
				hhs: {
					id: 'hhs',
					value: temp.August.hhs.value ? percentValue(temp.August.hhs.value, temp.July.hhs.value) : 0
				}
			},
			September: {
				month: {
					id: 'month',
					value: 'September'
				},
				auto: {
					id: 'auto',
					value: temp.September.auto.value
						? percentValue(temp.September.auto.value, temp.August.auto.value)
						: 0
				},
				fire: {
					id: 'fire',
					value: temp.September.fire.value
						? percentValue(temp.September.fire.value, temp.August.fire.value)
						: 0
				},
				life: {
					id: 'life',
					value: temp.September.life.value
						? percentValue(temp.September.life.value, temp.August.life.value)
						: 0
				},
				health: {
					id: 'health',
					value: temp.September.health.value
						? percentValue(temp.September.health.value, temp.August.health.value)
						: 0
				},
				total: {
					id: 'total',
					value: temp.September.total.value
						? percentValue(temp.September.total.value, temp.August.total.value)
						: 0
				},
				hhs: {
					id: 'hhs',
					value: temp.September.hhs.value ? percentValue(temp.September.hhs.value, temp.August.hhs.value) : 0
				}
			},
			October: {
				month: {
					id: 'month',
					value: 'October'
				},
				auto: {
					id: 'auto',
					value: temp.October.auto.value
						? percentValue(temp.October.auto.value, temp.September.auto.value)
						: 0
				},
				fire: {
					id: 'fire',
					value: temp.October.fire.value
						? percentValue(temp.October.fire.value, temp.September.fire.value)
						: 0
				},
				life: {
					id: 'life',
					value: temp.October.life.value
						? percentValue(temp.October.life.value, temp.September.life.value)
						: 0
				},
				health: {
					id: 'health',
					value: temp.October.health.value
						? percentValue(temp.October.health.value, temp.September.health.value)
						: 0
				},
				total: {
					id: 'total',
					value: temp.October.total.value
						? percentValue(temp.October.total.value, temp.September.total.value)
						: 0
				},
				hhs: {
					id: 'hhs',
					value: temp.October.hhs.value ? percentValue(temp.October.hhs.value, temp.September.hhs.value) : 0
				}
			},
			November: {
				month: {
					id: 'month',
					value: 'November'
				},
				auto: {
					id: 'auto',
					value: temp.November.auto.value
						? percentValue(temp.November.auto.value, temp.October.auto.value)
						: 0
				},
				fire: {
					id: 'fire',
					value: temp.November.fire.value
						? percentValue(temp.November.fire.value, temp.October.fire.value)
						: 0
				},
				life: {
					id: 'life',
					value: temp.November.life.value
						? percentValue(temp.November.life.value, temp.October.life.value)
						: 0
				},
				health: {
					id: 'health',
					value: temp.November.health.value
						? percentValue(temp.November.health.value, temp.October.health.value)
						: 0
				},
				total: {
					id: 'total',
					value: temp.November.total.value
						? percentValue(temp.November.total.value, temp.October.total.value)
						: 0
				},
				hhs: {
					id: 'hhs',
					value: temp.November.hhs.value ? percentValue(temp.November.hhs.value, temp.October.hhs.value) : 0
				}
			},
			December: {
				month: {
					id: 'month',
					value: 'December'
				},
				auto: {
					id: 'auto',
					value: temp.December.auto.value
						? percentValue(temp.December.auto.value, temp.November.auto.value)
						: 0
				},
				fire: {
					id: 'fire',
					value: temp.December.fire.value
						? percentValue(temp.December.fire.value, temp.November.fire.value)
						: 0
				},
				life: {
					id: 'life',
					value: temp.December.life.value
						? percentValue(temp.December.life.value, temp.November.life.value)
						: 0
				},
				health: {
					id: 'health',
					value: temp.December.health.value
						? percentValue(temp.December.health.value, temp.November.health.value)
						: 0
				},
				total: {
					id: 'total',
					value: temp.December.total.value
						? percentValue(temp.December.total.value, temp.November.total.value)
						: 0
				},
				hhs: {
					id: 'hhs',
					value: temp.December.hhs.value ? percentValue(temp.December.hhs.value, temp.November.hhs.value) : 0
				}
			}
		};

		const perHouseHoldRows = {
			'31-Dec': {
				month: {
					id: 'month',
					value: '31-Dec'
				},
				auto: {
					id: 'auto',
					value: temp['31-Dec'].hhs.value
						? houseHoldValue(temp['31-Dec'].auto.value, temp['31-Dec'].hhs.value)
						: 0
				},
				fire: {
					id: 'fire',
					value: temp['31-Dec'].hhs.value
						? houseHoldValue(temp['31-Dec'].fire.value, temp['31-Dec'].hhs.value)
						: 0
				},
				life: {
					id: 'life',
					value: temp['31-Dec'].hhs.value
						? houseHoldValue(temp['31-Dec'].life.value, temp['31-Dec'].hhs.value)
						: 0
				},
				health: {
					id: 'health',
					value: temp['31-Dec'].hhs.value
						? houseHoldValue(temp['31-Dec'].health.value, temp['31-Dec'].hhs.value)
						: 0
				},
				total: {
					id: 'total',
					value: temp['31-Dec'].hhs.value
						? houseHoldValue(temp['31-Dec'].total.value, temp['31-Dec'].hhs.value)
						: 0
				}
			},
			January: {
				month: {
					id: 'month',
					value: 'January'
				},
				auto: {
					id: 'auto',
					value: temp.January.hhs.value ? houseHoldValue(temp.January.auto.value, temp.January.hhs.value) : 0
				},
				fire: {
					id: 'fire',
					value: temp.January.hhs.value ? houseHoldValue(temp.January.fire.value, temp.January.hhs.value) : 0
				},
				life: {
					id: 'life',
					value: temp.January.hhs.value ? houseHoldValue(temp.January.life.value, temp.January.hhs.value) : 0
				},
				health: {
					id: 'health',
					value: temp.January.hhs.value
						? houseHoldValue(temp.January.health.value, temp.January.hhs.value)
						: 0
				},
				total: {
					id: 'total',
					value: temp.January.hhs.value ? houseHoldValue(temp.January.total.value, temp.January.hhs.value) : 0
				}
			},
			February: {
				month: {
					id: 'month',
					value: 'February'
				},
				auto: {
					id: 'auto',
					value: temp.February.hhs.value
						? houseHoldValue(temp.February.auto.value, temp.February.hhs.value)
						: 0
				},
				fire: {
					id: 'fire',
					value: temp.February.hhs.value
						? houseHoldValue(temp.February.fire.value, temp.February.hhs.value)
						: 0
				},
				life: {
					id: 'life',
					value: temp.February.hhs.value
						? houseHoldValue(temp.February.life.value, temp.February.hhs.value)
						: 0
				},
				health: {
					id: 'health',
					value: temp.February.hhs.value
						? houseHoldValue(temp.February.health.value, temp.February.hhs.value)
						: 0
				},
				total: {
					id: 'total',
					value: temp.February.hhs.value
						? houseHoldValue(temp.February.total.value, temp.February.hhs.value)
						: 0
				}
			},
			March: {
				month: {
					id: 'month',
					value: 'March'
				},
				auto: {
					id: 'auto',
					value: temp.March.hhs.value ? houseHoldValue(temp.March.auto.value, temp.March.hhs.value) : 0
				},
				fire: {
					id: 'fire',
					value: temp.March.hhs.value ? houseHoldValue(temp.March.fire.value, temp.March.hhs.value) : 0
				},
				life: {
					id: 'life',
					value: temp.March.hhs.value ? houseHoldValue(temp.March.life.value, temp.March.hhs.value) : 0
				},
				health: {
					id: 'health',
					value: temp.March.hhs.value ? houseHoldValue(temp.March.health.value, temp.March.hhs.value) : 0
				},
				total: {
					id: 'total',
					value: temp.March.hhs.value ? houseHoldValue(temp.March.total.value, temp.March.hhs.value) : 0
				}
			},
			April: {
				month: {
					id: 'month',
					value: 'April'
				},
				auto: {
					id: 'auto',
					value: temp.April.hhs.value ? houseHoldValue(temp.April.auto.value, temp.April.hhs.value) : 0
				},
				fire: {
					id: 'fire',
					value: temp.April.hhs.value ? houseHoldValue(temp.April.fire.value, temp.April.hhs.value) : 0
				},
				life: {
					id: 'life',
					value: temp.April.hhs.value ? houseHoldValue(temp.April.life.value, temp.April.hhs.value) : 0
				},
				health: {
					id: 'health',
					value: temp.April.hhs.value ? houseHoldValue(temp.April.health.value, temp.April.hhs.value) : 0
				},
				total: {
					id: 'total',
					value: temp.April.hhs.value ? houseHoldValue(temp.April.total.value, temp.April.hhs.value) : 0
				}
			},
			May: {
				month: {
					id: 'month',
					value: 'May'
				},
				auto: {
					id: 'auto',
					value: temp.May.hhs.value ? houseHoldValue(temp.May.auto.value, temp.May.hhs.value) : 0
				},
				fire: {
					id: 'fire',
					value: temp.May.hhs.value ? houseHoldValue(temp.May.fire.value, temp.May.hhs.value) : 0
				},
				life: {
					id: 'life',
					value: temp.May.hhs.value ? houseHoldValue(temp.May.life.value, temp.May.hhs.value) : 0
				},
				health: {
					id: 'health',
					value: temp.May.hhs.value ? houseHoldValue(temp.May.health.value, temp.May.hhs.value) : 0
				},
				total: {
					id: 'total',
					value: temp.May.hhs.value ? houseHoldValue(temp.May.total.value, temp.May.hhs.value) : 0
				}
			},
			June: {
				month: {
					id: 'month',
					value: 'June'
				},
				auto: {
					id: 'auto',
					value: temp.June.hhs.value ? houseHoldValue(temp.June.auto.value, temp.June.hhs.value) : 0
				},
				fire: {
					id: 'fire',
					value: temp.June.hhs.value ? houseHoldValue(temp.June.fire.value, temp.June.hhs.value) : 0
				},
				life: {
					id: 'life',
					value: temp.June.hhs.value ? houseHoldValue(temp.June.life.value, temp.June.hhs.value) : 0
				},
				health: {
					id: 'health',
					value: temp.June.hhs.value ? houseHoldValue(temp.June.health.value, temp.June.hhs.value) : 0
				},
				total: {
					id: 'total',
					value: temp.June.hhs.value ? houseHoldValue(temp.June.total.value, temp.June.hhs.value) : 0
				}
			},
			July: {
				month: {
					id: 'month',
					value: 'July'
				},
				auto: {
					id: 'auto',
					value: temp.July.hhs.value ? houseHoldValue(temp.July.auto.value, temp.July.hhs.value) : 0
				},
				fire: {
					id: 'fire',
					value: temp.July.hhs.value ? houseHoldValue(temp.July.fire.value, temp.July.hhs.value) : 0
				},
				life: {
					id: 'life',
					value: temp.July.hhs.value ? houseHoldValue(temp.July.life.value, temp.July.hhs.value) : 0
				},
				health: {
					id: 'health',
					value: temp.July.hhs.value ? houseHoldValue(temp.July.health.value, temp.July.hhs.value) : 0
				},
				total: {
					id: 'total',
					value: temp.July.hhs.value ? houseHoldValue(temp.July.total.value, temp.July.hhs.value) : 0
				}
			},
			August: {
				month: {
					id: 'month',
					value: 'August'
				},
				auto: {
					id: 'auto',
					value: temp.August.hhs.value ? houseHoldValue(temp.August.auto.value, temp.August.hhs.value) : 0
				},
				fire: {
					id: 'fire',
					value: temp.August.hhs.value ? houseHoldValue(temp.August.fire.value, temp.August.hhs.value) : 0
				},
				life: {
					id: 'life',
					value: temp.August.hhs.value ? houseHoldValue(temp.August.life.value, temp.August.hhs.value) : 0
				},
				health: {
					id: 'health',
					value: temp.August.hhs.value ? houseHoldValue(temp.August.health.value, temp.August.hhs.value) : 0
				},
				total: {
					id: 'total',
					value: temp.August.hhs.value ? houseHoldValue(temp.August.total.value, temp.August.hhs.value) : 0
				}
			},
			September: {
				month: {
					id: 'month',
					value: 'September'
				},
				auto: {
					id: 'auto',
					value: temp.September.hhs.value
						? houseHoldValue(temp.September.auto.value, temp.September.hhs.value)
						: 0
				},
				fire: {
					id: 'fire',
					value: temp.September.hhs.value
						? houseHoldValue(temp.September.fire.value, temp.September.hhs.value)
						: 0
				},
				life: {
					id: 'life',
					value: temp.September.hhs.value
						? houseHoldValue(temp.September.life.value, temp.September.hhs.value)
						: 0
				},
				health: {
					id: 'health',
					value: temp.September.hhs.value
						? houseHoldValue(temp.September.health.value, temp.September.hhs.value)
						: 0
				},
				total: {
					id: 'total',
					value: temp.September.hhs.value
						? houseHoldValue(temp.September.total.value, temp.September.hhs.value)
						: 0
				}
			},
			October: {
				month: {
					id: 'month',
					value: 'October'
				},
				auto: {
					id: 'auto',
					value: temp.October.hhs.value ? houseHoldValue(temp.October.auto.value, temp.October.hhs.value) : 0
				},
				fire: {
					id: 'fire',
					value: temp.October.hhs.value ? houseHoldValue(temp.October.fire.value, temp.October.hhs.value) : 0
				},
				life: {
					id: 'life',
					value: temp.October.hhs.value ? houseHoldValue(temp.October.life.value, temp.October.hhs.value) : 0
				},
				health: {
					id: 'health',
					value: temp.October.hhs.value
						? houseHoldValue(temp.October.health.value, temp.October.hhs.value)
						: 0
				},
				total: {
					id: 'total',
					value: temp.October.hhs.value ? houseHoldValue(temp.October.total.value, temp.October.hhs.value) : 0
				}
			},
			November: {
				month: {
					id: 'month',
					value: 'November'
				},
				auto: {
					id: 'auto',
					value: temp.November.hhs.value
						? houseHoldValue(temp.November.auto.value, temp.November.hhs.value)
						: 0
				},
				fire: {
					id: 'fire',
					value: temp.November.hhs.value
						? houseHoldValue(temp.November.fire.value, temp.November.hhs.value)
						: 0
				},
				life: {
					id: 'life',
					value: temp.November.hhs.value
						? houseHoldValue(temp.November.life.value, temp.November.hhs.value)
						: 0
				},
				health: {
					id: 'health',
					value: temp.November.hhs.value
						? houseHoldValue(temp.November.health.value, temp.November.hhs.value)
						: 0
				},
				total: {
					id: 'total',
					value: temp.November.hhs.value
						? houseHoldValue(temp.November.total.value, temp.November.hhs.value)
						: 0
				}
			},
			December: {
				month: {
					id: 'month',
					value: 'December'
				},
				auto: {
					id: 'auto',
					value: temp.December.hhs.value
						? houseHoldValue(temp.December.auto.value, temp.December.hhs.value)
						: 0
				},
				fire: {
					id: 'fire',
					value: temp.December.hhs.value
						? houseHoldValue(temp.December.fire.value, temp.December.hhs.value)
						: 0
				},
				life: {
					id: 'life',
					value: temp.December.hhs.value
						? houseHoldValue(temp.December.life.value, temp.December.hhs.value)
						: 0
				},
				health: {
					id: 'health',
					value: temp.December.hhs.value
						? houseHoldValue(temp.December.health.value, temp.December.hhs.value)
						: 0
				},
				total: {
					id: 'total',
					value: temp.December.hhs.value
						? houseHoldValue(temp.December.total.value, temp.December.hhs.value)
						: 0
				}
			}
		};
		// console.log(perHouseHoldRows);
		setState({
			...state,
			autoRows: temp,
			numberRows,
			percentRows,
			householdRows: perHouseHoldRows,
			graphData: widgets.widget5
		});

		return { numberRows, percentRows, perHouseHoldRows };
	}
	// return null;
	if (_.isEmpty(widgets)) {
		return null;
	}

	function percentValue(value1, value2) {
		if (parseFloat(value2)!==0) {
			if(Math.round(((value1 - value2) / value2) * 10000) / 100!==-100){
				return `${String(Math.round(((value1 - value2) / value2) * 10000) / 100)  }%`;
			} 
				return ""
			
		} if (!value1 && !value2) {
			return '';
		} if (!value2) {
			return '';
		} 
			return '';
		
	}

	function percentYTDValue(value1, value2) {
		if(value1&&value2){
			return `${Math.round(value1/value2*10000)/100}%`
		}
		return "";
		
	}

	function houseHoldValue(value1, value2) {
		return String(Math.round((value1 / value2) * 1000) / 1000);
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
						<Icon className="text-32">align_vertical_bottom</Icon>
					</FuseAnimate>
					<FuseAnimate animation="transition.slideLeftIn" delay={300}>
						<Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
							Agency Growth Report
						</Typography>
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
							<div className="widget flex w-full p-12">
								<div className="widget flex w-1/3 p-12">
									<Widget10
										columns={columns}
										rows={state.autoRows}
										title="Policy Count"
										handleChangeValue={handleChangeValue}
									/>
								</div>
								<div className="widget flex w-1/3 p-12">
									<Widget10
										columns={columns}
										rows={state.numberRows}
										title="Number Change"
										handleChangeValue={handleChangeValue}
									/>
								</div>
								<div className="widget flex w-1/3 p-12">
									<Widget10
										columns={columns}
										rows={state.percentRows}
										title="Percent Change"
										handleChangeValue={handleChangeValue}
									/>
								</div>
							</div>

							<div className="widget flex w-full p-12">
								<div className="widget flex w-1/3 p-12">
									<Widget10
										columns={houseHoldColumns}
										rows={state.householdRows}
										title="Policies per Household"
										handleChangeValue={handleChangeValue}
									/>
								</div>
								<div className="widget flex w-2/3 p-12">
									<Widget5 widget={widgets.widget5} data={state.numberRows} />
								</div>
							</div>
						</FuseAnimateGroup>
					)}
				</div>
			}
			ref={pageLayout}
		/>
	);
}

export default withReducer('policyGrowthReport', reducer)(ProjectDashboardApp);
