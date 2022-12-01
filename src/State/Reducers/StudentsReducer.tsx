import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../Store';
import { fetchStudentsAsync } from '../Thunks/StudentsThunks'

interface StudentsMap {
    [key: string]: any;
}

export interface Students {
    students: StudentsMap;
}

const initialState: Students = {
    students: {
        connid: '',
    },
};

export const fetchStudentsSlice = createSlice({
    name: 'fetchStudents',
    initialState,
    
    reducers: {
        performFetchStudents: (state, action: PayloadAction<Array<any>>) => {
            state.students = action.payload;
        },
        // performCreateSubject: (state, action: PayloadAction<Array<any>>) => {
        //     state.users = action.payload;
        // }
    },
    extraReducers(builder) {
        builder.addCase(fetchStudentsAsync.fulfilled, (state, action) => {
            // console.log(action.payload);
            // console.log(state);
        })
        // builder.addCase(createSubjectAsync.fulfilled, (state, action) => {
        //     // console.log(action.payload);
        //     // console.log(state);
        // });
    },
});

export const { performFetchStudents } = fetchStudentsSlice.actions;

export const fetchStudents = (state: RootState) => state.fetchStudents.students;

export default fetchStudentsSlice.reducer;