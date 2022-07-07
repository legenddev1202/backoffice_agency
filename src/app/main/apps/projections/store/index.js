import { combineReducers } from '@reduxjs/toolkit';
import projections from './projectionsSlice';
import bonusPlans from './bonusPlansSlice';
import bonusPlanTemplates from './bonusPlanTemplatesSlice';
import users from './usersSlice';
import widgets from './widgetsSlice';
import lapseRate from './lapseRateSlice';
import policyGrowth from './policyGrowthSlice';
import entries from './entriesSlice';

const reducer = combineReducers({
	projections,
	widgets,
	bonusPlans,
	bonusPlanTemplates,
	users,
	lapseRate,
	policyGrowth,
	entries,
});

export default reducer;
