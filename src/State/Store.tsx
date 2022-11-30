import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import loginUserReducer from './Reducers/LoginReducer';
import fetchRolesReducer from './Reducers/RolesReducer';
import fetchSubjectsReducer from './Reducers/SubjectsReducer';
import fetchClassroomsReducer from './Reducers/ClassroomsReducers';
import fetchUsersReducer from './Reducers/UsersReducers';
import fetchTeachersReducer from './Reducers/TeachersReducers';

export const Store = configureStore({
    middleware: (getDefaultMiddleware) => 
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [
					'loginUser/fulfilled',
					'fetchRoles/fulfilled',
					'fetchSubjects/fulfilled',
					'fetchClassrooms/fulfilled',
					'fetchUsers/fulfilled',
					'fetchTeachers/fulfilled'
				]
			},
		}),
	reducer: {
		loginUser: loginUserReducer,
		fetchRoles: fetchRolesReducer,
		fetchSubjects: fetchSubjectsReducer,
		fetchClassrooms: fetchClassroomsReducer,
		fetchUsers: fetchUsersReducer,
		fetchTeachers: fetchTeachersReducer
	}, 
});

export type AppDispatch = typeof Store.dispatch;
export type RootState = ReturnType <typeof Store.getState>;
export type AppThunk <ReturnType = void> = ThunkAction <ReturnType, RootState, unknown, Action<string>>;