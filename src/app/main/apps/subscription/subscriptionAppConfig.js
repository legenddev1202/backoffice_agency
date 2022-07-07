import React from 'react';
import { Redirect } from 'react-router-dom';
import { authRoles } from 'app/auth';

const AgencyAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth:authRoles.admin,
	routes: [
		
		{
			path: '/apps/subscription',
			component: React.lazy(() => import('./Multiline/Multiline'))
		},
		
		{
			path: '/apps/subscription',
			component: () => <Redirect to="/apps/subscription" />
		}
	]
};

export default AgencyAppConfig;
