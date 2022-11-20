import { createAsyncThunk } from '@reduxjs/toolkit';
import { Post } from '../../Api/api';

export const fetchSubjectsAsync = createAsyncThunk (
	'fetchSubjects',
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

export const createSubjectAsync = createAsyncThunk (
	'createSubject',
	async (postData: any) => {
		try {
			const response = await Post.createSubject(postData);
			return response;
		} catch(error){
			const err = JSON.stringify(error);
			const errj = JSON.parse(err);
			return { status: 400, message: errj.message, code: errj.code};
		}
	}
)

export const editSubjectAsync = createAsyncThunk (
	'updateSubject',
	async (postData: any) => {
		try {
			const response = await Post.updateSubject(postData);
			return response;
		} catch(error){
			const err = JSON.stringify(error);
			const errj = JSON.parse(err);
			return { status: 400, message: errj.message, code: errj.code};
		}
	}
)

export const fetchGroupsAsync = createAsyncThunk (
	'fetchGroups',
	async (postData: any) => {
		try {
			const response = await Post.fetchGroups(postData);
			return response;
		} catch(error){
			const err = JSON.stringify(error);
			const errj = JSON.parse(err);
			return { status: 400, message: errj.message, code: errj.code};
		}
	}
)

export const createGroupAsync = createAsyncThunk (
	'createGroup',
	async (postData: any) => {
		try {
			const response = await Post.createGroup(postData);
			return response;
		} catch(error){
			const err = JSON.stringify(error);
			const errj = JSON.parse(err);
			return { status: 400, message: errj.message, code: errj.code};
		}
	}
)

export const editGroupAsync = createAsyncThunk (
	'updateGroup',
	async (postData: any) => {
		try {
			const response = await Post.updateGroup(postData);
			return response;
		} catch(error){
			const err = JSON.stringify(error);
			const errj = JSON.parse(err);
			return { status: 400, message: errj.message, code: errj.code};
		}
	}
)