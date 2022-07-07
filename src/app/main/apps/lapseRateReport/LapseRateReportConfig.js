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
			path: '/apps/lapse-rate-report',
			component: React.lazy(() => import('./LapseRateReport'))
		}
	]
};

export default AnalyticsDashboardAppConfig;
