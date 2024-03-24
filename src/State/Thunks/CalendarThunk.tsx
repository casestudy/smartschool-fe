import { createAsyncThunk } from '@reduxjs/toolkit';
import { Post } from '../../Api/api';

export const fetchAcademicYearAsync = createAsyncThunk (
	'fetchAcademicYear',
	async (postData: any) => {
		try {
			const response = await Post.fetchAcademicYears(postData);
			return response;
		} catch(error){
			const err = JSON.stringify(error);
			const errj = JSON.parse(err);
			return { status: 400, message: errj.message, code: errj.code};
		}
	}
)

export const createAcademicYearAsync = createAsyncThunk (
	'createAcademicYear',
	async (postData: any) => {
		try {
			const response = await Post.createAcademicYear(postData);
			return response;
		} catch(error){
			const err = JSON.stringify(error);
			const errj = JSON.parse(err);
			return { status: 400, message: errj.message, code: errj.code};
		}
	}
)

export const modifyAcademicYearAsync = createAsyncThunk (
	'modifyAcademicYear',
	async (postData: any) => {
		try {
			const response = await Post.modifyAcademicYear(postData);
			return response;
		} catch(error){
			const err = JSON.stringify(error);
			const errj = JSON.parse(err);
			return { status: 400, message: errj.message, code: errj.code};
		}
	}
)