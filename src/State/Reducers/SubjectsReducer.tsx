import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../Store';
import { fetchSubjectsAsync, createSubjectAsync } from '../Thunks/SubjectsThunk'

interface RolesMap {
    [key: string]: any;
}

export interface Roles {
    roles: RolesMap;
}

const initialState: Roles = {
    roles: {
        connid: '',
    },
};

export const fetchSubjectsSlice = createSlice({
    name: 'fetchSubjects',
    initialState,
    
    reducers: {
        performFetchSubjects: (state, action: PayloadAction<Array<any>>) => {
            state.roles = action.payload;
        },
        performCreateSubject: (state, action: PayloadAction<Array<any>>) => {
            state.roles = action.payload;
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchSubjectsAsync.fulfilled, (state, action) => {
            // console.log(action.payload);
            // console.log(state);
        });
        builder.addCase(createSubjectAsync.fulfilled, (state, action) => {
            // console.log(action.payload);
            // console.log(state);
        });
    },
});

export const { performFetchSubjects, performCreateSubject } = fetchSubjectsSlice.actions;

export const fetchSubjects = (state: RootState) => state.fetchRoles.roles;

export default fetchSubjectsSlice.reducer;