import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../Store';
import { fetchRolesAsync } from '../Thunks/RolesThunk'

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

export const fetchRolesSlice = createSlice({
    name: 'fetchRoles',
    initialState,
    
    reducers: {
        performFetchRoles: (state, action: PayloadAction<Array<any>>) => {
            state.roles = action.payload;
        },
    },
    extraReducers(builder) {
        builder.addCase(fetchRolesAsync.fulfilled, (state, action) => {
            // console.log(action.payload);
            // console.log(state);
        });
    },
});

export const { performFetchRoles } = fetchRolesSlice.actions;

export const fetchRoles = (state: RootState) => state.fetchRoles.roles;

export default fetchRolesSlice.reducer;