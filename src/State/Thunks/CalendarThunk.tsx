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

export const fetchAcademicTermTypesAsync = createAsyncThunk (
	'fetchAcademicTermTypes',
	async (postData: any) => {
		try {
			const response = await Post.fetchAcademicTermTypes(postData);
			return response;
		} catch(error){
			const err = JSON.stringify(error);
			const errj = JSON.parse(err);
			return { status: 400, message: errj.message, code: errj.code};
		}
	}
)

export const fetchAcademicTermAsync = createAsyncThunk (
	'fetchAcademicTerm',
	async (postData: any) => {
		try {
			const response = await Post.fetchAcademicTerms(postData);
			return response;
		} catch(error){
			const err = JSON.stringify(error);
			const errj = JSON.parse(err);
			return { status: 400, message: errj.message, code: errj.code};
		}
	}
)

export const createAcademicTerm = createAsyncThunk (
	'createAcademicTerm',
	async (postData: any) => {
		try {
			const response = await Post.createAcademicTerm(postData);
			return response;
		} catch(error){
			const err = JSON.stringify(error);
			const errj = JSON.parse(err);
			return { status: 400, message: errj.message, code: errj.code};
		}
	}
)

export const modifyAcademicTerm = createAsyncThunk (
	'modifyAcademicTerm',
	async (postData: any) => {
		try {
			const response = await Post.modifyAcademicTerm(postData);
			return response;
		} catch(error){
			const err = JSON.stringify(error);
			const errj = JSON.parse(err);
			return { status: 400, message: errj.message, code: errj.code};
		}
	}
)

export const fetchSequencesAsync = createAsyncThunk (
	'fetchSequencesAsync',
	async (postData: any) => {
		try {
			const response = await Post.fetchSequences(postData);
			return response;
		} catch(error){
			const err = JSON.stringify(error);
			const errj = JSON.parse(err);
			return { status: 400, message: errj.message, code: errj.code};
		}
	}
)

export const fetchExamTypeAsync = createAsyncThunk (
	'fetchExamTypeAsync',
	async (postData: any) => {
		try {
			const response = await Post.fetchExamTypes(postData);
			return response;
		} catch(error){
			const err = JSON.stringify(error);
			const errj = JSON.parse(err);
			return { status: 400, message: errj.message, code: errj.code};
		}
	}
)

export const createExamAsync = createAsyncThunk (
	'createExamAsync',
	async (postData: any) => {
		try {
			const response = await Post.createExam(postData);
			return response;
		} catch(error){
			const err = JSON.stringify(error);
			const errj = JSON.parse(err);
			return { status: 400, message: errj.message, code: errj.code};
		}
	}
)

export const modifyExamAsync = createAsyncThunk (
	'modifyExamAsync',
	async (postData: any) => {
		try {
			const response = await Post.modifyExam(postData);
			return response;
		} catch(error){
			const err = JSON.stringify(error);
			const errj = JSON.parse(err);
			return { status: 400, message: errj.message, code: errj.code};
		}
	}
)