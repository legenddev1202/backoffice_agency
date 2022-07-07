import React from 'react';
import { Redirect } from 'react-router-dom';

const VisionAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/apps/vision/income-goals',
			component: React.lazy(() => import('./IncomeGoals/IncomeGoals'))
		},
		{
			path: '/apps/vision',
			component: () => <Redirect to="/apps/vision/income-goals" />
		}
	]
};

export default VisionAppConfig;
