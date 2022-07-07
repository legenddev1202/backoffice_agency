import _ from '@lodash';
import mock from '../mock';
import { db, realDb } from './firebase';

const projectionsAppDB = {
	widgets: [
		{
			id: 'Projections_Default_Producer_Opportunity_Graph_Chart',
			title: 'Opportunity at Projected Levels of Production',
			mainChart: {
				TW: {
					labels: [],
					datasets: [
						{
							type: 'bar',
							barPercentage: 0.5,
							label: 'Salary',
							data: [],
							backgroundColor: '#77ff99',
							hoverBackgroundColor: '#c9ffd6',
							categoryPercentage: 1
						},
						{
							type: 'bar',
							barPercentage: 0.5,
							label: 'Auto',
							data: [],
							backgroundColor: '#42BFF7',
							hoverBackgroundColor: '#87CDF7',
							categoryPercentage: 1
						},
						{
							type: 'bar',
							barPercentage: 0.5,
							label: 'Fire',
							data: [],
							backgroundColor: '#C6ECFD',
							hoverBackgroundColor: '#D7EFFD',
							categoryPercentage: 1
						},
						{
							type: 'bar',
							label: 'Life',
							barPercentage: 0.5,
							data: [],
							backgroundColor: '#f9cfcf',
							hoverBackgroundColor: '#ffcece',
							categoryPercentage: 1
						},
						{
							type: 'bar',
							label: 'Health',
							barPercentage: 0.5,
							data: [],
							backgroundColor: '#77ff99',
							hoverBackgroundColor: '#c9ffd6',
							categoryPercentage: 1
						},
						{
							type: 'bar',
							label: 'Bank',
							barPercentage: 0.5,
							data: [],
							backgroundColor: '#f9cfcf',
							hoverBackgroundColor: '#ffcece',
							categoryPercentage: 1
						},
						{
							type: 'bar',
							label: 'Lapse%',
							barPercentage: 0.5,
							data: [],
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
								labels: ['Projection1', 'Projection2', 'Projection3', 'Projection4', 'Projection5']
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
			}
		},
		{
			id: 'Projections_Table',
			title: '',
			table: {
				columns: [],
				headers: [
					{ id: 'AVERAGES', value: 'AVERAGES', type: false, color: '' },
					{ id: 'Auto', value: 'Auto', type: false, color: '' },
					{ id: 'Fire', value: 'Fire', type: false, color: '' },
					{ id: 'Life', value: 'Life', type: false, color: '' },
					{ id: 'Health', value: 'Health', type: false, color: '' },
					{ id: 'Bank', value: 'Bank', type: false, color: '' }
				],
				rows: [
					{
						id: 'Year 1 Commission per Item(Custom)',
						value: 'Year 1 Commission per Item(Custom)',
						color: '',
						startAdornment: '$',
						hidden: true
					},
					{
						id: 'Year 1 Commission per Item',
						value: 'Year 1 Commission per Item',
						color: '',
						startAdornment: '$',
						hidden: true
					},
					{
						id: 'ANNUAL Premium Average per Policy',
						value: 'ANNUAL Premium Average per Policy',
						color: '',
						startAdornment: '$'
					},
					{
						id: 'Average Initial PRODUCER Bonus per Policy',
						value: 'Average Initial PRODUCER Bonus per Policy',
						color: '',
						endAdornment: '%'
					},
					{
						id: 'Avg Initial Bonus per Item',
						value: 'Avg Initial Bonus per Item',
						color: '',
						endAdornment: '%',
						hidden: true
					},
					{
						id: 'Avg Annual Premium / $',
						value: 'Avg Annual Premium / $',
						color: '',
						startAdornment: '$',
						hidden: true
					}
				],
				tableContent: {
					'Year 1 Commission per Item(Custom)': {
						Auto: 0,
						Fire: 0,
						Life: 0,
						Health: 0,
						Bank: 0
					},
					'Year 1 Commission per Item': {
						Auto: 0,
						Fire: 0,
						Life: 0,
						Health: 0,
						Bank: 0
					},
					'ANNUAL Premium Average per Policy': {
						Auto: 0,
						Fire: 0,
						Life: 0,
						Health: 0,
						Bank: 0
					},
					'Average Initial PRODUCER Bonus per Policy': {
						Auto: 0,
						Fire: 0,
						Life: 0,
						Health: 0,
						Bank: 0
					},
					'Avg Initial Bonus per Item': {
						Auto: 0,
						Fire: 0,
						Life: 0,
						Health: 0,
						Bank: 0
					},
					'Avg Annual Premium / $': {
						Auto: 0,
						Fire: 0,
						Life: 0,
						Health: 0,
						Bank: 0
					}
				}
			}
		},
		{
			id: 'Projections_Custom_Table',
			title: '',
			table: {
				columns: [],
				headers: [
					{ id: 'AVERAGES', value: 'AVERAGES', type: false, color: '' },
					{ id: 'Auto', value: 'Auto', type: false, color: '' },
					{ id: 'Fire', value: 'Fire', type: false, color: '' },
					{ id: 'Life', value: 'Life', type: false, color: '' },
					{ id: 'Health', value: 'Health', type: false, color: '' },
					{ id: 'Bank', value: 'Bank', type: false, color: '' }
				],
				rows: [
					{
						id: 'Year 1 Commission per Item(Custom)',
						value: 'Year 1 Commission per Item(Custom)',
						color: '',
						startAdornment: '$',
						hidden: true
					},
					{
						id: 'Year 1 Commission per Item',
						value: 'Year 1 Commission per Item',
						color: '',
						startAdornment: '$',
						hidden: true
					},
					{
						id: 'ANNUAL Premium Average per Policy',
						value: 'ANNUAL Premium Average per Policy',
						color: '',
						startAdornment: '$',
						hidden: true
					},
					{
						id: 'Average Initial PRODUCER Bonus per Policy',
						value: 'Average Initial PRODUCER Bonus per Policy',
						color: '',
						endAdornment: '%',
						hidden: true
					},
					{
						id: 'Avg Initial Bonus per Item',
						value: 'Avg Initial Bonus per Item',
						color: '',
						endAdornment: '%'
					},
					{
						id: 'Avg Annual Premium / $',
						value: 'Avg Annual Premium / $',
						color: '',
						startAdornment: '$'
					}
				],
				tableContent: {
					'Year 1 Commission per Item(Custom)': {
						Auto: 0,
						Fire: 0,
						Life: 0,
						Health: 0,
						Bank: 0
					},
					'Year 1 Commission per Item': {
						Auto: 0,
						Fire: 0,
						Life: 0,
						Health: 0,
						Bank: 0
					},
					'ANNUAL Premium Average per Policy': {
						Auto: 0,
						Fire: 0,
						Life: 0,
						Health: 0,
						Bank: 0
					},
					'Average Initial PRODUCER Bonus per Policy': {
						Auto: 0,
						Fire: 0,
						Life: 0,
						Health: 0,
						Bank: 0
					},
					'Avg Initial Bonus per Item': {
						Auto: 0,
						Fire: 0,
						Life: 0,
						Health: 0,
						Bank: 0
					},
					'Avg Annual Premium / $': {
						Auto: 0,
						Fire: 0,
						Life: 0,
						Health: 0,
						Bank: 0
					}
				}
			}
		},
		{
			id: 'Projections_Commisison_Table',
			title: '',
			table: {
				columns: [],
				headers: [
					{ id: 'AVERAGES', value: 'AVERAGES', type: false, color: '' },
					{ id: 'Auto', value: 'Auto', type: false, color: '' },
					{ id: 'Fire', value: 'Fire', type: false, color: '' },
					{ id: 'Life', value: 'Life', type: false, color: '' },
					{ id: 'Health', value: 'Health', type: false, color: '' },
					{ id: 'Bank', value: 'Bank', type: false, color: '' }
				],
				rows: [
					{
						id: 'Year 1 Commission per Item(Custom)',
						value: 'Year 1 Commission per Item(Custom)',
						color: '',
						startAdornment: '$',
						hidden: true
					},
					{
						id: 'Year 1 Commission per Item',
						value: 'Year 1 Commission per Item',
						color: '',
						startAdornment: '$'
					},
					{
						id: 'ANNUAL Premium Average per Policy',
						value: 'ANNUAL Premium Average per Policy',
						color: '',
						startAdornment: '$',
						hidden: true
					},
					{
						id: 'Average Initial PRODUCER Bonus per Policy',
						value: 'Average Initial PRODUCER Bonus per Policy',
						color: '',
						endAdornment: '%'
					},
					{
						id: 'Avg Initial Bonus per Item',
						value: 'Avg Initial Bonus per Item',
						color: '',
						endAdornment: '%',
						hidden: true
					},
					{
						id: 'Avg Annual Premium / $',
						value: 'Avg Annual Premium / $',
						color: '',
						startAdornment: '$',
						hidden: true
					}
				],
				tableContent: {
					'Year 1 Commission per Item(Custom)': {
						Auto: 0,
						Fire: 0,
						Life: 0,
						Health: 0,
						Bank: 0
					},
					'Year 1 Commission per Item': {
						Auto: 0,
						Fire: 0,
						Life: 0,
						Health: 0,
						Bank: 0
					},
					'ANNUAL Premium Average per Policy': {
						Auto: 0,
						Fire: 0,
						Life: 0,
						Health: 0,
						Bank: 0
					},
					'Average Initial PRODUCER Bonus per Policy': {
						Auto: 0,
						Fire: 0,
						Life: 0,
						Health: 0,
						Bank: 0
					},
					'Avg Initial Bonus per Item': {
						Auto: 0,
						Fire: 0,
						Life: 0,
						Health: 0,
						Bank: 0
					},
					'Avg Annual Premium / $': {
						Auto: 0,
						Fire: 0,
						Life: 0,
						Health: 0,
						Bank: 0
					}
				}
			}
		},
		{
			id: 'Projections_Custom_Commisison_Table',
			title: '',
			table: {
				columns: [],
				headers: [
					{ id: 'AVERAGES', value: 'AVERAGES', type: false, color: '' },
					{ id: 'Auto', value: 'Auto', type: false, color: '' },
					{ id: 'Fire', value: 'Fire', type: false, color: '' },
					{ id: 'Life', value: 'Life', type: false, color: '' },
					{ id: 'Health', value: 'Health', type: false, color: '' },
					{ id: 'Bank', value: 'Bank', type: false, color: '' }
				],
				rows: [
					{
						id: 'Year 1 Commission per Item(Custom)',
						value: 'Year 1 Commission per Item(Custom)',
						color: '',
						startAdornment: '$'
					},
					{
						id: 'Year 1 Commission per Item',
						value: 'Year 1 Commission per Item',
						color: '',
						startAdornment: '$',
						hidden: true
					},
					{
						id: 'ANNUAL Premium Average per Policy',
						value: 'ANNUAL Premium Average per Policy',
						color: '',
						startAdornment: '$',
						hidden: true
					},
					{
						id: 'Average Initial PRODUCER Bonus per Policy',
						value: 'Average Initial PRODUCER Bonus per Policy',
						color: '',
						endAdornment: '%'
					},
					{
						id: 'Avg Initial Bonus per Item',
						value: 'Avg Initial Bonus per Item',
						color: '',
						endAdornment: '%',
						hidden: true
					},
					{
						id: 'Avg Annual Premium / $',
						value: 'Avg Annual Premium / $',
						color: '',
						startAdornment: '$',
						hidden: true
					}
				],
				tableContent: {
					'Year 1 Commission per Item(Custom)': {
						Auto: 0,
						Fire: 0,
						Life: 0,
						Health: 0,
						Bank: 0
					},
					'Year 1 Commission per Item': {
						Auto: 0,
						Fire: 0,
						Life: 0,
						Health: 0,
						Bank: 0
					},
					'ANNUAL Premium Average per Policy': {
						Auto: 0,
						Fire: 0,
						Life: 0,
						Health: 0,
						Bank: 0
					},
					'Average Initial PRODUCER Bonus per Policy': {
						Auto: 0,
						Fire: 0,
						Life: 0,
						Health: 0,
						Bank: 0
					},
					'Avg Initial Bonus per Item': {
						Auto: 0,
						Fire: 0,
						Life: 0,
						Health: 0,
						Bank: 0
					},
					'Avg Annual Premium / $': {
						Auto: 0,
						Fire: 0,
						Life: 0,
						Health: 0,
						Bank: 0
					}
				}
			}
		},
		{
			id: 'Projections_Default_Producer_Opportunity_Summary_Production_Table',
			title: '',
			table: {
				columns: [
					{
						id: 'avatar',
						title: 'Projection',
						color: '',
						align: 'center',
						rowSpan: 2
					},
					{
						id: 'production',
						title: 'PROJECTED PRODUCTION',
						color: '',
						colSpan: 6
					}
				],
				headers: [
					{ id: 0, value: 'Auto', type: true },
					{ id: 1, value: 'Fire', type: false },
					{ id: 2, value: 'Life', type: true },
					{ id: 3, value: 'Health', type: false },
					{ id: 4, value: 'Total', type: true },
					{ id: 5, value: 'Bank', type: false }
				],
				rows: [
					{ id: 'Per Month', value: 'Per Month', color: '' },
					{ id: 'Premium Per Month', value: 'Premium Per Month', color: '' },
					{ id: 'Per Year', value: 'Per Year', color: '' },
					{ id: 'Premium Per Year', value: 'Premium Per Year', color: '' }
				],
				tableContent: {
					'Per Month': {
						Auto: 0,
						Fire: 0,
						Life: 0,
						Health: 0,
						Total: 0,
						Bank: 0
					},
					'Premium Per Month': { Auto: 0, Fire: 0, Life: 0, Health: 0, Total: 0, Bank: 0 },
					'Per Year': { Auto: 0, Fire: 0, Life: 0, Health: 0, Total: 0, Bank: 0 },
					'Premium Per Year': { Auto: 0, Fire: 0, Life: 0, Health: 0, Total: 0, Bank: 0 }
				}
			}
		},
		{
			id: 'Projections_Default_Producer_Opportunity_Summary_Income_Table',
			title: '',
			table: {
				columns: [
					{
						id: 'avatar',
						title: 'Monthly Bonuses',
						color: '',
						align: 'center',
						rowSpan: 2
					},
					{
						id: 'income',
						title: 'PROJECTED INCOME',
						color: '',
						colSpan: 8
					}
				],
				headers: [
					{ id: 0, value: 'Salary', type: true },
					{ id: 1, value: 'Auto', type: true },
					{ id: 2, value: 'Fire', type: false },
					{ id: 3, value: 'Life', type: true },
					{ id: 4, value: 'Health', type: false },
					{ id: 5, value: 'Bank', type: false },
					{ id: 6, value: 'Lapse%', type: false },
					{ id: 7, value: 'Total', type: true }
				],
				rows: [
					{ id: 'Individual Item Bonuses', value: 'Individual Item Bonuses', color: '', hidden: true },
					{ id: 'Indiviual Target Bonuses', value: 'Indiviual Target Bonuses', color: '', hidden: true },
					{ id: 'Team Target Bonus Project', value: 'Team Target Bonus Project', color: '', hidden: true },
					{ id: 'Monthly Totals', value: 'Monthly Totals', color: '' },
					{ id: 'Annual Totals', value: 'Annual Totals', color: '' }
				],
				tableContent: {
					'Individual Item Bonuses': {
						Salary: 0,
						Auto: 0,
						Fire: 0,
						Life: 0,
						Health: 0,
						Bank: 0,
						'Lapse%': 0,
						Total: 0
					},
					'Indiviual Target Bonuses': {
						Salary: 0,
						Auto: 0,
						Fire: 0,
						Life: 0,
						Health: 0,
						Bank: 0,
						'Lapse%': 0,
						Total: 0
					},
					'Team Target Bonus Project': {
						Salary: 0,
						Auto: 0,
						Fire: 0,
						Life: 0,
						Health: 0,
						Bank: 0,
						'Lapse%': 0,
						Total: 0
					},
					'Monthly Totals': {
						Salary: 0,
						Auto: 0,
						Fire: 0,
						Life: 0,
						Health: 0,
						Bank: 0,
						'Lapse%': 0,
						Total: 0
					},
					'Annual Totals': { Salary: 0, Auto: 0, Fire: 0, Life: 0, Health: 0, Bank: 0, 'Lapse%': 0, Total: 0 }
				}
			}
		},
		{
			id: 'Projections_Default_Producer_Opportunity_Detaild_Production_Table',
			title: '',
			table: {
				columns: [
					{
						id: 'avatar',
						title: 'Projection',
						color: '',
						align: 'center',
						rowSpan: 2
					},
					{
						id: 'production',
						title: 'PROJECTED PRODUCTION',
						color: '',
						colSpan: 6
					}
				],
				headers: [
					{ id: 0, value: 'Auto', type: true },
					{ id: 1, value: 'Fire', type: false },
					{ id: 2, value: 'Life', type: true },
					{ id: 3, value: 'Health', type: false },
					{ id: 4, value: 'Total', type: true },
					{ id: 5, value: 'Bank', type: false }
				],
				rows: [
					{ id: 'Per Month', value: 'Per Month', color: '' },
					{ id: 'Premium Per Month', value: 'Premium Per Month', color: '' },
					{ id: 'Per Year', value: 'Per Year', color: '' },
					{ id: 'Premium Per Year', value: 'Premium Per Year', color: '' }
				],
				tableContent: {
					'Per Month': { Auto: 0, Fire: 0, Life: 0, Health: 0, Total: 0, Bank: 0 },
					'Premium Per Month': { Auto: 0, Fire: 0, Life: 0, Health: 0, Total: 0, Bank: 0 },
					'Per Year': { Auto: 0, Fire: 0, Life: 0, Health: 0, Total: 0, Bank: 0 },
					'Premium Per Year': { Auto: 0, Fire: 0, Life: 0, Health: 0, Total: 0, Bank: 0 }
				}
			}
		},
		{
			id: 'Projections_Default_Producer_Opportunity_Detaild_Income_Table',
			title: '',
			table: {
				columns: [
					{
						id: 'avatar',
						title: 'Monthly Bonuses',
						color: '',
						align: 'center',
						rowSpan: 2
					},
					{
						id: 'income',
						title: 'PROJECTED INCOME',
						color: '',
						colSpan: 8
					}
				],
				headers: [
					{ id: 0, value: 'Salary', type: true },
					{ id: 1, value: 'Auto', type: true },
					{ id: 2, value: 'Fire', type: false },
					{ id: 3, value: 'Life', type: true },
					{ id: 4, value: 'Health', type: false },
					{ id: 5, value: 'Bank', type: false },
					{ id: 6, value: 'Lapse%', type: false },
					{ id: 7, value: 'Total', type: true }
				],
				rows: [
					{ id: 'Individual Item Bonuses', value: 'Individual Item Bonuses', color: '' },
					{ id: 'Indiviual Target Bonuses', value: 'Indiviual Target Bonuses', color: '' },
					{ id: 'Team Target Bonus Project', value: 'Team Target Bonus Project', color: '' },
					{ id: 'Monthly Totals', value: 'Monthly Totals', color: '' },
					{ id: 'Annual Totals', value: 'Annual Totals', color: '' }
				],
				tableContent: {
					'Individual Item Bonuses': {
						Salary: 0,
						Auto: 0,
						Fire: 0,
						Life: 0,
						Health: 0,
						Bank: 0,
						'Lapse%': 0,
						Total: 0
					},
					'Indiviual Target Bonuses': {
						Salary: 0,
						Auto: 0,
						Fire: 0,
						Life: 0,
						Health: 0,
						Bank: 0,
						'Lapse%': 0,
						Total: 0
					},
					'Team Target Bonus Project': {
						Salary: 0,
						Auto: 0,
						Fire: 0,
						Life: 0,
						Health: 0,
						Bank: 0,
						'Lapse%': 0,
						Total: 0
					},
					'Monthly Totals': {
						Salary: 0,
						Auto: 0,
						Fire: 0,
						Life: 0,
						Health: 0,
						Bank: 0,
						'Lapse%': 0,
						Total: 0
					},
					'Annual Totals': { Salary: 0, Auto: 0, Fire: 0, Life: 0, Health: 0, Bank: 0, 'Lapse%': 0, Total: 0 }
				}
			}
		},
		{
			id: 'Projections_Default_Producer_Opportunity_Graph_Production_Table',
			title: '',
			table: {
				columns: [
					{
						id: 'avatar',
						title: 'Projection',
						color: '',
						align: 'center',
						rowSpan: 2
					},
					{
						id: 'production',
						title: 'MONTHLY PRODUCTION',
						color: '',
						colSpan: 6
					}
				],
				headers: [
					{ id: 0, value: 'Auto', type: true },
					{ id: 1, value: 'Fire', type: false },
					{ id: 2, value: 'Life', type: true },
					{ id: 3, value: 'Health', type: false },
					{ id: 4, value: 'Total', type: true },
					{ id: 5, value: 'Bank', type: false }
				],
				rows: [
					{ id: 'Per Month', value: 'Per Month', color: '' },
					{ id: 'Premium Per Month', value: 'Premium Per Month', color: '' }
				],
				tableContent: {
					'Per Month': { Auto: 0, Fire: 0, Life: 0, Health: 0, Total: 0, Bank: 0 },
					'Premium Per Month': { Auto: 0, Fire: 0, Life: 0, Health: 0, Total: 0, Bank: 0 }
				}
			}
		},
		{
			id: 'Projections_Default_Producer_Opportunity_Graph_Income_Table',
			title: '',
			table: {
				columns: [
					{
						id: 'avatar',
						title: 'Monthly Bonuses',
						color: '',
						align: 'center',
						rowSpan: 2
					},
					{
						id: 'income',
						title: 'PROJECTED INCOME',
						color: '',
						colSpan: 8
					}
				],
				headers: [
					{ id: 0, value: 'Salary', type: true },
					{ id: 1, value: 'Auto', type: true },
					{ id: 2, value: 'Fire', type: false },
					{ id: 3, value: 'Life', type: true },
					{ id: 4, value: 'Health', type: false },
					{ id: 5, value: 'Bank', type: false },
					{ id: 6, value: 'Lapse%', type: false },
					{ id: 7, value: 'Total', type: true }
				],
				rows: [
					{ id: 'Individual Item Bonuses', value: 'Individual Item Bonuses', color: '', hidden: true },
					{ id: 'Indiviual Target Bonuses', value: 'Indiviual Target Bonuses', color: '', hidden: true },
					{ id: 'Team Target Bonus Project', value: 'Team Target Bonus Project', color: '', hidden: true },
					{ id: 'Monthly Totals', value: 'Monthly Totals', color: '' },
					{ id: 'Annual Totals', value: 'Annual Totals', color: '' }
				],
				tableContent: {
					'Individual Item Bonuses': {
						Salary: 0,
						Auto: 0,
						Fire: 0,
						Life: 0,
						Health: 0,
						Bank: 0,
						'Lapse%': 0,
						Total: 0
					},
					'Indiviual Target Bonuses': {
						Salary: 0,
						Auto: 0,
						Fire: 0,
						Life: 0,
						Health: 0,
						Bank: 0,
						'Lapse%': 0,
						Total: 0
					},
					'Team Target Bonus Project': {
						Salary: 0,
						Auto: 0,
						Fire: 0,
						Life: 0,
						Health: 0,
						Bank: 0,
						'Lapse%': 0,
						Total: 0
					},
					'Monthly Totals': {
						Salary: 0,
						Auto: 0,
						Fire: 0,
						Life: 0,
						Health: 0,
						Bank: 0,
						'Lapse%': 0,
						Total: 0
					},
					'Annual Totals': { Salary: 0, Auto: 0, Fire: 0, Life: 0, Health: 0, Bank: 0, 'Lapse%': 0, Total: 0 }
				}
			}
		},
		{
			id: 'Projections_Default_Agency_Income_Report_Production_Table',
			title: '',
			table: {
				columns: [
					{
						id: 'avatar',
						title: 'Projection',
						color: '',
						align: 'center',
						rowSpan: 2
					},
					{
						id: 'production',
						title: 'PROJECTED PRODUCTION',
						color: '',
						colSpan: 6
					}
				],
				headers: [
					{ id: 0, value: 'Auto', type: true },
					{ id: 1, value: 'Fire', type: false },
					{ id: 2, value: 'Life', type: true },
					{ id: 3, value: 'Health', type: false },
					{ id: 4, value: 'Total', type: true },
					{ id: 5, value: 'Bank', type: false }
				],
				rows: [
					{ id: 'Per Month', value: 'Per Month', color: '' },
					{ id: 'Premium Per Month', value: 'Premium Per Month', color: '' },
					{ id: 'Per Year', value: 'Per Year', color: '' },
					{ id: 'Premium Per Year', value: 'Premium Per Year', color: '' }
				],
				tableContent: {
					'Per Month': { Auto: 0, Fire: 0, Life: 0, Health: 0, Total: 0, Bank: 0 },
					'Premium Per Month': { Auto: 0, Fire: 0, Life: 0, Health: 0, Total: 0, Bank: 0 },
					'Per Year': { Auto: 0, Fire: 0, Life: 0, Health: 0, Total: 0, Bank: 0 },
					'Premium Per Year': { Auto: 0, Fire: 0, Life: 0, Health: 0, Total: 0, Bank: 0 }
				}
			}
		},
		{
			id: 'Projections_Default_Agency_Income_Report_Income_Table',
			title: '',
			table: {
				columns: [
					{
						id: 'avatar',
						title: 'YEAR 1 INCOME',
						color: '',
						align: 'center',
						rowSpan: 2
					},
					{
						id: 'income',
						title: 'PROJECTED INCOME',
						color: '',
						colSpan: 8
					}
				],
				headers: [
					{ id: 0, value: 'Percent', type: true },
					{ id: 1, value: 'Auto', type: true },
					{ id: 2, value: 'Fire', type: false },
					{ id: 3, value: 'Life', type: true },
					{ id: 4, value: 'Health', type: false },
					{ id: 5, value: 'Bank', type: false },
					{ id: 6, value: 'Lapse%', type: false },
					{ id: 7, value: 'Total', type: true }
				],
				rows: [
					{ id: 'Individual Item Bonuses', value: 'Individual Item Bonuses', color: '', hidden: true },
					{ id: 'Indiviual Target Bonuses', value: 'Indiviual Target Bonuses', color: '', hidden: true },
					{ id: 'Team Target Bonus Project', value: 'Team Target Bonus Project', color: '', hidden: true },
					{ id: 'Monthly Totals', value: 'Monthly Totals', color: '', hidden: true },
					{ id: 'Commissions to Agency', value: 'Commissions to Agency', color: '' },
					{ id: 'Bonuses Paid to Individual', value: 'Bonuses Paid to Individual', color: '' },
					{ id: 'Team Bonuses to Others', value: 'Team Bonuses to Others', color: '' },
					{ id: 'Net Profit Before Overhead', value: 'Net Profit Before Overhead', color: '' }
				],
				tableContent: {
					'Individual Item Bonuses': {
						Percent: 0,
						Auto: 0,
						Fire: 0,
						Life: 0,
						Health: 0,
						Bank: 0,
						'Lapse%': 0,
						Total: 0
					},
					'Indiviual Target Bonuses': {
						Percent: 0,
						Auto: 0,
						Fire: 0,
						Life: 0,
						Health: 0,
						Bank: 0,
						'Lapse%': 0,
						Total: 0
					},
					'Team Target Bonus Project': {
						Percent: 0,
						Auto: 0,
						Fire: 0,
						Life: 0,
						Health: 0,
						Bank: 0,
						'Lapse%': 0,
						Total: 0
					},
					'Monthly Totals': {
						Percent: 0,
						Auto: 0,
						Fire: 0,
						Life: 0,
						Health: 0,
						Bank: 0,
						'Lapse%': 0,
						Total: 0
					},
					'Commissions to Agency': {
						Percent: 0,
						Auto: 0,
						Fire: 0,
						Life: 0,
						Health: 0,
						Bank: 0,
						'Lapse%': 0,
						Total: 0
					},
					'Bonuses Paid to Individual': {
						Percent: 0,
						Auto: 0,
						Fire: 0,
						Life: 0,
						Health: 0,
						Bank: 0,
						'Lapse%': 0,
						Total: 0
					},
					'Team Bonuses to Others': {
						Percent: 0,
						Auto: 0,
						Fire: 0,
						Life: 0,
						Health: 0,
						Bank: 0,
						'Lapse%': 0,
						Total: 0
					},
					'Net Profit Before Overhead': {
						Percent: 0,
						Auto: 0,
						Fire: 0,
						Life: 0,
						Health: 0,
						Bank: 0,
						'Lapse%': 0,
						Total: 0
					}
				}
			}
		}
	]
};

mock.onGet('/api/projections-app/projections').reply(() => {
	return [200, projectionsAppDB.projections];
});

mock.onPost('/api/projections-app/projections/save').reply(request => {
	var belongTo = localStorage.getItem('@BELONGTO');
	var UID = localStorage.getItem('@UID');
	const data = JSON.parse(request.data);
	let product = data;

	realDb.ref(`Projections/${data.year}/${belongTo}/${data.userId}`).set({
		Averages: data.Averages,
		CustomBonusPlan: data.CustomBonusPlan ? data.CustomBonusPlan : {},
		teamBonuses: data.teamBonuses,
		baseSalary: data.baseSalary,
		customBaseSalary: data.customBaseSalary ? data.customBaseSalary : 0,
		bonusPlan: data.bonusPlan
	});

	return [200, product];
});

mock.onGet('/api/projections-app/widgets').reply(config => {
	return [200, projectionsAppDB.widgets];
});

mock.onGet('/api/projections-app/projects').reply(config => {
	return [200, projectionsAppDB.projects];
});

mock.onGet('/api/projections-app/users').reply(
	() =>
		new Promise((resolve, reject) => {
			var starCountRef = realDb.ref(`users/`);
			starCountRef.on('value', snapshot => {
				const data = snapshot.val();

				if (data) {
					Object.keys(data).map(item => {
						projectionsAppDB.users.push(data[item]);
					});
				}

				resolve(projectionsAppDB.users);
			});
		})
);
