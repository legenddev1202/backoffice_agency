import React from 'react';
import { Redirect } from 'react-router-dom';

const ProducerAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/apps/producer/goals-actual',
			component: React.lazy(() => import('./GoalsAndActual/GoalsAndActual'))
		},
		{
			path: '/apps/producer/policies-bank',
			component: React.lazy(() => import('./PoliciesAndBank/PoliciesAndBank'))
		},
		{
			path: '/apps/producer/staff-sources',
			component: React.lazy(() => import('./StaffSources/StaffSources'))
		},
		{
			path: '/apps/producer/staff-multiline',
			component: React.lazy(() => import('./StaffMultiline/StaffMultiline'))
		},
		{
			path: '/apps/producer',
			component: () => <Redirect to="/apps/producer/goals-actual" />
		}
	]
};

export default ProducerAppConfig;
