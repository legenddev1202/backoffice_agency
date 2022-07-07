import React from 'react';
import { Redirect } from 'react-router-dom';

const ProducerProfileAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/apps/producer-detail/:id',
			component: React.lazy(() => import('./dashboard/Dashboard'))
		},
		// {
		// 	path: '/apps/dashboard',
		// 	component: () => <Redirect to="/apps/producer/dashboard" />
		// }
	]
};

export default ProducerProfileAppConfig;
