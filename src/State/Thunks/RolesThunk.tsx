import { createAsyncThunk } from '@reduxjs/toolkit';
import { Post } from '../../Api/api';

interface Obj {
     username: string;
     password: string;
}

export const fetchRolesAsync = createAsyncThunk (
	'fetchRoles',
	async (postData: any) => {
		try {
			const response = await Post.fetchRoles(postData);
			return response;
		} catch(error){
			const err = JSON.stringify(error);
			const errj = JSON.parse(err);
			return { status: 400, message: errj.message, code: errj.code};
		}
	}
)