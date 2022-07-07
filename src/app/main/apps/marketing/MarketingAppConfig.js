import React from 'react';
import { Redirect } from 'react-router-dom';

const ECommerceAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		
		{
			path: '/apps/setup/marketing',
			component: React.lazy(() => import('./marketing/Marketing'))
		}
		
		
	]
};

export default ECommerceAppConfig;
