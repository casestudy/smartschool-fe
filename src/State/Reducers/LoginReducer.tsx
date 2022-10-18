import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../Store';
import { loginUserAsync } from '../Thunks/LoginThunk'

interface LoginMap {
    [key: string]: any;
}

export interface Logins {
    login: LoginMap;
}

const initialState: Logins = {
    login: {
        username: '',
        password: ''
    },
};

export const loginUserSlice = createSlice({
    name: 'loginUser',
    initialState,
    
    reducers: {
        performLogin: (state, action: PayloadAction<Array<any>>) => {
            state.login = action.payload;
            const {username, password} = state.login;
            state.login.username = username;
            state.login.password = password;
        },
    },
    extraReducers(builder) {
        builder.addCase(loginUserAsync.fulfilled, (state, action) => {
            console.log(action.payload);
            console.log(state);
        });
    },
});

export const { performLogin } = loginUserSlice.actions;

export const logiuUser = (state: RootState) => state.loginUser.login;

export default loginUserSlice.reducer;