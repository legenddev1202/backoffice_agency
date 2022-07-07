import React from 'react';
import { Redirect } from 'react-router-dom';

const AnalyticsDashboardAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/apps/team-policy-growth-report',
			component: React.lazy(() => import('./PolicyGrowthReport'))
		}
	]
};

export default AnalyticsDashboardAppConfig;
