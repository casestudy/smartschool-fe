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
			console.log(error);
			return { status: 400, data: Object}
		}
	}
)