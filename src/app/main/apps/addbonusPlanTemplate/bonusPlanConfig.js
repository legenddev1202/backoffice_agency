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
			path: '/apps/setup/add-bonus-plan-template/:id',
			component: React.lazy(() => import('./BonusPlanApp'))
		},
		{
			path: '/apps/setup/bonus-plan-template',
			component: () => <Redirect to="/apps/setup/add-bonus-plan-template/all" />
		}
		
	]
};

export default ContactsAppConfig;
