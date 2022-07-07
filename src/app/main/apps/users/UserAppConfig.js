import React from 'react';
import { Redirect } from 'react-router-dom';

const ECommerceAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		
		{
			path: '/apps/setup/users',
			component: React.lazy(() => import('./user/Users'))
		}	
	
		
		
	]
};

export default ECommerceAppConfig;
