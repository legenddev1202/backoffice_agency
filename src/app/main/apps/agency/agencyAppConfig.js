import React from 'react';
import { Redirect } from 'react-router-dom';

const AgencyAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/apps/agency/payroll',
			component: React.lazy(() => import('./Payroll/Payroll'))
		},
		{
			path: '/apps/agency/product-line',
			component: React.lazy(() => import('./ProductLine/ProductLine'))
		},
		{
			path: '/apps/agency/sources',
			component: React.lazy(() => import('./Sources/Sources'))
		},
		{
			path: '/apps/agency/multiline',
			component: React.lazy(() => import('./Multiline/Multiline'))
		},
		{
			path: '/apps/agency/target-reports',
			component: React.lazy(() => import('./TargetReports/TargetReports'))
		},
		{
			path: '/apps/agency/possible-money',
			component: React.lazy(() => import('./PossibleMoney/PossibleMoney'))
		},
		{
			path: '/apps/agency',
			component: () => <Redirect to="/apps/agency/Payroll" />
		}
	]
};

export default AgencyAppConfig;
