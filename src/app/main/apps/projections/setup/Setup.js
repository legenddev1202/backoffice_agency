import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import FusePageCarded from '@fuse/core/FusePageCarded';
import Typography from '@material-ui/core/Typography';
import FuseLoading from '@fuse/core/FuseLoading';
import { MenuItem, TextField } from '@material-ui/core';
import withReducer from 'app/store/withReducer';
import _ from '@lodash';
import reducer from '../store';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Table from '../../../components/widgets/Table';
import Header from './Header';
import { getProjections, selectProjections, saveProjections } from '../store/projectionsSlice';
import { getBonusPlanTemplates, selectBonusPlanTemplates } from '../store/bonusPlanTemplatesSlice';
import { getWidgets, selectWidgets } from '../store/widgetsSlice';
import { policies, projectionsRows, toUntrimed } from '../../../utils/Globals';
import { swap } from '../../../utils/Function';
import { useReactToPrint } from 'react-to-print';

const UID = localStorage.getItem('@UID');

let avgsTableContent = {};

function Component(props) {
	const dispatch = useDispatch();
	const projections = useSelector(selectProjections);
	let widgets = useSelector(selectWidgets);
	const bonusPlanTemplates = useSelector(selectBonusPlanTemplates);
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState({ widgets });
	const [cell, setCell] = useState({});
	const [main, setMain] = useState({});
	const [date, setDate] = useState(moment());
	const [user, setUser] = useState(UID);
	const [bonusPlanTemplatesList, setBonusPlanTemplatesList] = useState([]);
	const [title, setTitle] = useState('Income Projection Setup');
	const [state, setState] = useState({
		teamBonuses: '',
		baseSalary: '',
		bonusPlan: ''
	});
	const componentRef = useRef();
	const handlePrint = useReactToPrint({
		content: () => componentRef.current
	});

	function onSave() {
		setLoading(true);

		const toTrimed = swap(toUntrimed);
		let tempAvgs = {};
		tempAvgs = { ...tempAvgs, id: 'averages' };

		Object.keys(avgsTableContent).map(row => {
			Object.keys(avgsTableContent[row]).map(col => {
				tempAvgs = {
					...tempAvgs,
					[toTrimed[row]]: {
						...tempAvgs[toTrimed[row]],
						[col]: avgsTableContent[row][col]
					}
				};
			});
		});

		dispatch(
			saveProjections({
				Averages: tempAvgs,
				teamBonuses: state.teamBonuses,
				baseSalary: state.baseSalary,
				bonusPlan: state.bonusPlan,
				year: moment(date).format('yyyy'),
				userId: user
			})
		).then(setLoading(false));
	}

	useEffect(() => {
		dispatch(getBonusPlanTemplates());
		dispatch(getProjections(moment(date).format('yyyy')));
		dispatch(getWidgets()).then(() => setLoading(false));
	}, [dispatch, date]);

	useEffect(() => {
		if (bonusPlanTemplates.length > 0) {
			setBonusPlanTemplatesList(bonusPlanTemplates[0]);
		}
	}, [bonusPlanTemplates]);

	useEffect(() => {
		projectionsRows.map(row => {
			avgsTableContent[row.value] = {};
			policies.map(policy => {
				avgsTableContent[row.value][policy.value] = 0;
			});
			delete avgsTableContent[row.value]['Total'];
		});
		if (projections.length > 0 && user != '') {
			if (projections[0].hasOwnProperty(user)) {
				const projectionsData = projections[0][user];

				// averages
				Object.keys(projectionsData['Averages']).map(key => {
					if (key !== 'id')
						Object.keys(projectionsData['Averages'][key]).map(valKey => {
							avgsTableContent[toUntrimed[key]][valKey] = parseFloat(
								projectionsData['Averages'][key][valKey]
							);
						});
				});

				setState({
					...state,
					...projectionsData
				});
			}
		}

		console.log('---------temp', avgsTableContent);
		setMain({ avgsTableContent });
	}, [projections]);

	useEffect(() => {
		if (!_.isEmpty(widgets) && !_.isEmpty(main)) {
			if (widgets.Projections_Table) {
				widgets = {
					...widgets,
					Projections_Table: {
						...widgets.Projections_Table,
						table: {
							...widgets.Projections_Table.table,
							tableContent: main.avgsTableContent
						}
					}
				};
			}
		}

		console.log('----widgets=', widgets);

		setData({ widgets });
	}, [widgets, main]);

	useEffect(() => {
		const tableName = cell.tableName;
		let rowKey = cell.rowKey;
		const colKey = cell.colKey;
		let value = cell.value === '' ? 0 : cell.value;

		if (tableName === 'AVERAGES') {
			avgsTableContent = {
				...avgsTableContent,
				[rowKey]: {
					...avgsTableContent[rowKey],
					[colKey]: value
				}
			};
		}

		console.log('---main', main);
		setMain({ avgsTableContent });
	}, [cell]);

	function handleInputChange(property) {
		setCell(property);
	}

	function handleChange(event) {
		setState({ ...state, [event.target.name]: event.target.value });
	}

	function handleChangeYear(date) {
		setDate(date);
	}

	if (loading) {
		return <FuseLoading />;
	}

	if (data.length === 0) {
		return (
			<FuseAnimate delay={100}>
				<div className="flex flex-1 items-center justify-center h-full">
					<Typography color="textSecondary" variant="h5">
						There are no data!
					</Typography>
				</div>
			</FuseAnimate>
		);
	}

	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				contentCard: 'overflow-hidden',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={
				<Header title={title} handlePrint={handlePrint}>
					<div className="hidden flex flex-1 items-center justify-center px-12">
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

					<FuseAnimate animation="transition.slideRightIn" delay={300}>
						<Button
							component={Link}
							className="whitespace-nowrap normal-case"
							variant="contained"
							color="secondary"
							onClick={onSave}
						>
							<span className="hidden sm:flex">Save</span>
							<span className="flex sm:hidden">New</span>
						</Button>
					</FuseAnimate>
				</Header>
			}
			content={
				<div className="w-full flex flex-col p-12">
					<ComponentToPrint ref={componentRef} handleInputChange={handleInputChange} data={data.widgets} />

					<div className="flex items-center justify-center px-12 py-32">
						<FuseAnimateGroup
							className="flex flex-wrap w-1/4"
							enter={{ animation: 'transition.slideUpBigIn' }}
						>
							<Typography>Team Members Eligible for Team Bonuses</Typography>
						</FuseAnimateGroup>
						<FuseAnimateGroup
							className="flex flex-wrap w-1/4"
							enter={{ animation: 'transition.slideUpBigIn' }}
						>
							<TextField
								id="outlined-basic"
								label="Team Bonuses"
								name="teamBonuses"
								value={state.teamBonuses}
								variant="outlined"
								onChange={handleChange}
								fullWidth
							/>
						</FuseAnimateGroup>
					</div>

					<div className="flex items-center justify-center px-12 py-32">
						<FuseAnimateGroup
							className="flex flex-wrap w-1/4"
							enter={{ animation: 'transition.slideUpBigIn' }}
						>
							<Typography>Base Salary to Use for Illustrations (May Be Zero)</Typography>
						</FuseAnimateGroup>
						<FuseAnimateGroup
							className="flex flex-wrap w-1/4"
							enter={{ animation: 'transition.slideUpBigIn' }}
						>
							<TextField
								id="outlined-basic"
								label="Base Salary"
								name="baseSalary"
								value={state.baseSalary}
								variant="outlined"
								onChange={handleChange}
								fullWidth
							/>
						</FuseAnimateGroup>
					</div>

					<div className="flex items-center justify-center px-12 py-32">
						<FuseAnimateGroup
							className="flex flex-wrap w-1/4"
							enter={{ animation: 'transition.slideUpBigIn' }}
						>
							<Typography>Bonus Plan to Illustrate (Usually Plan 1, "Primary")</Typography>
						</FuseAnimateGroup>
						<FuseAnimateGroup
							className="flex flex-wrap w-1/4"
							enter={{ animation: 'transition.slideUpBigIn' }}
						>
							<TextField
								id="outlined-basic"
								label="Bonus Plan"
								name="bonusPlan"
								value={state.bonusPlan}
								variant="outlined"
								onChange={handleChange}
								fullWidth
								select
							>
								{Object.keys(bonusPlanTemplatesList).map((item, index) => (
									<MenuItem value={item} key={index}>
										{item}
									</MenuItem>
								))}
							</TextField>
						</FuseAnimateGroup>
					</div>
				</div>
			}
			innerScroll
		/>
	);
}

export const ComponentToPrint = React.forwardRef((props, ref) => {
	console.log('====================', props);
	return (
		<div className="flex items-center justify-center p-12" ref={ref}>
			<FuseAnimateGroup className="flex flex-wrap w-1/2 md:w-2/3" enter={{ animation: 'transition.slideUpBigIn' }}>
				<Table
					md
					tableName="AVERAGES"
					data={props.data.Projections_Table}
					onInputChange={props.handleInputChange}
					editable
				/>
			</FuseAnimateGroup>
		</div>
	);
});

export default withReducer('projectionsApp', reducer)(Component);
