import React from 'react';
import { Redirect } from 'react-router-dom';

const ContactsAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/apps/setup/bonus-plan/:id',
			component: React.lazy(() => import('./BonusPlanApp'))
		},
		{
			path: '/apps/setup/bonus-plan',
			component: () => <Redirect to="/apps/setup/bonus-plan/all" />
		}
		
	]
};

export default ContactsAppConfig;
