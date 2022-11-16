import { createAsyncThunk } from '@reduxjs/toolkit';
import { Post } from '../../Api/api';

export const fetchSubjectsAsync = createAsyncThunk (
	'fetchRoles',
	async (postData: any) => {
		try {
			const response = await Post.fetchSubjects(postData);
			return response;
		} catch(error){
			const err = JSON.stringify(error);
			const errj = JSON.parse(err);
			return { status: 400, message: errj.message, code: errj.code};
		}
	}
)