import { createAsyncThunk } from '@reduxjs/toolkit';
import { Post } from '../../Api/api';

export const fetchUsersAsync = createAsyncThunk (
	'fetchUsers',
	async (postData: any) => {
		try {
			const response = await Post.fetchUsers(postData);
			return response;
		} catch(error){
			const err = JSON.stringify(error);
			const errj = JSON.parse(err);
			return { status: 400, message: errj.message, code: errj.code};
		}
	}
)

export const createUsersAsync = createAsyncThunk (
	'createUser',
	async (postData: any) => {
		try {
			const response = await Post.createUser(postData);
			return response;
		} catch(error){
			const err = JSON.stringify(error);
			const errj = JSON.parse(err);
			return { status: 400, message: errj.message, code: errj.code};
		}
	}
)

export const editUsersAsync = createAsyncThunk (
	'editUser',
	async (postData: any) => {
		try {
			const response = await Post.editUser(postData);
			return response;
		} catch(error){
			const err = JSON.stringify(error);
			const errj = JSON.parse(err);
			return { status: 400, message: errj.message, code: errj.code};
		}
	}
)

export const getUserRolesAsync = createAsyncThunk (
	'getUserRoles',
	async (postData: any) => {
		try {
			const response = await Post.getUserRoles(postData);
			return response;
		} catch(error){
			const err = JSON.stringify(error);
			const errj = JSON.parse(err);
			return { status: 400, message: errj.message, code: errj.code};
		}
	}
)