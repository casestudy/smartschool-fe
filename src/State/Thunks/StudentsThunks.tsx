import { createAsyncThunk } from '@reduxjs/toolkit';
import { Post } from '../../Api/api';

export const fetchStudentsAsync = createAsyncThunk (
	'fetchStudents',
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

export const createStudentAsync = createAsyncThunk (
	'addStudent',
	async (postData: any) => {
		try {
			const response = await Post.createStudent(postData);
			return response;
		} catch(error){
			const err = JSON.stringify(error);
			const errj = JSON.parse(err);
			return { status: 400, message: errj.message, code: errj.code};
		}
	}
)

export const editStudentAsync = createAsyncThunk (
	'editStudent',
	async (postData: any) => {
		try {
			const response = await Post.editStudent(postData);
			return response;
		} catch(error){
			const err = JSON.stringify(error);
			const errj = JSON.parse(err);
			return { status: 400, message: errj.message, code: errj.code};
		}
	}
)

export const fetchStudentParentsAsync = createAsyncThunk (
	'fetchStudentParents',
	async (postData: any) => {
		try {
			const response = await Post.fetchStudentParents(postData);
			return response;
		} catch(error){
			const err = JSON.stringify(error);
			const errj = JSON.parse(err);
			return { status: 400, message: errj.message, code: errj.code};
		}
	}
)

export const removeStudentParentAsync = createAsyncThunk (
	'removeStudentParent',
	async (postData: any) => {
		try {
			const response = await Post.removeStudentParent(postData);
			return response;
		} catch(error){
			const err = JSON.stringify(error);
			const errj = JSON.parse(err);
			return { status: 400, message: errj.message, code: errj.code};
		}
	}
)

export const addStudentParentAsync = createAsyncThunk (
	'addStudentParent',
	async (postData: any) => {
		try {
			const response = await Post.addStudentParent(postData);
			return response;
		} catch(error){
			const err = JSON.stringify(error);
			const errj = JSON.parse(err);
			return { status: 400, message: errj.message, code: errj.code};
		}
	}
)