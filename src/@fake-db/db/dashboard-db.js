import _ from '@lodash';
import mock from '../mock';

const activityAppDB = {
	widgets: [
		{
			id: 'Dashboard_Multiline_GoalAndActual_Auto_Panel',
			title: 'Auto',
			subTitle: '',
			cardData: [
				{
					title: '',
					count: 0,
					color: 'text-red',
					label: 'Office',					
					fontSize: 36,
					endAdornment: ''
				},
				{
					title: '',
					count: 0,
					color: 'text-green',
					label: 'Team',					
					fontSize: 36,
					endAdornment: ''
				},
				{
					title: '',
					count: 0,
					color: 'text-blue',
					label: 'Actual',					
					fontSize: 36,
					endAdornment: ''
				},
			]
		},
		{
			id: 'Dashboard_Multiline_GoalAndActual_Fire_Panel',
			title: 'Fire',
			subTitle: '',
			cardData: [
				{
					title: '',
					count: 0,
					color: 'text-red',
					label: 'Office',					
					fontSize: 36,
					endAdornment: ''
				},
				{
					title: '',
					count: 0,
					color: 'text-green',
					label: 'Team',					
					fontSize: 36,
					endAdornment: ''
				},
				{
					title: '',
					count: 0,
					color: 'text-blue',
					label: 'Actual',					
					fontSize: 36,
					endAdornment: ''
				}
			]
		},
		{
			id: 'Dashboard_Multiline_GoalAndActual_Life_Panel',
			title: 'Life',
			subTitle: '',
			cardData: [
				{
					title: '',
					count: 0,
					color: 'text-red',
					label: 'Office',					
					fontSize: 36,
					endAdornment: ''
				},
				{
					title: '',
					count: 0,
					color: 'text-green',
					label: 'Team',					
					fontSize: 36,
					endAdornment: ''
				},
				{
					title: '',
					count: 0,
					color: 'text-blue',
					label: 'Actual',					
					fontSize: 36,
					endAdornment: ''
				}
			]
		},
		{
			id: 'Dashboard_Multiline_GoalAndActual_Health_Panel',
			title: 'Health',
			subTitle: '',
			cardData: [
				{
					title: '',
					count: 0,
					color: 'text-red',
					label: 'Office',					
					fontSize: 36,
					endAdornment: ''
				},
				{
					title: '',
					count: 0,
					color: 'text-green',
					label: 'Team',					
					fontSize: 36,
					endAdornment: ''
				},
				{
					title: '',
					count: 0,
					color: 'text-blue',
					label: 'Actual',					
					fontSize: 36,
					endAdornment: ''
				}
			]
		},
		{
			id: 'Dashboard_Multiline_GoalAndActual_Bank_Panel',
			title: 'Bank',
			subTitle: '',
			cardData: [
				{
					title: '',
					count: 0,
					color: 'text-red',
					label: 'Office',					
					fontSize: 36,
					endAdornment: ''
				},
				{
					title: '',
					count: 0,
					color: 'text-green',
					label: 'Team',					
					fontSize: 36,
					endAdornment: ''
				},
				{
					title: '',
					count: 0,
					color: 'text-blue',
					label: 'Actual',					
					fontSize: 36,
					endAdornment: ''
				}
			]
		},
		{
			id: 'Dashboard_Multiline_GoalAndActual_Total_Panel',
			title: 'Total',
			subTitle: '',
			cardData: [
				{
					title: '',
					count: 0,
					color: 'text-red',
					label: 'Office',					
					fontSize: 36,
					endAdornment: ''
				},
				{
					title: '',
					count: 0,
					color: 'text-green',
					label: 'Team',					
					fontSize: 36,
					endAdornment: ''
				},
				{
					title: '',
					count: 0,
					color: 'text-blue',
					label: 'Actual',					
					fontSize: 36,
					endAdornment: ''
				}
			]
		},
		{
			id: 'Dashboard_Multiline_Team_GoalAndActual_Auto_Panel',
			title: 'Auto',
			subTitle: '',
			cardData: [
				{
					title: '',
					count: 0,
					color: 'text-red',
					label: 'Office',					
					fontSize: 36,
					endAdornment: ''
				},
				{
					title: '',
					count: 0,
					color: 'text-green',
					label: 'Team',					
					fontSize: 36,
					endAdornment: ''
				},
				{
					title: '',
					count: 0,
					color: 'text-blue',
					label: 'Actual',					
					fontSize: 36,
					endAdornment: ''
				},
			]
		},
		{
			id: 'Dashboard_Multiline_Team_GoalAndActual_Fire_Panel',
			title: 'Fire',
			subTitle: '',
			cardData: [
				{
					title: '',
					count: 0,
					color: 'text-red',
					label: 'Office',					
					fontSize: 36,
					endAdornment: ''
				},
				{
					title: '',
					count: 0,
					color: 'text-green',
					label: 'Team',					
					fontSize: 36,
					endAdornment: ''
				},
				{
					title: '',
					count: 0,
					color: 'text-blue',
					label: 'Actual',					
					fontSize: 36,
					endAdornment: ''
				}
			]
		},
		{
			id: 'Dashboard_Multiline_Team_GoalAndActual_Life_Panel',
			title: 'Life',
			subTitle: '',
			cardData: [
				{
					title: '',
					count: 0,
					color: 'text-red',
					label: 'Office',					
					fontSize: 36,
					endAdornment: ''
				},
				{
					title: '',
					count: 0,
					color: 'text-green',
					label: 'Team',					
					fontSize: 36,
					endAdornment: ''
				},
				{
					title: '',
					count: 0,
					color: 'text-blue',
					label: 'Actual',					
					fontSize: 36,
					endAdornment: ''
				}
			]
		},
		{
			id: 'Dashboard_Multiline_Team_GoalAndActual_Health_Panel',
			title: 'Health',
			subTitle: '',
			cardData: [
				{
					title: '',
					count: 0,
					color: 'text-red',
					label: 'Office',					
					fontSize: 36,
					endAdornment: ''
				},
				{
					title: '',
					count: 0,
					color: 'text-green',
					label: 'Team',					
					fontSize: 36,
					endAdornment: ''
				},
				{
					title: '',
					count: 0,
					color: 'text-blue',
					label: 'Actual',					
					fontSize: 36,
					endAdornment: ''
				}
			]
		},
		{
			id: 'Dashboard_Multiline_Team_GoalAndActual_Bank_Panel',
			title: 'Bank',
			subTitle: '',
			cardData: [
				{
					title: '',
					count: 0,
					color: 'text-red',
					label: 'Office',					
					fontSize: 36,
					endAdornment: ''
				},
				{
					title: '',
					count: 0,
					color: 'text-green',
					label: 'Team',					
					fontSize: 36,
					endAdornment: ''
				},
				{
					title: '',
					count: 0,
					color: 'text-blue',
					label: 'Actual',					
					fontSize: 36,
					endAdornment: ''
				}
			]
		},
		{
			id: 'Dashboard_Multiline_Team_GoalAndActual_Total_Panel',
			title: 'Total',
			subTitle: '',
			cardData: [
				{
					title: '',
					count: 0,
					color: 'text-red',
					label: 'Office',					
					fontSize: 36,
					endAdornment: ''
				},
				{
					title: '',
					count: 0,
					color: 'text-green',
					label: 'Team',					
					fontSize: 36,
					endAdornment: ''
				},
				{
					title: '',
					count: 0,
					color: 'text-blue',
					label: 'Actual',					
					fontSize: 36,
					endAdornment: ''
				}
			]
		},
		{
			id: 'Dashboard_Multiline_Percentage_Panel',
			title: '',
			subTitle: '',
			cardData: [
				{
					title: '',
					count: 0,
					color: 'text-red',
					label: '',					
					fontSize: 36,
					endAdornment: '%'
				}
			]
		},
		{
			id: 'Dashboard_LapseRate_Auto_Panel',
			title: 'Auto',
			subTitle: '',
			cardData: [
				{
					title: '',
					count: 0,
					color: 'text-red',
					label: '',					
					fontSize: 36,
					endAdornment: '%'
				},				
			]
		},
		{
			id: 'Dashboard_LapseRate_Fire_Panel',
			title: 'Fire',
			subTitle: '',
			cardData: [
				{
					title: '',
					count: 0,
					color: 'text-red',
					label: '',					
					fontSize: 36,
					endAdornment: '%'
				},				
			]
		},
		{
			id: 'Dashboard_LapseRate_Life_Panel',
			title: 'Life',
			subTitle: '',
			cardData: [
				{
					title: '',
					count: 0,
					color: 'text-red',
					label: '',					
					fontSize: 36,
					endAdornment: '%'
				},				
			]
		},
		{
			id: 'Dashboard_LapseRate_Health_Panel',
			title: 'Health',
			subTitle: '',
			cardData: [
				{
					title: '',
					count: 0,
					color: 'text-red',
					label: '',					
					fontSize: 36,
					endAdornment: '%'
				},				
			]
		},			
		{
			id: 'Dashboard_Users_GoalVsActual_Chart',
			title: "Personal Product Goal Vs Actual",			
			mainChart: {
				TW: {					
					labels: [],
					datasets: [
						{
							// type: 'bar', 
							barPercentage: 0.5,
							label: 'Goal',
							data: [],
							backgroundColor: '#42BFF7',
							hoverBackgroundColor: '#87CDF7',
							categoryPercentage: 1,
						},
						{
							// type: 'bar',
							barPercentage: 0.5,
							label: 'Actual',
							data: [],
							backgroundColor: '#C6ECFD',
							hoverBackgroundColor: '#D7EFFD',
							categoryPercentage: 1
						},										
					]
				},
				options: {
					responsive: true,
					maintainAspectRatio: false,
					legend: {
						display: true,
						position: 'bottom'
					},
					tooltips: {
						mode: 'label'
					},
					scales: {
						xAxes: [
							{
								stacked: false,
								type: 'linear',
								display: true,
								position: 'left',
								gridLines: {
									display: true
								},
								labels: {
									show: true
								}								
							}
						],
						yAxes: [
							{
								stacked: false,
								display: true,
								gridLines: {
									display: true
								},
								labels: [],
							}
						]
					}
				}
			},
			data: {},
		},
		{
			id: 'Dashboard_Personal_GoalVsActual_Chart',
			title: "Personal Product Goal Vs Actual",			
			mainChart: {
				TW: {					
					labels: [],
					datasets: [
						{
							type: 'bar', 
							barPercentage: 0.5,
							label: 'Goal',
							data: [],
							backgroundColor: '#42BFF7',
							hoverBackgroundColor: '#87CDF7',
							categoryPercentage: 1,
						},
						{
							type: 'bar',
							barPercentage: 0.5,
							label: 'Actual',
							data: [],
							backgroundColor: '#C6ECFD',
							hoverBackgroundColor: '#D7EFFD',
							categoryPercentage: 1
						},										
					]
				},
				options: {
					responsive: true,
					maintainAspectRatio: false,
					legend: {
						display: true,
						position: 'bottom'
					},
					tooltips: {
						mode: 'label'
					},
					scales: {
						xAxes: [
							{
								
								stacked: false,
								display: true,
								gridLines: {
									display: true
								},
								labels: [],
							}
						],
						yAxes: [
							{
								stacked: false,
								type: 'linear',
								display: true,
								position: 'left',
								gridLines: {
									display: true
								},
								labels: {
									show: true
								}
							}
						]
					}
				}
			},
			data: {},
		},
		{
			id: 'Dashboard_Team_GoalVsActual_Chart',
			title: "Team Product Goal Vs Actual",			
			mainChart: {
				TW: {					
					labels: [],
					datasets: [
						{
							type: 'bar', 
							barPercentage: 0.5,
							label: 'Goal',
							data: [],
							backgroundColor: '#42BFF7',
							hoverBackgroundColor: '#87CDF7',
							categoryPercentage: 1,
						},
						{
							type: 'bar',
							barPercentage: 0.5,
							label: 'Actual',
							data: [],
							backgroundColor: '#C6ECFD',
							hoverBackgroundColor: '#D7EFFD',
							categoryPercentage: 1
						},										
					]
				},
				options: {
					responsive: true,
					maintainAspectRatio: false,
					legend: {
						display: true,
						position: 'bottom'
					},
					tooltips: {
						mode: 'label'
					},
					scales: {
						xAxes: [
							{
								
								stacked: false,
								display: true,
								gridLines: {
									display: true
								},
								labels: [],
							}
						],
						yAxes: [
							{
								stacked: false,
								type: 'linear',
								display: true,
								position: 'left',
								gridLines: {
									display: true
								},
								labels: {
									show: true
								}
							}
						]
					}
				}
			},
			data: {},
		}

	],
};

mock.onGet('/api/dashboard-app/widgets').reply(() => {
	return [200, activityAppDB.widgets];
});



