import React from 'react';
import { Redirect } from 'react-router-dom';

const ProjectionsAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/apps/projections/setup',
			component: React.lazy(() => import('./setup/Setup'))
		},

		// default
		{
			path: '/apps/projections/default/producer-opportunity-summary',
			component: React.lazy(() => import('./default/ProducerOpportunitySummary'))
		},
		{
			path: '/apps/projections/default/producer-opportunity-detailed',
			component: React.lazy(() => import('./default/ProducerOpportunityDetailed'))
		},
		{
			path: '/apps/projections/default/producer-opportunity-graph',
			component: React.lazy(() => import('./default/ProducerOpportunityGraph'))
		},
		{
			path: '/apps/projections/default/agency-income-report',
			component: React.lazy(() => import('./default/AgencyIncomeReport'))
		},

		// custom
		{
			path: '/apps/projections/custom/producer-opportunity-summary',
			component: React.lazy(() => import('./custom/ProducerOpportunitySummary'))
		},
		{
			path: '/apps/projections/custom/producer-opportunity-detailed',
			component: React.lazy(() => import('./custom/ProducerOpportunityDetailed'))
		},
		{
			path: '/apps/projections/custom/producer-opportunity-graph',
			component: React.lazy(() => import('./custom/ProducerOpportunityGraph'))
		},
		{
			path: '/apps/projections/custom/agency-income-report',
			component: React.lazy(() => import('./custom/AgencyIncomeReport'))
		},

		// redirection
		{
			path: '/apps/projections/default',
			component: () => <Redirect to="/apps/projections/default/producer-opportunity-summary" />
		},
		{
			path: '/apps/projections/custom',
			component: () => <Redirect to="/apps/projections/custom/producer-opportunity-summary" />
		},
		{
			path: '/apps/projections',
			component: () => <Redirect to="/apps/projections/setup" />
		}
	]
};

export default ProjectionsAppConfig;
