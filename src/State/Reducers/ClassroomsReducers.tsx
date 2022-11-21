import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../Store';
import { fetchaClassroomsAsync, createclassroomAsync } from '../Thunks/ClassroomsThunk'

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

export const fetchClassroomsSlice = createSlice({
    name: 'fetchclassrooms',
    initialState,
    
    reducers: {
        performFetchClassrooms: (state, action: PayloadAction<Array<any>>) => {
            state.roles = action.payload;
        },
        performCreateClassroom: (state, action: PayloadAction<Array<any>>) => {
            state.roles = action.payload;
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchaClassroomsAsync.fulfilled, (state, action) => {
            // console.log(action.payload);
            // console.log(state);
        });
        builder.addCase(createclassroomAsync.fulfilled, (state, action) => {
            // console.log(action.payload);
            // console.log(state);
        });
    },
});

export const { performFetchClassrooms, performCreateClassroom } = fetchClassroomsSlice.actions;

export const fetchSubjects = (state: RootState) => state.fetchRoles.roles;

export default fetchClassroomsSlice.reducer;