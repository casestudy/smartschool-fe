import { createAsyncThunk } from '@reduxjs/toolkit';
import { Post } from '../../Api/api';

export const fetchStudentsAsync = createAsyncThunk (
	'fetchStudentSubjects',
	async (postData: any) => {
		try {
			const response = await Post.fetchStudents(postData);
			return response;
		} catch(error){
			const err = JSON.stringify(error);
			const errj = JSON.parse(err);
			return { status: 400, message: errj.message, code: errj.code};
		}
	}
)