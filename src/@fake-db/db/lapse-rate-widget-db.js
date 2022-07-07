import mock from '../mock';

const projectDashboardAppDB = {
	 
	widgets: [
		
		{
			id: 'widget5',
			title: "Policy Count Change by Month",
			ranges: {
				TW: 'As A Team',
				IN: 'Individually',
				IC: 'Include Initial Bonus',
				DI: "Don't Include Initial Bonus"
			},
			mainChart: {
				TW: {
					
					labels: [],
					datasets: [
						{
							type: 'bar',
							barPercentage: 0.5,
							label: 'Auto',
							data: [ -20, 25, 22, 12, 12, 50, 45, 7, 8, 10, 56, 22],
							backgroundColor: '#42BFF7',
							hoverBackgroundColor: '#87CDF7',
							categoryPercentage: 1,
						},
						{
							type: 'bar',
							barPercentage: 0.5,
							label: 'Fire',
							data: [-5, 8, 10, 50, 45, 7, 8, 10, 17, 45, 56, 22],
							backgroundColor: '#C6ECFD',
							hoverBackgroundColor: '#D7EFFD',
							categoryPercentage: 1
						},
						{
							type: 'bar',
							label: 'Life',
							barPercentage: 0.5,
							data: [-23, 7, 8, 10, 17, 45, 76, 23, 77, 31, 56, 22],
							backgroundColor: '#f9cfcf',
							hoverBackgroundColor: '#ffcece',
							categoryPercentage: 1
						},
						{
							type: 'bar',
							label: 'Health',
							barPercentage: 0.5,
							data: [-20, 34, 34, 20, 25, 34, 20, 25, 56, 22, 56, 22],
							backgroundColor: '#77ff99',
							hoverBackgroundColor: '#c9ffd6',
							categoryPercentage: 1
						}					
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
								stacked: true,
								display: true,
								gridLines: {
									display: true
								},
								labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
							}
						],
						yAxes: [
							{
								stacked: true,
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
			supporting: {
				created: {
					label: 'CREATED',
					count: {
						'2W': 48,
						LW: 46,
						TW: 54
					},
					chart: {
						'2W': {
							datasets: [
								{
									label: 'Created',
									data: [5, 8, 5, 6, 7, 8, 7],
									fill: true,
									backgroundColor: '#42BFF7',
									pointRadius: 0,
									pointHitRadius: 20,
									borderWidth: 0
								}
							],
							labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
						},
						LW: {
							datasets: [
								{
									label: 'Created',
									data: [6, 3, 7, 5, 5, 4, 7],
									fill: true,
									backgroundColor: '#42BFF7',
									pointRadius: 0,
									pointHitRadius: 20,
									borderWidth: 0
								}
							],
							labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
						},
						TW: {
							datasets: [
								{
									label: 'Created',
									data: [3, 2, 1, 4, 8, 8, 4],
									fill: true,
									backgroundColor: '#42BFF7',
									pointRadius: 0,
									pointHitRadius: 20,
									borderWidth: 0
								}
							],
							labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
						},
						options: {
							legend: {
								display: false
							},
							maintainAspectRatio: false,
							scales: {
								xAxes: [
									{
										display: false
									}
								],
								yAxes: [
									{
										display: false
									}
								]
							}
						}
					}
				},
				closed: {
					label: 'CLOSED',
					count: {
						'2W': 27,
						LW: 31,
						TW: 26
					},
					chart: {
						TW: {
							datasets: [
								{
									label: 'Created',
									data: [6, 3, 7, 5, 5, 4, 7],
									fill: true,
									backgroundColor: '#42BFF7',
									pointRadius: 0,
									pointHitRadius: 20,
									borderWidth: 0
								}
							],
							labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
						},
						'2W': {
							datasets: [
								{
									label: 'Created',
									data: [3, 2, 1, 4, 8, 8, 4],
									fill: true,
									backgroundColor: '#42BFF7',
									pointRadius: 0,
									pointHitRadius: 20,
									borderWidth: 0
								}
							],
							labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
						},
						LW: {
							datasets: [
								{
									label: 'Created',
									data: [6, 5, 4, 5, 7, 4, 7],
									fill: true,
									backgroundColor: '#42BFF7',
									pointRadius: 0,
									pointHitRadius: 20,
									borderWidth: 0
								}
							],
							labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
						},
						options: {
							legend: {
								display: false
							},
							maintainAspectRatio: false,
							scales: {
								xAxes: [
									{
										display: false
									}
								],
								yAxes: [
									{
										display: false
									}
								]
							}
						}
					}
				},
				reOpened: {
					label: 'RE-OPENED',
					count: {
						'2W': 4,
						LW: 5,
						TW: 2
					},
					chart: {
						'2W': {
							datasets: [
								{
									label: 'Created',
									data: [6, 3, 7, 5, 5, 4, 7],
									fill: true,
									backgroundColor: '#42BFF7',
									pointRadius: 0,
									pointHitRadius: 20,
									borderWidth: 0
								}
							],
							labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
						},
						LW: {
							datasets: [
								{
									label: 'Created',
									data: [5, 7, 8, 8, 6, 4, 1],
									fill: true,
									backgroundColor: '#42BFF7',
									pointRadius: 0,
									pointHitRadius: 20,
									borderWidth: 0
								}
							],
							labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
						},
						TW: {
							datasets: [
								{
									label: 'Created',
									data: [3, 2, 1, 4, 8, 8, 4],
									fill: true,
									backgroundColor: '#42BFF7',
									pointRadius: 0,
									pointHitRadius: 20,
									borderWidth: 0
								}
							],
							labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
						},
						TW2: [
							{
								name: 'RE-OPENED',
								series: [
									{
										name: 'Mon',
										value: 3
									},
									{
										name: 'Tue',
										value: 2
									},
									{
										name: 'Wed',
										value: 1
									},
									{
										name: 'Thu',
										value: 4
									},
									{
										name: 'Fri',
										value: 8
									},
									{
										name: 'Sat',
										value: 8
									},
									{
										name: 'Sun',
										value: 4
									}
								]
							}
						],
						options: {
							legend: {
								display: false
							},
							maintainAspectRatio: false,
							scales: {
								xAxes: [
									{
										display: false
									}
								],
								yAxes: [
									{
										display: false
									}
								]
							}
						}
					}
				},
				wontFix: {
					label: "WON'T FIX",
					count: {
						'2W': 6,
						LW: 3,
						TW: 4
					},
					chart: {
						'2W': {
							datasets: [
								{
									label: 'Created',
									data: [5, 7, 4, 6, 5, 3, 2],
									fill: true,
									backgroundColor: '#42BFF7',
									pointRadius: 0,
									pointHitRadius: 20,
									borderWidth: 0
								}
							],
							labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
						},
						LW: {
							datasets: [
								{
									label: 'Created',
									data: [6, 3, 7, 5, 5, 4, 7],
									fill: true,
									backgroundColor: '#42BFF7',
									pointRadius: 0,
									pointHitRadius: 20,
									borderWidth: 0
								}
							],
							labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
						},
						TW: {
							datasets: [
								{
									label: 'Created',
									data: [6, 5, 4, 5, 7, 4, 7],
									fill: true,
									backgroundColor: '#42BFF7',
									pointRadius: 0,
									pointHitRadius: 20,
									borderWidth: 0
								}
							],
							labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
						},
						options: {
							legend: {
								display: false
							},
							maintainAspectRatio: false,
							scales: {
								xAxes: [
									{
										display: false
									}
								],
								yAxes: [
									{
										display: false
									}
								]
							}
						}
					}
				},
				needsTest: {
					label: 'NEEDS TEST',
					count: {
						'2W': 10,
						LW: 7,
						TW: 8
					},
					chart: {
						'2W': {
							datasets: [
								{
									label: 'Created',
									data: [6, 5, 4, 5, 7, 4, 7],
									fill: true,
									backgroundColor: '#42BFF7',
									pointRadius: 0,
									pointHitRadius: 20,
									borderWidth: 0
								}
							],
							labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
						},
						LW: {
							datasets: [
								{
									label: 'Created',
									data: [5, 7, 8, 8, 6, 4, 1],
									fill: true,
									backgroundColor: '#42BFF7',
									pointRadius: 0,
									pointHitRadius: 20,
									borderWidth: 0
								}
							],
							labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
						},
						TW: {
							datasets: [
								{
									label: 'Created',
									data: [6, 3, 7, 5, 5, 4, 7],
									fill: true,
									backgroundColor: '#42BFF7',
									pointRadius: 0,
									pointHitRadius: 20,
									borderWidth: 0
								}
							],
							labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
						},
						options: {
							legend: {
								display: false
							},
							maintainAspectRatio: false,
							scales: {
								xAxes: [
									{
										display: false
									}
								],
								yAxes: [
									{
										display: false
									}
								]
							}
						}
					}
				},
				fixed: {
					label: 'FIXED',
					count: {
						'2W': 21,
						LW: 17,
						TW: 14
					},
					chart: {
						'2W': {
							datasets: [
								{
									label: 'Created',
									data: [5, 7, 8, 8, 6, 4, 1],
									fill: true,
									backgroundColor: '#42BFF7',
									pointRadius: 0,
									pointHitRadius: 20,
									borderWidth: 0
								}
							],
							labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
						},
						LW: {
							datasets: [
								{
									label: 'Created',
									data: [6, 5, 4, 5, 7, 4, 7],
									fill: true,
									backgroundColor: '#42BFF7',
									pointRadius: 0,
									pointHitRadius: 20,
									borderWidth: 0
								}
							],
							labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
						},
						TW: {
							datasets: [
								{
									label: 'Created',
									data: [5, 7, 4, 6, 5, 3, 2],
									fill: true,
									backgroundColor: '#42BFF7',
									pointRadius: 0,
									pointHitRadius: 20,
									borderWidth: 0
								}
							],
							labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
						},
						options: {
							legend: {
								display: false
							},
							maintainAspectRatio: false,
							scales: {
								xAxes: [
									{
										display: false
									}
								],
								yAxes: [
									{
										display: false
									}
								]
							}
						}
					}
				}
			}
		},
	
	
		
	
	
	
		{
			id: 'widget10',
			title: "This is what you're making at your Current Level of Production",
			table: {
				columns: [
					{
						id: 'budget_type',
						title: ''
					},
					{
						id: 'total_budget',
						title: 'AUTO'
					},
					{
						id: 'spent_usd',
						title: 'FIRE'
					},
					{
						id: 'spent_perc',
						title: 'LIFE'
					},
					{
						id: 'remaining_usd',
						title: 'HEALTH'
					},
					{
						id: 'remaining_perc',
						title: 'BANK'
					},
					{
						id: 'total',
						title: 'TOTAL'
					}
				],
				rows: [
					{
						id: 1,
						cells: [
							{
								id: 'budget_type',
								value: 'Policies',
								classes: 'bg-blue text-white',
								icon: ''
							},
							{
								id: 'total_budget',
								value: '$14,880.00',
								classes: 'font-bold',
								icon: ''
							},
							{
								id: 'spent_usd',
								value: '$14,000.00',
								classes: '',
								icon: ''
							},
							{
								id: 'spent_perc',
								value: '$94.08',
								classes: '',
								icon: ''
							},
							{
								id: 'remaining_usd',
								value: '$880.00',
								classes: '',
								icon: ''
							},
							{
								id: 'remaining_perc',
								value: '$5.92',
								classes: '',
								icon: ''
							},
							{
								id: 'total',
								value: '$100.00',
								classes: '',
								icon: ''
							}
						]
					},
					{
						id: 2,
						cells: [
							{
								id: 'budget_type',
								value: 'Anual Preminum',
								classes: 'bg-green text-white',
								icon: ''
							},
							{
								id: 'total_budget',
								value: '$21,080.00',
								classes: 'font-bold',
								icon: ''
							},
							{
								id: 'spent_usd',
								value: '$17,240.34',
								classes: '',
								icon: ''
							},
							{
								id: 'spent_perc',
								value: '$81.78',
								classes: '',
								icon: ''
							},
							{
								id: 'remaining_usd',
								value: '$3,839.66',
								classes: '',
								icon: ''
							},
							{
								id: 'remaining_perc',
								value: '$8.22',
								classes: '',
								icon: ''
							}
						]
					},
					{
						id: 3,
						cells: [
							{
								id: 'budget_type',
								value: 'Avg Premium',
								classes: 'bg-red text-white',
								icon: ''
							},
							{
								id: 'total_budget',
								value: '$34,720.00',
								classes: 'font-bold',
								icon: ''
							},
							{
								id: 'spent_usd',
								value: '$3,518.00',
								classes: '',
								icon: ''
							},
							{
								id: 'spent_perc',
								value: '$81.78',
								classes: '',
								icon: ''
							},
							{
								id: 'remaining_usd',
								value: '$31,202.00',
								classes: '',
								icon: ''
							},
							{
								id: 'remaining_perc',
								value: '$89.87',
								classes: '',
								icon: ''
							}
						]
					},
					{
						id: 4,
						cells: [
							{
								id: 'budget_type',
								value: 'Level Reached',
								classes: 'bg-pink text-white',
								icon: ''
							},
							{
								id: 'total_budget',
								value: '$34,720.00',
								classes: 'font-bold',
								icon: ''
							},
							{
								id: 'spent_usd',
								value: '$0.00',
								classes: '',
								icon: ''
							},
							{
								id: 'spent_perc',
								value: '$81.78',
								classes: '',
								icon: ''
							},
							{
								id: 'remaining_usd',
								value: '$34,720.00',
								classes: '',
								icon: ''
							},
							{
								id: 'remaining_perc',
								value: '$100.00',
								classes: '',
								icon: ''
							}
						]
					},
					{
						id: 5,
						cells: [
							{
								id: 'budget_type',
								value: 'Target Bonus Earned',
								classes: 'bg-orange text-white',
								icon: ''
							},
							{
								id: 'total_budget',
								value: '$18,600.00',
								classes: 'font-bold',
								icon: ''
							},
							{
								id: 'spent_usd',
								value: '$0.00',
								classes: '',
								icon: ''
							},
							{
								id: 'spent_perc',
								value: '$81.78',
								classes: '',
								icon: ''
							},
							{
								id: 'remaining_usd',
								value: '$34,720.00',
								classes: '',
								icon: ''
							},
							{
								id: 'remaining_perc',
								value: '$100.00',
								classes: '',
								icon: ''
							}
						]
					}
				]
			}
		},
	
	
	
	
	
		
		
	
	
	],
	projects: [
		{
			id: 1,
			name: 'ACME Corp. Backend App'
		},
		{
			id: 2,
			name: 'ACME Corp. Frontend App'
		},
		{
			id: 3,
			name: 'Creapond'
		},
		{
			id: 4,
			name: 'Withinpixels'
		}
	]
};

mock.onGet('/api/lapse-rate/widgets').reply(config => {
	return [200, projectDashboardAppDB.widgets];
});

mock.onGet('/api/lapse-rate/projects').reply(config => {
	return [200, projectDashboardAppDB.projects];
});
