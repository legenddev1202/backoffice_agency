import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import FusePageSimple from '@fuse/core/FusePageSimple';
import Typography from '@material-ui/core/Typography';
import FuseLoading from '@fuse/core/FuseLoading';
import withReducer from 'app/store/withReducer';
import { makeStyles } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import _ from '@lodash';
import HorizontalBarChart from 'app/main/components/widgets/HorizontalBarChart';
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import ModalVideo from "react-modal-video";
import reducer from '../store';
import Panel from '../../../components/widgets/Panel';
import SelectBox from '../../../components/CustomSelectBox';
import Header from '../../../components/widgets/Header';
import { getWidgets, selectWidgets } from '../store/widgetsSlice';
import { getBonusPlans, selectBonusPlans } from '../store/bonusPlansSlice';
import { getEntries, selectEntries } from '../store/entriesSlice';
import { getUsers, selectUsers } from '../store/usersSlice';
import { getVision, selectVision } from '../store/visionSlice';
import { getLapseRate, selectLapseRate } from '../store/lapseRateSlice';
import { Options as options, policies } from '../../../utils/Globals';
import { dividing, ceil, getMain } from '../../../utils/Function';


import "react-modal-video/scss/modal-video.scss";

const belongTo = localStorage.getItem('@BELONGTO');
const UID = localStorage.getItem('@UID');

const useStyles = makeStyles(theme => ({
	content: {
		'& canvas': {
			maxHeight: '100%'
		}
	}
}));

function Dashboard(props) {
	const dispatch = useDispatch();
	const classes = useStyles(props);
	let widgets = useSelector(selectWidgets);
	const users = useSelector(selectUsers);
	const bonusPlans = useSelector(selectBonusPlans);
	const vision = useSelector(selectVision);
	const lapseRate = useSelector(selectLapseRate);
	const entries = useSelector(selectEntries);
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState({ widgets });
	const [main, setMain] = useState({});
	const [date, setDate] = useState(moment());
	const [period, setPeriod] = useState(moment().format('MMMM'));
	const [production, setProduction] = useState('Show Written Production');
	const [title, setTitle] = useState('Welcome');
	const [isOpen, setOpen] = useState(false);

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
		if (users.length > 0) {
			temp = getMain(entries, bonusPlans, [], users, vision, lapseRate);
		}
		setMain(temp);
	}, [entries, bonusPlans, users, vision, lapseRate]);

	useEffect(() => {
		console.log('---------------', users)
		if (!_.isEmpty(widgets) && !_.isEmpty(main)) {
			const indGoalsAndActual = {}; // for Personal Product Goal Vs Actual Chart
			const teamGoalsAndActual = {}; // for Production Goal Vs Actual Panels
			let household = 0;
			let individual = 0;
			if (widgets.Dashboard_Multiline_GoalAndActual_Auto_Panel) {
				policies.map(policy => {
					// teamGoalsAndActual[`${policy.value}@realGoal`] = 0;
					teamGoalsAndActual[`${policy.value}@Office`] = 0;
					teamGoalsAndActual[`${policy.value}@Team`] = 0;
					teamGoalsAndActual[`${policy.value}@Actual`] = 0;
				});
				users.map(user => {
					if (user.belongTo === UID) {
						indGoalsAndActual[user.id] = {
							// 'Total@realGoal': 0,
							// 'Total@Office': 0,
							'Total@Goals': 0,
							'Total@Actual': 0
						};
						policies.map(policy => {
							if (policy.value !== 'Total') {
								// data for chart
								indGoalsAndActual[user.id][`Total@Goals`] +=
									main[production][period][user.id][policy.value].Goals;
								indGoalsAndActual[user.id][`Total@Actual`] +=
									main[production][period][user.id][policy.value].Policies;

								if (user.id !== UID) {
									teamGoalsAndActual[`${policy.value}@Team`] +=
										main[production][period][user.id][policy.value].Goals;

									teamGoalsAndActual[`Total@Team`] +=
										main[production][period][user.id][policy.value].Goals;

									teamGoalsAndActual[`Total@Actual`] +=
										main[production][period][user.id][policy.value].Policies;

									teamGoalsAndActual[`${policy.value}@Actual`] +=
										main[production][period][user.id][policy.value].Policies;

									household += main[production][period][user.id][policy.value].household;
									individual += main[production][period][user.id][policy.value].individual;
								}
								if (user.id === UID) {
									teamGoalsAndActual[`Total@Office`] +=
										main[production][period][user.id][policy.value].Goals;

									teamGoalsAndActual[`${policy.value}@Office`] +=
										main[production][period][user.id][policy.value].Goals;
								}
							}
						});
					}
				});

				// Team Goal vs Actual
				policies.map(policy => {
					const tempCardData = [];
					let tempCard = {};
					const {cardData} = widgets[`Dashboard_Multiline_Team_GoalAndActual_${policy.value}_Panel`];
					cardData.map(card => {
						tempCard = card;

						tempCard = { ...tempCard, count: teamGoalsAndActual[`${policy.value}@${card.label}`] };
						tempCardData.push(tempCard);
					});
					widgets = {
						...widgets,
						[`Dashboard_Multiline_Team_GoalAndActual_${policy.value}_Panel`]: {
							...widgets[`Dashboard_Multiline_Team_GoalAndActual_${policy.value}_Panel`],
							cardData: [...tempCardData]
						}
					};
				});

				// Lapse Rate
				policies.map(policy => {
					if (policy.value === 'Auto' || policy.value === 'Fire') {
						const tempCardData = [];
						let tempCard = {};
						const {cardData} = widgets[`Dashboard_LapseRate_${policy.value}_Panel`];
						tempCard = cardData[0];
						tempCard = {
							...tempCard,
							count: `${main[production][period][UID][policy.value].lapseRateChange}`
						};
						tempCardData.push(tempCard);
						widgets = {
							...widgets,
							[`Dashboard_LapseRate_${policy.value}_Panel`]: {
								...widgets[`Dashboard_LapseRate_${policy.value}_Panel`],
								cardData: [...tempCardData]
							}
						};
					}
				});

				// Multiline Percentage
				const tempData = [];
				let cardData = widgets.Dashboard_Multiline_Percentage_Panel.cardData[0];
				cardData = { ...cardData, count: `${ceil(dividing(household * 100, household + individual))}` };
				tempData.push(cardData);
				widgets = {
					...widgets,
					Dashboard_Multiline_Percentage_Panel: {
						...widgets.Dashboard_Multiline_Percentage_Panel,
						cardData: [...tempData]
					}
				};
			}

			if (widgets.Dashboard_Users_GoalVsActual_Chart) {
				let goal = widgets.Dashboard_Users_GoalVsActual_Chart.mainChart.TW.datasets[0];
				let actual = widgets.Dashboard_Users_GoalVsActual_Chart.mainChart.TW.datasets[1];

				const tempGoal = [];
				// let tempGoalBackgroundColor = [];
				// let tempGoalHoverBackgroundColor = [];
				const tempActual = [];
				const tempDatasets = [];
				const tempLabels = [];
				users.map(user => {
					if (user.belongTo === UID) {
						tempGoal.push(indGoalsAndActual[user.id][`Total@Goals`]);

						// let backgroundColor = '#42BFF7';
						// let hoverBackgroundColor = '#87CDF7';
						// if (indGoalsAndActual[user.id][`Total@realGoal`] > indGoalsAndActual[user.id][`Total@Goal`]) {
						// 	backgroundColor = '#C6ECFD';
						// 	hoverBackgroundColor = '#D7EFFD';
						// }
						// tempGoalBackgroundColor.push(backgroundColor);
						// tempGoalHoverBackgroundColor.push(hoverBackgroundColor);

						tempActual.push(indGoalsAndActual[user.id][`Total@Actual`]);
						tempLabels.push(user.data.displayName);
					}
				});
				// console.log('====', tempActual);
				goal = {
					...goal,
					data: tempGoal
					// backgroundColor: tempGoalBackgroundColor,
					// hoverBackgroundColor: tempGoalHoverBackgroundColor
				};
				actual = { ...actual, data: tempActual };
				tempDatasets.push(goal);
				tempDatasets.push(actual);

				widgets = {
					...widgets,
					Dashboard_Users_GoalVsActual_Chart: {
						...widgets.Dashboard_Users_GoalVsActual_Chart,
						mainChart: {
							...widgets.Dashboard_Users_GoalVsActual_Chart.mainChart,
							TW: {
								...widgets.Dashboard_Users_GoalVsActual_Chart.mainChart.TW,
								datasets: [...tempDatasets]
							}
						}
					}
				};

				widgets = {
					...widgets,
					Dashboard_Users_GoalVsActual_Chart: {
						...widgets.Dashboard_Users_GoalVsActual_Chart,
						mainChart: {
							...widgets.Dashboard_Users_GoalVsActual_Chart.mainChart,
							options: {
								...widgets.Dashboard_Users_GoalVsActual_Chart.mainChart.options,
								scales: {
									...widgets.Dashboard_Users_GoalVsActual_Chart.mainChart.options.scales,
									yAxes: [
										{
											stacked: false,
											display: true,
											gridLines: {
												display: true
											},
											labels: [...tempLabels]
										}
									]
								}
							}
						}
					}
				};
				widgets = {
					...widgets,
					Dashboard_Users_GoalVsActual_Chart: {
						...widgets.Dashboard_Users_GoalVsActual_Chart,
						data: {
							Auto: widgets.Dashboard_Multiline_GoalAndActual_Auto_Panel,
							Fire: widgets.Dashboard_Multiline_GoalAndActual_Fire_Panel,
							Life: widgets.Dashboard_Multiline_GoalAndActual_Life_Panel,
							Health: widgets.Dashboard_Multiline_GoalAndActual_Health_Panel,
							Total: widgets.Dashboard_Multiline_GoalAndActual_Total_Panel
						}
					}
				};
			}

			// if (widgets.Dashboard_Team_GoalVsActual_Chart) {
			// 	let goal = widgets.Dashboard_Team_GoalVsActual_Chart.mainChart.TW.datasets[0];
			// 	let actual = widgets.Dashboard_Team_GoalVsActual_Chart.mainChart.TW.datasets[1];

			// 	let tempGoal = [];
			// 	let tempActual = [];
			// 	let tempDatasets = [];
			// 	policies.map(policy => {
			// 		if (policy.value !== 'Total') {
			// 			tempGoal.push(teamGoalsAndActual[`${policy.value}@Goal`]);
			// 			tempActual.push(teamGoalsAndActual[`${policy.value}@Actual`]);
			// 		}
			// 	});
			// 	goal = { ...goal, data: tempGoal };
			// 	actual = { ...actual, data: tempActual };
			// 	tempDatasets.push(goal);
			// 	tempDatasets.push(actual);

			// 	widgets = {
			// 		...widgets,
			// 		Dashboard_Team_GoalVsActual_Chart: {
			// 			...widgets.Dashboard_Team_GoalVsActual_Chart,
			// 			mainChart: {
			// 				...widgets.Dashboard_Team_GoalVsActual_Chart.mainChart,
			// 				TW: {
			// 					...widgets.Dashboard_Team_GoalVsActual_Chart.mainChart.TW,
			// 					datasets: [...tempDatasets]
			// 				}
			// 			}
			// 		}
			// 	};

			// 	widgets = {
			// 		...widgets,
			// 		Dashboard_Team_GoalVsActual_Chart: {
			// 			...widgets.Dashboard_Team_GoalVsActual_Chart,
			// 			mainChart: {
			// 				...widgets.Dashboard_Team_GoalVsActual_Chart.mainChart,
			// 				options: {
			// 					...widgets.Dashboard_Team_GoalVsActual_Chart.mainChart.options,
			// 					scales: {
			// 						...widgets.Dashboard_Team_GoalVsActual_Chart.mainChart.options.scales,
			// 						xAxes: [
			// 							{
			// 								stacked: false,
			// 								display: true,
			// 								gridLines: {
			// 									display: true
			// 								},
			// 								labels: ['Auto', 'Fire', 'Life', 'Health', 'Bank']
			// 							}
			// 						]
			// 					}
			// 				}
			// 			}
			// 		}
			// 	};
			// 	widgets = {
			// 		...widgets,
			// 		Dashboard_Team_GoalVsActual_Chart: {
			// 			...widgets.Dashboard_Team_GoalVsActual_Chart,
			// 			data: {
			// 				Auto: widgets.Dashboard_Multiline_Team_GoalAndActual_Auto_Panel,
			// 				Fire: widgets.Dashboard_Multiline_Team_GoalAndActual_Fire_Panel,
			// 				Life: widgets.Dashboard_Multiline_Team_GoalAndActual_Life_Panel,
			// 				Health: widgets.Dashboard_Multiline_Team_GoalAndActual_Health_Panel,
			// 				Total: widgets.Dashboard_Multiline_Team_GoalAndActual_Total_Panel
			// 			}
			// 		}
			// 	};
			// }
		}

		// console.log('-----widgets', widgets);
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
										'aria-label': 'change date'
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
					<ModalVideo
						channel="youtube"
						autoplay
						isOpen={isOpen}
						videoId="sSZNLAIL65M"
						onClose={() => setOpen(false)}
					/>
					<div className="flex flex-1 items-center justify-center px-12">
						<FuseAnimate animation="transition.slideRightIn" delay={300}>
							<Button
								component={Link}
								className="whitespace-nowrap normal-case mr-5"
								variant="contained"
								color="secondary"
								// onClick={addNewTemplate}
								onClick={() => setOpen(true)}
							>
								<span className="hidden sm:flex">Video</span>
							</Button>
						</FuseAnimate>
					</div>
				</Header>
			}
			content={
				<div className="w-full p-12">
					<FuseAnimateGroup
						className="flex flex-wrap items-center justify-center"
						enter={{ animation: 'transition.slideUpBigIn' }}
					>
						<div className="widget flex w-full p-12">
							<fieldset className='"widget flex flex-wrap w-full rounded-8 border-1'>
								<legend>Production Goal Vs Actual</legend>
								{policies.map((policy, index) => {
									return (
										<div className="widget flex w-2/6 md:w-1/4 lg:w-1/6  p-12">
											<Panel
												key={index}
												data={
													data.widgets[
														`Dashboard_Multiline_Team_GoalAndActual_${policy.value}_Panel`
													]
												}
												type="Three Number"
											/>
										</div>
									);
								})}
							</fieldset>
						</div>
					</FuseAnimateGroup>
					<FuseAnimateGroup
						className="flex flex-wrap items-center justify-center"
						enter={{ animation: 'transition.slideUpBigIn' }}
					>
						<div className="widget flex w-full p-12">
							<fieldset className='"widget flex w-2/4 mr-12 rounded-8 border-1'>
								<legend>HH%</legend>
								<div className="widget flex w-full p-12">
									<Panel data={data.widgets.Dashboard_Multiline_Percentage_Panel} type="One Number" />
								</div>
							</fieldset>
							<fieldset className='"widget flex w-2/4 ml-12 rounded-8 border-1'>
								<legend>Lapse Rate</legend>
								{policies.map((policy, index) => {
									if (policy.value === 'Auto' || policy.value === 'Fire') {
										return (
											<div className="widget flex w-full p-12">
												<Panel
													key={index}
													data={data.widgets[`Dashboard_LapseRate_${policy.value}_Panel`]}
													type="One Number"
												/>
											</div>
										);
									}
								})}
							</fieldset>
						</div>
					</FuseAnimateGroup>
					<FuseAnimateGroup
						className="flex flex-wrap items-center justify-center"
						enter={{ animation: 'transition.slideUpBigIn' }}
					>
						<div className="widget flex w-2/4 p-12">
							<HorizontalBarChart
								data={data.widgets.Dashboard_Users_GoalVsActual_Chart}
								type="One Number"
							/>
						</div>
					</FuseAnimateGroup>
				</div>
			}
			innerScroll
		/>
	);
}

export default withReducer('dashboardApp', reducer)(Dashboard);
