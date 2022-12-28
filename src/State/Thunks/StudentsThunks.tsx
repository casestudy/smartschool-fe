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

export const fetchStudentFeesAsync = createAsyncThunk (
	'fetchstudentFee',
	async (postData: any) => {
		try {
			const response = await Post.fetchStudentFees(postData);
			return response;
		} catch(error){
			const err = JSON.stringify(error);
			const errj = JSON.parse(err);
			return { status: 400, message: errj.message, code: errj.code};
		}
	}
)

export const fetchFeeTypesAsync = createAsyncThunk (
	'fetchFeeTypes',
	async (postData: any) => {
		try {
			const response = await Post.fetchFeeTypes(postData);
			return response;
		} catch(error){
			const err = JSON.stringify(error);
			const errj = JSON.parse(err);
			return { status: 400, message: errj.message, code: errj.code};
		}
	}
)

export const fetchPaymentMethodsAsync = createAsyncThunk (
	'fetchPaymentMethods',
	async (postData: any) => {
		try {
			const response = await Post.fetchPaymentMethods(postData);
			return response;
		} catch(error){
			const err = JSON.stringify(error);
			const errj = JSON.parse(err);
			return { status: 400, message: errj.message, code: errj.code};
		}
	}
)

export const addStudentFeeAsync = createAsyncThunk (
	'addstudentFee',
	async (postData: any) => {
		try {
			const response = await Post.addStudentFee(postData);
			return response;
		} catch(error){
			const err = JSON.stringify(error);
			const errj = JSON.parse(err);
			return { status: 400, message: errj.message, code: errj.code};
		}
	}
)

export const updateStudentFeeAsync = createAsyncThunk (
	'editstudentFee',
	async (postData: any) => {
		try {
			const response = await Post.editStudentFee(postData);
			return response;
		} catch(error){
			const err = JSON.stringify(error);
			const errj = JSON.parse(err);
			return { status: 400, message: errj.message, code: errj.code};
		}
	}
)

export const deleteStudentFeeAsync = createAsyncThunk (
	'deleteStudentFee',
	async (postData: any) => {
		try {
			const response = await Post.deleteStudentFee(postData);
			return response;
		} catch(error){
			const err = JSON.stringify(error);
			const errj = JSON.parse(err);
			return { status: 400, message: errj.message, code: errj.code};
		}
	}
)

export const getStudentPhotoAsync = createAsyncThunk (
	'getStudentPhoto',
	async (postData: any) => {
		try {
			const response = await Post.getStudentPhoto(postData);
			return response;
		} catch(error){
			const err = JSON.stringify(error);
			const errj = JSON.parse(err);
			return { status: 400, message: errj.message, code: errj.code};
		}
	}
)

export const uploadStudentPhotoAsync = createAsyncThunk (
	'uploadStudentPhoto',
	async (postData: any) => {
		try {
			const response = await Post.uploadStudentPhoto(postData);
			return response;
		} catch(error){
			const err = JSON.stringify(error);
			const errj = JSON.parse(err);
			return { status: 400, message: errj.message, code: errj.code};
		}
	}
)