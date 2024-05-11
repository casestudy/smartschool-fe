import { createAsyncThunk } from '@reduxjs/toolkit';
import { Post } from '../../Api/api';

export const fetchClassroomsAsync = createAsyncThunk (
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

export const createClassroomAsync = createAsyncThunk (
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

export const fetchClassroomTeachersAsync = createAsyncThunk (
	'fetchClassroomTeacher',
	async (postData: any) => {
		try {
			const response = await Post.fetchClassroomTeacher(postData);
			return response;
		} catch(error){
			const err = JSON.stringify(error);
			const errj = JSON.parse(err);
			return { status: 400, message: errj.message, code: errj.code};
		}
	}
)

export const editclassroomAsync = createAsyncThunk (
	'editClassroom',
	async (postData: any) => {
		try {
			const response = await Post.updateClassroom(postData);
			return response;
		} catch(error){
			const err = JSON.stringify(error);
			const errj = JSON.parse(err);
			return { status: 400, message: errj.message, code: errj.code};
		}
	}
)

export const fetchClassroomStudentsAsync = createAsyncThunk (
	'fetchClassroomStudents',
	async (postData: any) => {
		try {
			const response = await Post.fetchClassroomStudents(postData);
			return response;
		} catch(error){
			const err = JSON.stringify(error);
			const errj = JSON.parse(err);
			return { status: 400, message: errj.message, code: errj.code};
		}
	}
)

export const printReportCardAsync = createAsyncThunk (
	'printReportCardAsync',
	async (postData: any) => {
		try {
			const response = await Post.printReportCard(postData);
			return response;
		} catch(error){
			const err = JSON.stringify(error);
			const errj = JSON.parse(err);
			return { status: 400, message: errj.message, code: errj.code};
		}
	}
)