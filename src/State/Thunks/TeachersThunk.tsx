import { createAsyncThunk } from '@reduxjs/toolkit';
import { Post } from '../../Api/api';

export const fetchTeacherSubjectsAsync = createAsyncThunk (
	'fetchTeacherSubjects',
	async (postData: any) => {
		try {
			const response = await Post.fetchTeacherSubjects(postData);
			return response;
		} catch(error){
			const err = JSON.stringify(error);
			const errj = JSON.parse(err);
			return { status: 400, message: errj.message, code: errj.code};
		}
	}
)

export const addTeacherSubjectsAsync = createAsyncThunk (
	'addTeacherSubjects',
	async (postData: any) => {
		try {
			const response = await Post.addTeacherSubjects(postData);
			return response;
		} catch(error){
			const err = JSON.stringify(error);
			const errj = JSON.parse(err);
			return { status: 400, message: errj.message, code: errj.code};
		}
	}
)

export const fetchStudentsMarksAsync = createAsyncThunk (
	'fetchStudentsMarks',
	async (postData: any) => {
		try {
			const response = await Post.fetchStudentMarks(postData);
			return response;
		} catch(error){
			const err = JSON.stringify(error);
			const errj = JSON.parse(err);
			return { status: 400, message: errj.message, code: errj.code};
		}
	}
)

export const submitSequenceMarksAsync = createAsyncThunk (
	'submitStudentsMarks',
	async (postData: any) => {
		try {
			const response = await Post.submitStudentMarks(postData);
			return response;
		} catch(error){
			const err = JSON.stringify(error);
			const errj = JSON.parse(err);
			return { status: 400, message: errj.message, code: errj.code};
		}
	}
)

