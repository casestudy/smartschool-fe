import { createAsyncThunk } from '@reduxjs/toolkit';
import { Post } from '../../Api/api';

export const fetchaClassroomsAsync = createAsyncThunk (
	'fetchClassrooms',
	async (postData: any) => {
		try {
			const response = await Post.fetchClassrooms(postData);
			return response;
		} catch(error){
			const err = JSON.stringify(error);
			const errj = JSON.parse(err);
			return { status: 400, message: errj.message, code: errj.code};
		}
	}
)

export const createclassroomAsync = createAsyncThunk (
	'createClassroom',
	async (postData: any) => {
		try {
			const response = await Post.createClassroom(postData);
			return response;
		} catch(error){
			const err = JSON.stringify(error);
			const errj = JSON.parse(err);
			return { status: 400, message: errj.message, code: errj.code};
		}
	}
)
