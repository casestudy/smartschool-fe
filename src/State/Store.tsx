import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import loginUserReducer from './Reducers/LoginReducer';
import fetchRolesReducer from './Reducers/RolesReducer';
import fetchSubjectsReducer from './Reducers/SubjectsReducer';

export const Store = configureStore({
    middleware: (getDefaultMiddleware) => 
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [
					'loginUser/fulfilled',
					'fetchRoles/fulfilled',
					'fetchSubjects/fulfilled'
				]
			},
		}),
	reducer: {
		loginUser: loginUserReducer,
		fetchRoles: fetchRolesReducer,
		fetchSubjects: fetchSubjectsReducer
	}, 
});

export type AppDispatch = typeof Store.dispatch;
export type RootState = ReturnType <typeof Store.getState>;
export type AppThunk <ReturnType = void> = ThunkAction <ReturnType, RootState, unknown, Action<string>>;