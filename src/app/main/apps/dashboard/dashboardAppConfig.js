import React from 'react';
import { Redirect } from 'react-router-dom';

const DashboardAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/apps/dashboard/dashboard',
			component: React.lazy(() => import('./dashboard/Dashboard'))
		},
		{
			path: '/apps/dashboard',
			component: () => <Redirect to="/apps/dashboard/dashboard" />
		}
	]
};

export default DashboardAppConfig;
