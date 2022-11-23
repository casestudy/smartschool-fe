import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../Store';
import { fetchClassroomsAsync, createClassroomAsync, fetchClassroomTeachersAsync } from '../Thunks/ClassroomsThunk'

interface ClassroomsMap {
    [key: string]: any;
}

export interface Classrooms {
    classroom: ClassroomsMap;
}

const initialState: Classrooms = {
    classroom: {
        connid: '',
    },
};

export const fetchClassroomsSlice = createSlice({
    name: 'fetchclassrooms',
    initialState,
    
    reducers: {
        performFetchClassrooms: (state, action: PayloadAction<Array<any>>) => {
            state.classroom = action.payload;
        },
        performCreateClassroom: (state, action: PayloadAction<Array<any>>) => {
            state.classroom = action.payload;
        },
        performFetchClassroomTeacher: (state, action: PayloadAction<Array<any>>) => {
            state.classroom = action.payload;
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchClassroomsAsync.fulfilled, (state, action) => {
            // console.log(action.payload);
            // console.log(state);
        });
        builder.addCase(createClassroomAsync.fulfilled, (state, action) => {
            // console.log(action.payload);
            // console.log(state);
        });
        builder.addCase(fetchClassroomTeachersAsync.fulfilled, (state, action) => {
            console.log(action.payload);
            console.log(state);
        });
    },
});

export const { performFetchClassrooms, performCreateClassroom, performFetchClassroomTeacher } = fetchClassroomsSlice.actions;

export const fetchClassrooms = (state: RootState) => state.fetchClassrooms.classroom;

export default fetchClassroomsSlice.reducer;