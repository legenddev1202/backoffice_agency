import React from 'react';
import { Redirect } from 'react-router-dom';

const ActivityAppConfig = {
	settings: {
		layout: {}
	},
	routes: [	
		{
			path: '/apps/activity/appRegister',
			component: React.lazy(() => import('./appRegister/AppRegister'))
		},	
		{
			path: '/apps/activity',
			component: () => <Redirect to="/apps/activity/appRegister" />
		}
	]
};

export default ActivityAppConfig;
