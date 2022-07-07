import React from 'react';
import { Redirect } from 'react-router-dom';

const ECommerceAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		
		{
			path: '/apps/setup/product-type',
			component: React.lazy(() => import('./productType/ProductType'))
		}
		
		
	]
};

export default ECommerceAppConfig;
