import FusePageSimple from '@fuse/core/FusePageSimple';
import withReducer from 'app/store/withReducer';
import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useDeepCompareEffect } from '@fuse/hooks';
import ContactDialog from './BonusPlanDialog';
import TargetBonusPlanDialog from './TargetBonusPlanDialog';
import TeamTargetBonusPlanDialog from './TeamTargetBonusPlanDialog';
import NetBonusDialog from './NetBonusPlanDialog';
import ContactsHeader from './BonusPlanHeader';
import ContactsList from './BonusPlanList';
import reducer from './store';
import { getAutoBonus } from './store/bonusPlanSlice';
import { getUserData } from './store/userSlice';
import {
	getProductType
} from './store/productTypeSlice';

function BonusPlanApp(props) {
	const dispatch = useDispatch();

	const pageLayout = useRef(null);
	const routeParams = useParams();

	useDeepCompareEffect(() => {
		dispatch(getAutoBonus(routeParams.id));
		dispatch(getUserData(routeParams.id));
		// dispatch(getProductType())
	}, [dispatch, routeParams.id]);

	return (
		<>
			<FusePageSimple
				classes={{
					contentWrapper: 'p-0 sm:p-24 h-full',
					content: 'flex flex-col h-full',
					leftSidebar: 'w-256 border-0',
					header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
					wrapper: 'min-h-0'
				}}
				header={<ContactsHeader pageLayout={pageLayout} name = {routeParams.id}/>}
				content={<ContactsList />}
				sidebarInner
				ref={pageLayout}
				innerScroll
			/>
			<ContactDialog routeParam={routeParams.id}/>
			<TargetBonusPlanDialog routeParam={routeParams.id}/>
			<TeamTargetBonusPlanDialog routeParam={routeParams.id}/>
			<NetBonusDialog routeParam={routeParams.id}/>
		</>
	);
}

export default withReducer('bonusPlanTemplate', reducer)(BonusPlanApp);
