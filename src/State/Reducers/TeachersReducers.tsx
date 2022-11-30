import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../Store';
import { fetchTeacherSubjectsAsync } from '../Thunks/TeachersThunk'

interface TeachersMap {
    [key: string]: any;
}

export interface Teachers {
    teachers: TeachersMap;
}

const initialState: Teachers = {
    teachers: {
        connid: '',
    },
};

export const fetchTeachersSlice = createSlice({
    name: 'fetchTeachers',
    initialState,
    
    reducers: {
        performFetchTeacherSubjects: (state, action: PayloadAction<Array<any>>) => {
            state.teachers = action.payload;
        },
        // performCreateSubject: (state, action: PayloadAction<Array<any>>) => {
        //     state.users = action.payload;
        // }
    },
    extraReducers(builder) {
        builder.addCase(fetchTeacherSubjectsAsync.fulfilled, (state, action) => {
            // console.log(action.payload);
            // console.log(state);
        })
        // builder.addCase(createSubjectAsync.fulfilled, (state, action) => {
        //     // console.log(action.payload);
        //     // console.log(state);
        // });
    },
});

export const { performFetchTeacherSubjects } = fetchTeachersSlice.actions;

export const fetchTeacherSubjects = (state: RootState) => state.fetchTeachers.teachers;

export default fetchTeachersSlice.reducer;