import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import moment from 'moment';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import FusePageSimple from '@fuse/core/FusePageSimple';
import FusePageCarded from '@fuse/core/FusePageCarded';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import FuseLoading from '@fuse/core/FuseLoading';
import withReducer from 'app/store/withReducer';
import Hidden from '@material-ui/core/Hidden';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import _ from '@lodash';
import reducer from '../store';
import {
	MuiPickersUtilsProvider,
	KeyboardTimePicker,
	KeyboardDatePicker,
  } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { selectMainTheme } from 'app/store/fuse/settingsSlice';
import Table from '../../../components/widgets/Table';
import Panel from '../../../components/widgets/Panel';
import Card from '../../../components/widgets/Panel';
import BarChart from '../../../components/widgets/BarChart';
import HorizontalBarChart from '../../../components/widgets/HorizontalBarChart';
import PieChart from '../../../components/widgets/PieChart';
import SelectBox from '../../../components/CustomSelectBox';
import Header from '../../../components/widgets/Header';
import { getWidgets, selectWidgets } from '../store/widgetsSlice';
import { getBonusPlans, selectBonusPlans } from '../store/bonusPlansSlice';
import { getMarketings, selectMarketings } from '../store/marketingsSlice';
import { getEntries, selectEntries } from '../store/entriesSlice';
import { getUsers, selectUsers } from '../store/usersSlice';
import { getVision, selectVision } from '../store/visionSlice';
import { getLapseRate, selectLapseRate } from '../store/lapseRateSlice';
import { Options as options, policies } from '../../../utils/Globals';
import { dividing, ceil, getMain } from '../../../utils/Function';

const belongTo = localStorage.getItem('@BELONGTO');
// const UID = localStorage.getItem('@UID');

const useStyles = makeStyles(theme => ({
	content: {
		'& canvas': {
			maxHeight: '100%',
		}
	},
}));

function Dashboard(props) {
	const dispatch = useDispatch();
	const classes = useStyles(props);
	const pageLayout = useRef(null);
	const param = useParams(); 
	const UID = param.id;
	let widgets = useSelector(selectWidgets);
	const users = useSelector(selectUsers);
	const bonusPlans = useSelector(selectBonusPlans);
	const vision = useSelector(selectVision);
	const lapseRate = useSelector(selectLapseRate);
	const entries = useSelector(selectEntries);
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState({ widgets });
	const [main, setMain] = useState({});
	const [period, setPeriod] = useState(moment().format('MMMM'));
	const [production, setProduction] = useState("Show Written Production");
	const [report, setReport] = useState("Policies");
	const [userList, setUserList] = useState([]);
	const [tabValue, setTabValue] = useState(0);
	const [date, setDate] = useState(moment());
	const [title, setTitle] = useState('Welcome');
	
	useEffect(() => {
		dispatch(getUsers());
		dispatch(getBonusPlans());
		dispatch(getEntries(moment(date).format('yyyy')));	
		dispatch(getVision(moment(date).format('yyyy')));	
		dispatch(getLapseRate(moment(date).format('yyyy')));	
		dispatch(getWidgets()).then(() => setLoading(false));
	}, [dispatch, date]);

	useEffect(() => {	
		let temp = [];	
		if(users.length>0) { 
			temp = getMain(entries, bonusPlans, [], users, vision, lapseRate);															
		}
		setMain(temp);	
		
	}, [entries, bonusPlans, users, vision, lapseRate]);

	useEffect(() => {	
		if(!_.isEmpty(widgets) && !_.isEmpty(main)) {
			let indGoalsAndActual = {};	
			let teamGoalsAndActual = {};
			let household = 0;
			let individual = 0;	
			if(widgets.Dashboard_Multiline_GoalAndActual_Auto_Panel) {	
				policies.map(policy => {					
					if(policy.value !== 'Bank') {
						indGoalsAndActual[`${policy.value}@realGoal`] = 0;
						indGoalsAndActual[`${policy.value}@Goal`] = 0;
						indGoalsAndActual[`${policy.value}@Actual`] = 0;
						teamGoalsAndActual[`${policy.value}@realGoal`] = 0;
						teamGoalsAndActual[`${policy.value}@Goal`] = 0;
						teamGoalsAndActual[`${policy.value}@Actual`] = 0;						
					}	
					household += main[production][period][UID][policy.value]['household'];
					individual += main[production][period][UID][policy.value]['individual'];			
				});
				users.map((user) => {
					if(user.id === UID) { 		
						policies.map((policy) => { 
							if(policy.value!=='Bank' && policy.value!=='Total') {	
								indGoalsAndActual[`Total@realGoal`] += main[production][period][user.id][policy.value]["realGoal"];							
								indGoalsAndActual[`Total@Goal`] += main[production][period][user.id][policy.value]["Goals"];
								indGoalsAndActual[`Total@Actual`] += main[production][period][user.id][policy.value]["Policies"];
								indGoalsAndActual[`${policy.value}@realGoal`] += main[production][period][user.id][policy.value]["realGoal"];											
								indGoalsAndActual[`${policy.value}@Goal`] += main[production][period][user.id][policy.value]["Goals"];
								indGoalsAndActual[`${policy.value}@Actual`] += main[production][period][user.id][policy.value]["Policies"];
							}
						});						
					}	
					if(user.belongTo === belongTo) { 						
						policies.map((policy) => { 
							if(policy.value!=='Bank' && policy.value!=='Total') {
								teamGoalsAndActual[`Total@realGoal`] += main[production][period][user.id][policy.value]["realGoal"];
								teamGoalsAndActual[`Total@Goal`] += main[production][period][user.id][policy.value]["Goals"];
								teamGoalsAndActual[`Total@Actual`] += main[production][period][user.id][policy.value]["Policies"];
								teamGoalsAndActual[`${policy.value}@realGoal`] += main[production][period][user.id][policy.value]["realGoal"];											
								teamGoalsAndActual[`${policy.value}@Goal`] += main[production][period][user.id][policy.value]["Goals"];
								teamGoalsAndActual[`${policy.value}@Actual`] += main[production][period][user.id][policy.value]["Policies"];
							}							
						});
					}			
				});		
						
				// Personal Goal vs Actual
				policies.map(policy => {
					if(policy.value !== 'Bank') {
						let tempCardData = [];
						let tempCard = {};
						const cardData = widgets[`Dashboard_Multiline_GoalAndActual_${policy.value}_Panel`].cardData;
						cardData.map(card => {
							tempCard = card;

							let color = 'text-green';
							if(teamGoalsAndActual[`${policy.value}@real${card.label}`] > teamGoalsAndActual[`${policy.value}@${card.label}`]) {
								color = 'text-red'
							}
							if(card.label === 'Goal') {
								tempCard = { ...tempCard, count: indGoalsAndActual[`${policy.value}@real${card.label}`], color:color };
							} else if(card.label === 'Actual') {
								tempCard = { ...tempCard, count: indGoalsAndActual[`${policy.value}@${card.label}`] };
							}
							
							tempCardData.push(tempCard);
						});						
						widgets = {
							...widgets, [`Dashboard_Multiline_GoalAndActual_${policy.value}_Panel`]: {
								...widgets[`Dashboard_Multiline_GoalAndActual_${policy.value}_Panel`], cardData: [
									...tempCardData
								]
							}					
						}
					}					
				});

				// Team Goal vs Actual
				policies.map(policy => {
					if(policy.value !== 'Bank') {
						let tempCardData = [];
						let tempCard = {};
						const cardData = widgets[`Dashboard_Multiline_Team_GoalAndActual_${policy.value}_Panel`].cardData;
						cardData.map(card => {
							tempCard = card;
							
							let color = 'text-green';
							if(teamGoalsAndActual[`${policy.value}@real${card.label}`] > teamGoalsAndActual[`${policy.value}@${card.label}`]) {
								color = 'text-red'
							}
							if(card.label === 'Goal') {
								tempCard = { ...tempCard, count: teamGoalsAndActual[`${policy.value}@real${card.label}`], color:color };
							} else if(card.label === 'Actual') {
								tempCard = { ...tempCard, count: teamGoalsAndActual[`${policy.value}@${card.label}`] };
							}

							tempCardData.push(tempCard);
						});						
						widgets = {
							...widgets, [`Dashboard_Multiline_Team_GoalAndActual_${policy.value}_Panel`]: {
								...widgets[`Dashboard_Multiline_Team_GoalAndActual_${policy.value}_Panel`], cardData: [
									...tempCardData
								]
							}					
						}
					}					
				});	

				// Lapse Rate
				policies.map(policy => {
					if(policy.value==='Auto' || policy.value==='Fire') {
						let tempCardData = [];
						let tempCard = {};
						const cardData = widgets[`Dashboard_LapseRate_${policy.value}_Panel`].cardData;
						tempCard = cardData[0];
						tempCard = { ...tempCard, count: `${main[production][period][UID][policy.value]['lapseRateChange']}` };
						tempCardData.push(tempCard);
						widgets = {
							...widgets, [`Dashboard_LapseRate_${policy.value}_Panel`]: {
								...widgets[`Dashboard_LapseRate_${policy.value}_Panel`], cardData: [
									...tempCardData
								]
							}					
						}
					}					
				});	
				
				// Multiline Percentage
				let tempData = [];				
				let cardData = widgets.Dashboard_Multiline_Percentage_Panel.cardData[0];
				cardData = { ...cardData, count: `${ceil(dividing(household*100, household+individual))}` }; 
				tempData.push(cardData);
				widgets = {
					...widgets, Dashboard_Multiline_Percentage_Panel: {
						...widgets.Dashboard_Multiline_Percentage_Panel, cardData: 
							[ ...tempData ]
					}
				}
			}

			if(widgets.Dashboard_Personal_GoalVsActual_Chart) { 
				let goal = widgets.Dashboard_Personal_GoalVsActual_Chart.mainChart.TW.datasets[0];
				let actual = widgets.Dashboard_Personal_GoalVsActual_Chart.mainChart.TW.datasets[1];
				
				let tempGoal = [];
				let tempGoalBackgroundColor = [];
				let tempGoalHoverBackgroundColor = [];
				let tempActual = [];
				let tempDatasets = [];
				policies.map(policy => {
					if(policy.value !== 'Bank' && policy.value !== 'Total') {
						tempGoal.push(indGoalsAndActual[`${policy.value}@Goal`]);

						let backgroundColor = '#42BFF7';
						let hoverBackgroundColor = '#87CDF7';
						if(indGoalsAndActual[`${policy.value}@realGoal`] > indGoalsAndActual[`${policy.value}@Goal`]) {
							backgroundColor = '#C6ECFD';
							hoverBackgroundColor = '#D7EFFD';
						}
						tempGoalBackgroundColor.push(backgroundColor);
						tempGoalHoverBackgroundColor.push(hoverBackgroundColor);
						tempActual.push(indGoalsAndActual[`${policy.value}@Actual`]);						
					}					
				});
				goal = { ...goal, data: tempGoal, backgroundColor: tempGoalBackgroundColor, hoverBackgroundColor: tempGoalHoverBackgroundColor };
				actual = { ...actual, data: tempActual };
				tempDatasets.push(goal);
				tempDatasets.push(actual);

				widgets = {
					...widgets, Dashboard_Personal_GoalVsActual_Chart: {
						...widgets.Dashboard_Personal_GoalVsActual_Chart, mainChart: {
							...widgets.Dashboard_Personal_GoalVsActual_Chart.mainChart, TW: {
								...widgets.Dashboard_Personal_GoalVsActual_Chart.mainChart.TW, datasets: [
									...tempDatasets
								]
							}
						}
					}
				}

				widgets = {
					...widgets, Dashboard_Personal_GoalVsActual_Chart: {
						...widgets.Dashboard_Personal_GoalVsActual_Chart, mainChart: {
							...widgets.Dashboard_Personal_GoalVsActual_Chart.mainChart, options: {
								...widgets.Dashboard_Personal_GoalVsActual_Chart.mainChart.options, scales: {
									...widgets.Dashboard_Personal_GoalVsActual_Chart.mainChart.options.scales, xAxes: [
										{
											stacked: false,
											display: true,
											gridLines: {
												display: true
											},
											labels: ['Auto', 'Fire', 'Life', 'Health'],
										}
									]
								}																	
							}
						}
					}
				}
				widgets = {
					...widgets, Dashboard_Personal_GoalVsActual_Chart: {
						...widgets.Dashboard_Personal_GoalVsActual_Chart, data: {
							Auto: widgets.Dashboard_Multiline_GoalAndActual_Auto_Panel,
							Fire: widgets.Dashboard_Multiline_GoalAndActual_Fire_Panel,
							Life: widgets.Dashboard_Multiline_GoalAndActual_Life_Panel,
							Health: widgets.Dashboard_Multiline_GoalAndActual_Health_Panel,
							Total: widgets.Dashboard_Multiline_GoalAndActual_Total_Panel,
						}
					}
				}
			}

			if(widgets.Dashboard_Team_GoalVsActual_Chart) { 
				let goal = widgets.Dashboard_Team_GoalVsActual_Chart.mainChart.TW.datasets[0];
				let actual = widgets.Dashboard_Team_GoalVsActual_Chart.mainChart.TW.datasets[1];
				
				let tempGoal = [];
				let tempActual = [];
				let tempDatasets = [];
				policies.map(policy => {
					if(policy.value !== 'Bank' && policy.value !== 'Total') {
						tempGoal.push(teamGoalsAndActual[`${policy.value}@Goal`]);
						tempActual.push(teamGoalsAndActual[`${policy.value}@Actual`]);						
					}					
				});
				goal = { ...goal, data: tempGoal };
				actual = { ...actual, data: tempActual };
				tempDatasets.push(goal);
				tempDatasets.push(actual);

				widgets = {
					...widgets, Dashboard_Team_GoalVsActual_Chart: {
						...widgets.Dashboard_Team_GoalVsActual_Chart, mainChart: {
							...widgets.Dashboard_Team_GoalVsActual_Chart.mainChart, TW: {
								...widgets.Dashboard_Team_GoalVsActual_Chart.mainChart.TW, datasets: [
									...tempDatasets
								]
							}
						}
					}
				}

				widgets = {
					...widgets, Dashboard_Team_GoalVsActual_Chart: {
						...widgets.Dashboard_Team_GoalVsActual_Chart, mainChart: {
							...widgets.Dashboard_Team_GoalVsActual_Chart.mainChart, options: {
								...widgets.Dashboard_Team_GoalVsActual_Chart.mainChart.options, scales: {
									...widgets.Dashboard_Team_GoalVsActual_Chart.mainChart.options.scales, xAxes: [
										{
											stacked: false,
											display: true,
											gridLines: {
												display: true
											},
											labels: ['Auto', 'Fire', 'Life', 'Health'],
										}
									]
								}																	
							}
						}
					}
				}
				widgets = {
					...widgets, Dashboard_Team_GoalVsActual_Chart: {
						...widgets.Dashboard_Team_GoalVsActual_Chart, data: {
							Auto: widgets.Dashboard_Multiline_Team_GoalAndActual_Auto_Panel,
							Fire: widgets.Dashboard_Multiline_Team_GoalAndActual_Fire_Panel,
							Life: widgets.Dashboard_Multiline_Team_GoalAndActual_Life_Panel,
							Health: widgets.Dashboard_Multiline_Team_GoalAndActual_Health_Panel,
							Total: widgets.Dashboard_Multiline_Team_GoalAndActual_Total_Panel,
						}
					}
				}
			}
		}

		console.log('-----widgets', widgets)
		setData({ widgets });
	}, [widgets, main, period]);

	function handleChangePeriod(event) { 
		setPeriod(event.target.value);
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
		<FusePageSimple
			classes={{
				header: 'min-h-160 h-160',
				toolbar: 'min-h-48 h-48',
				rightSidebar: 'w-288',
				content: classes.content
			}}
			header={
				<Header title={title}>
					<div className="flex flex-1 items-center justify-center px-12">
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
										'aria-label': 'change date',
									}}
									views={['year']}
								/>	
							</MuiPickersUtilsProvider>	
						</FuseAnimate>
					</div>
					<div className="flex flex-1 items-center justify-center px-12">
						<FuseAnimate animation="transition.slideUpIn" delay={300}>
							<SelectBox
								value={period}
								onChange={ev => handleChangePeriod(ev)}
								label="Month"
								data={options.period.data}
							/>
						</FuseAnimate>
					</div>									
				</Header>			
			}
			content={
				<div className="w-full p-12">		
					<FuseAnimateGroup className="flex flex-wrap items-center justify-center" enter={{ animation: 'transition.slideUpBigIn' }}>
						<div className="widget flex w-full p-12">
							<fieldset className='"widget flex w-full rounded-8 border-1'>
								<legend>Personal Product Goal Vs Actual</legend>															
									{
										policies.map(policy => {
											if(policy.value!=='Bank') {
												return(
													<div className="widget flex w-1/5 p-12">							
														<Panel data={data.widgets[`Dashboard_Multiline_GoalAndActual_${policy.value}_Panel`]} type='Two Number' />						
													</div>
												)
											}
											
										})
									}
							</fieldset>	
						</div>									
					</FuseAnimateGroup>	
					<FuseAnimateGroup className="flex flex-wrap items-center justify-center" enter={{ animation: 'transition.slideUpBigIn' }}>
						<div className="widget flex w-full p-12">
							<fieldset className='"widget flex w-full rounded-8 border-1'>
								<legend>Team Product Goal Vs Actual</legend>															
									{
										policies.map(policy => {
											if(policy.value!=='Bank') {
												return(
													<div className="widget flex w-1/5 p-12">							
														<Panel data={data.widgets[`Dashboard_Multiline_Team_GoalAndActual_${policy.value}_Panel`]} type='Two Number' />						
													</div>
												)
											}
											
										})
									}
							</fieldset>	
						</div>									
					</FuseAnimateGroup>							
					<FuseAnimateGroup className="flex flex-wrap items-center justify-center" enter={{ animation: 'transition.slideUpBigIn' }}>
						<div className="widget flex w-full p-12">
							<fieldset className='"widget flex w-2/4 mr-12 rounded-8 border-1'>
								<legend>Multiline Percentage</legend>
								<div className="widget flex w-full p-12">							
									<Panel data={data.widgets.Dashboard_Multiline_Percentage_Panel} type='One Number' />						
								</div>
							</fieldset>		
							<fieldset className='"widget flex w-2/4 ml-12 rounded-8 border-1'>
								<legend>Lapse Rate</legend>
								{
									policies.map(policy => {
										if(policy.value==='Auto' || policy.value==='Fire') {
											return(
												<div className="widget flex w-full p-12">							
													<Panel data={data.widgets[`Dashboard_LapseRate_${policy.value}_Panel`]} type='One Number' />						
												</div>
											)
										}
										
									})
								}
							</fieldset>	
						</div>								
					</FuseAnimateGroup>		
					<FuseAnimateGroup className="flex flex-wrap justify-center" enter={{ animation: 'transition.slideUpBigIn' }}>						
						<div className="widget flex w-1/2 p-12">
							<BarChart data={data.widgets.Dashboard_Personal_GoalVsActual_Chart} />
						</div>						
						{/* <div className="widget flex w-1/2 p-12">
							<BarChart widget={data.widgets.Dashboard_Team_GoalVsActual_Chart} />
						</div> */}
					</FuseAnimateGroup>																
				</div>
				
			}
			innerScroll
		/>
	);
}

export default withReducer('producrProfile', reducer)(Dashboard);
