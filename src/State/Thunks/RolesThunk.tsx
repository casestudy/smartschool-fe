import { createAsyncThunk } from '@reduxjs/toolkit';
import { Post } from '../../Api/api';

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

export const createRoleAsync = createAsyncThunk (
	'createRole',
	async (postData: any) => {
		try {
			const response = await Post.createRole(postData);
			return response;
		} catch(error){
			const err = JSON.stringify(error);
			const errj = JSON.parse(err);
			return { status: 400, message: errj.message, code: errj.code};
		}
	}
)

export const editRoleAsync = createAsyncThunk (
	'updateRole',
	async (postData: any) => {
		try {
			const response = await Post.updateRole(postData);
			return response;
		} catch(error){
			const err = JSON.stringify(error);
			const errj = JSON.parse(err);
			return { status: 400, message: errj.message, code: errj.code};
		}
	}
)

export const getRolePermsAsync = createAsyncThunk (
	'getRolePerms',
	async (postData: any) => {
		try {
			const response = await Post.getRolePerms(postData);
			return response;
		} catch(error){
			const err = JSON.stringify(error);
			const errj = JSON.parse(err);
			return { status: 400, message: errj.message, code: errj.code};
		}
	}
)

export const deleteRolePermAsync = createAsyncThunk (
	'deleteRolePerm',
	async (postData: any) => {
		try {
			const response = await Post.deleteRolePerm(postData);
			return response;
		} catch(error){
			const err = JSON.stringify(error);
			const errj = JSON.parse(err);
			return { status: 400, message: errj.message, code: errj.code};
		}
	}
)

export const deleteRolePermsAsync = createAsyncThunk (
	'deleteRolePerms',
	async (postData: any) => {
		try {
			const response = await Post.deleteRolePerms(postData);
			return response;
		} catch(error){
			const err = JSON.stringify(error);
			const errj = JSON.parse(err);
			return { status: 400, message: errj.message, code: errj.code};
		}
	}
)

export const getPermTypesAsync = createAsyncThunk (
	'fetchPermTypes',
	async (postData: any) => {
		try {
			const response = await Post.getPermTypes(postData);
			return response;
		} catch(error){
			const err = JSON.stringify(error);
			const errj = JSON.parse(err);
			return { status: 400, message: errj.message, code: errj.code};
		}
	}
)

export const addPermToRoleAsync = createAsyncThunk (
	'addPermToRow',
	async (postData: any) => {
		try {
			const response = await Post.addPermToRole(postData);
			return response;
		} catch(error){
			const err = JSON.stringify(error);
			const errj = JSON.parse(err);
			return { status: 400, message: errj.message, code: errj.code};
		}
	}
)

export const addPermsToRoleAsync = createAsyncThunk (
	'addPermsToRow',
	async (postData: any) => {
		try {
			const response = await Post.addPermsToRole(postData);
			return response;
		} catch(error){
			const err = JSON.stringify(error);
			const errj = JSON.parse(err);
			return { status: 400, message: errj.message, code: errj.code};
		}
	}
)