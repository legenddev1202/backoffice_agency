import { configureStore } from '@reduxjs/toolkit';
import createReducer from './rootReducer';
import { persistStore, persistReducer  } from "redux-persist";


if (process.env.NODE_ENV === 'development' && module.hot) {
	module.hot.accept('./rootReducer', () => {
		const newRootReducer = require('./rootReducer').default;
		store.replaceReducer(newRootReducer.createReducer());
	});
}

const middlewares = [];

const storage = require("redux-persist/lib/storage").default;

const persistConfig = {
	key: "data",
	storage,
	whitelist:['auth']
  };
  

if (process.env.NODE_ENV === 'development') {
	const { logger } = require(`redux-logger`);

	middlewares.push(logger);
}

const reducer = persistReducer(persistConfig, createReducer())

const store = configureStore({
	
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			immutableCheck: true,
			serializableCheck: {
				ignoredActions: [
					'dialog/openDialog',
					'dialog/closeDialog',
					'message/showMessage',
					'message/hideMessage',
					'persist/REHYDRATE'
				]
			}
		}).concat(middlewares),
	devTools: false,
	reducer: reducer,

});

store.asyncReducers = {};


export const injectReducer = (key, reducer) => {
	if (store.asyncReducers[key]) {
		return false;
	}
	store.asyncReducers[key] = reducer;
	store.replaceReducer(persistReducer(persistConfig,createReducer(store.asyncReducers)));
	return store;
};

export const persistor = persistStore(store);

export default store;
