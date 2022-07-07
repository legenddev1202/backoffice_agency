import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store';
import ProductsHeader from './ProductTypeHeader';
import ProductsTable from './ProductTypeTable';

function Products() {
	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				contentCard: 'overflow-hidden',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={<ProductsHeader />}
			content={<ProductsTable />}
			innerScroll
		/>
	);
}

export default withReducer('productType', reducer)(Products);
