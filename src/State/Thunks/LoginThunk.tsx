import { createAsyncThunk } from '@reduxjs/toolkit';
import { Post } from '../../Api/api';

interface Obj {
     username: string;
     password: string;
}

export const loginUserAsync = createAsyncThunk (
	'loginUser',
	async (postData: any) => {
		try {
			const response = await Post.loginUser(postData);
			return response;
		} catch(error){
			const err = JSON.stringify(error);
			const errj = JSON.parse(err);
			return { status: 400, message: errj.message, code: errj.code};
		}
	}
)

export const logoutUserAsync = createAsyncThunk (
	'logoutUser',
	async (postData: any) => {
		try {
			const response = await Post.logoutUser(postData);
			return response;
		} catch(error){
			const err = JSON.stringify(error);
			const errj = JSON.parse(err);
			return { status: 400, message: errj.message, code: errj.code};
		}
	}
)