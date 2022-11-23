import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../Store';
import { fetchUsersAsync } from '../Thunks/UsersThunks'

interface UsersMap {
    [key: string]: any;
}

export interface Users {
    users: UsersMap;
}

const initialState: Users = {
    users: {
        connid: '',
    },
};

export const fetchUsersSlice = createSlice({
    name: 'fetchUsers',
    initialState,
    
    reducers: {
        performFetchUsers: (state, action: PayloadAction<Array<any>>) => {
            state.users = action.payload;
        },
        // performCreateSubject: (state, action: PayloadAction<Array<any>>) => {
        //     state.users = action.payload;
        // }
    },
    extraReducers(builder) {
        builder.addCase(fetchUsersAsync.fulfilled, (state, action) => {
            // console.log(action.payload);
            // console.log(state);
        })
        // builder.addCase(createSubjectAsync.fulfilled, (state, action) => {
        //     // console.log(action.payload);
        //     // console.log(state);
        // });
    },
});

export const { performFetchUsers } = fetchUsersSlice.actions;

export const fetchUsers = (state: RootState) => state.fetchUsers.users;

export default fetchUsersSlice.reducer;