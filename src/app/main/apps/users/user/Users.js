import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store';
import ProductsHeader from './UsersHeader';
import ProductsTable from './UsersTable';
import AddUserDialog from './AddUserDialog'
import UserProfileDialog from './UserProfileDialog'

function Products() {
	return (
		<>
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
		<AddUserDialog />
		<UserProfileDialog />
		</>
	);
}

export default withReducer('users', reducer)(Products);
